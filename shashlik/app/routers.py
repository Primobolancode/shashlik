from bson import ObjectId
from fastapi import APIRouter, Depends
from starlette.requests import Request
from starlette.responses import HTMLResponse

import app.db as database
import app.schemas as schemas
import app.utils as utils

api_router = APIRouter(prefix="/api/v1")

page_router = APIRouter(prefix="")


@api_router.post('/event/new', tags=['event'])
async def create_event(event: schemas.CreateEvent, db=Depends(database.init_db)):
    collection = db.event
    event = dict(event)
    event['users'] = event['expenses'] = event['debts'] = []
    result = await collection.insert_one(dict(event))
    return {'result': str(result.inserted_id)}


@api_router.delete("/event/{event_id}", tags=['event'])
async def delete_event(event_id, db=Depends(database.init_db)):
    collection = db.event
    result = await collection.delete_one(
        {
            "_id": ObjectId(event_id),
        }
    )
    return


@api_router.get("/event/{event_id}", tags=['event'])
async def get_event_data(event_id, db=Depends(database.init_db)):
    collection = db.event
    result = await collection.find_one(
        {"_id": ObjectId(event_id)}
    )

    result['_id'] = str(result['_id'])
    result['users'] = [schemas.UserOutput(name=user['name'], id=str(user['_id'])) for user in result['users']]
    users = result['users']
    result['expenses'] = [
        schemas.ExpenseOutput(
            id=str(expense["_id"]),
            title=expense["title"],
            datetime=expense['datetime'],
            creditor=schemas.UserOutput(
                id=str(expense["creditor"]),
                name=[user.name for user in users if str(user.id) == str(expense["creditor"])][0],
            ),
            debtors=[
                schemas.UserOutput(
                    id=str(debtor),
                    name=[user.name for user in result['users'] if str(user.id) == str(debtor)][0]
                ) for debtor in expense['debtors']
            ],
            summ=expense["summ"],

        )
        for expense in result['expenses']
    ]
    result['debts'] = [
        schemas.DebtOutput(
            id=str(debt["_id"]),
            repaid=debt['repaid'],
            creditor=schemas.UserOutput(
                id=str(debt["creditor"]),
                name=[user.name for user in users if str(user.id) == str(debt["creditor"])][0]
            ),
            debtor=schemas.UserOutput(
                id=str(debt["debtor"]),
                name=[user.name for user in users if str(user.id) == str(debt["debtor"])][0]
            ),
            summ=debt["summ"],
        )
        for debt in result['debts']
    ]
    result['total_price'] = sum([i.summ for i in result['expenses']])
    return result


@api_router.get("/event/{event_id}/users", tags=['user'])
async def get_users_from_event(event_id, db=Depends(database.init_db)):
    collection = db.event
    result = await collection.find_one(
        {
            "_id": ObjectId(event_id),
        }
    )
    result = [schemas.UserOutput(name=user['name'], id=str(user['_id'])) for user in result['users']]
    return {"users": result}


@api_router.post('/event/{event_id}/user', tags=['user'])
async def add_user_to_event(event_id: str, new_user: schemas.CreateUser, db=Depends(database.init_db)):
    c = db.event
    update_result = await c.update_one(
        {"_id": ObjectId(event_id)},
        {"$push": {"users": {"_id": ObjectId(), "name": new_user.name}}}
    )
    return 'ok'


@api_router.delete("/event/{event_id}/user/{user_id}", tags=['user'])
async def remove_user_from_event(event_id: str, user_id, db=Depends(database.init_db)):
    c = db.event
    update_result = await c.update_one(
        {"_id": ObjectId(event_id)},
        {"$pull": {"users": {"_id": ObjectId(user_id)}}}
    )
    return 'ok'


@api_router.patch("/event/{event_id}/user/{user_id}/{new_name}", tags=["user"])
async def rename_user_from_event(event_id: str, user_id, new_name, db=Depends(database.init_db)):
    c = db.event
    update_result = await c.update_one(
        {"_id": ObjectId(event_id), "users._id": ObjectId(user_id)},
        {"$set": {"users.$.name": new_name}}
    )
    return 'ok'




@api_router.post("/event/{event_id}/expense", tags=['expense'])
async def add_expense(request: Request, event_id, expense: schemas.CreateExpense, db=Depends(database.init_db)):

    collection = db.event
    await collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$push": {"expenses": {
            "_id": ObjectId(),
            "title": expense.title,
            "creditor": ObjectId(expense.creditor_id),
            "debtors": [ObjectId(i) for i in expense.debtors_id],
            # "summ": round(float(expense.summ), 2),
            "summ": expense.summ,
            "datetime": expense.datetime,
        }}}
    )
    debts = utils.generate_debts(expense.creditor_id, expense.debtors_id, expense.summ)
    debts_with_object_ids = [
        {
            "_id": ObjectId(),
            "creditor": ObjectId(debt.creditor),
            "debtor": ObjectId(debt.debtor),
            "summ": debt.summ,
            "repaid": debt.repaid,
        }
        for debt in debts if debt.creditor != debt.debtor
    ]
    await collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$push": {"debts": {"$each": debts_with_object_ids}}}
    )
    await utils.optimize_debts(event_id, collection)
    return 'ok'


@api_router.delete("/event/{event_id}/expense/{expense_id}", tags=['expense'])
async def delete_expense(event_id, expense_id, db=Depends(database.init_db)):
    collection = db.event
    expense = await collection.find_one(
        {"_id": ObjectId(event_id), "expenses._id": ObjectId(expense_id)},
        {"expenses.$": 1}
    )
    expense = expense['expenses'][0]
    debts = utils.generate_debts(str(expense['creditor']), expense['debtors'], expense['summ'], reverse=True)
    debts_with_object_ids = [
        {
            "_id": ObjectId(),
            "creditor": ObjectId(debt.creditor),
            "debtor": ObjectId(debt.debtor),
            "summ": debt.summ,
            "repaid": debt.repaid,
        }
        for debt in debts if debt.creditor != debt.debtor
    ]
    await collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$push": {"debts": {"$each": debts_with_object_ids}}}
    )
    await collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$pull": {"expenses": {"_id": ObjectId(expense_id)}}}
    )
    await utils.optimize_debts(event_id, collection)
    return 'ok'


@api_router.get("/event/{event_id}/expenses", tags=['expense'])
async def get_expenses(event_id, db=Depends(database.init_db), event=Depends(database.get_current_event)):
    users = event['users']
    result = [
        schemas.ExpenseOutput(
            id=str(expense["_id"]),
            title=expense["title"],
            creditor=schemas.UserOutput(
                id=str(expense["creditor"]),
                name=[user["name"] for user in users if str(user["_id"]) == str(expense["creditor"])][0]
            ),
            debtors=[
                schemas.UserOutput(
                    id=str(debtor),
                    name=[user["name"] for user in users if str(user["_id"]) == str(debtor)][0]
                ) for debtor in expense['debtors']
            ],
            summ=expense["summ"],

        )
        for expense in event['expenses']
    ]
    return result


@api_router.get("/event/{event_id}/debts", tags=['debts'])
async def get_debts(event_id, db=Depends(database.init_db), event=Depends(database.get_current_event)
                    ):
    users = event['users']
    result = [
        schemas.DebtOutput(
            id=str(debt["_id"]),
            repaid=debt['repaid'],
            creditor=schemas.UserOutput(
                id=str(debt["creditor"]),
                name=[user["name"] for user in users if str(user["_id"]) == str(debt["creditor"])][0]
            ),
            debtor=schemas.UserOutput(
                id=str(debt["debtor"]),
                name=[user["name"] for user in users if str(user["_id"]) == str(debt["debtor"])][0]
            ),
            summ=debt["summ"],
        )
        for debt in event['debts']
    ]
    return result


@api_router.post("/event/{event_id}/debt/{debt_id}/repaid", tags=['debts'])
async def repaid_debt(event_id, debt_id, db=Depends(database.init_db)):
    collection = db.event
    result = await collection.update_one(
        {"_id": ObjectId(event_id), "debts._id": ObjectId(debt_id)},
        {"$set": {"debts.$.repaid": True}}
    )
    await utils.optimize_debts(event_id, collection)
    return 'ok'


@api_router.post("/event/{event_id}/debt/{debt_id}/unrepaid", tags=['debts'])
async def unrepaid_debt(event_id, debt_id, db=Depends(database.init_db)):
    collection = db.event
    result = await collection.update_one(
        {"_id": ObjectId(event_id), "debts._id": ObjectId(debt_id)},
        {"$set": {"debts.$.repaid": False}}
    )
    await utils.optimize_debts(event_id, collection)
    return 'ok'


@page_router.get('/{wallet_id}', response_class=HTMLResponse)
async def index(request: Request, wallet_id, user_id, db=Depends(database.init_db)):
    collection = db.event
    event = await collection.find_one(
        {"_id": ObjectId(wallet_id)}
    )
    users = event['users']
    expenses = [
        schemas.ExpenseOutput(
            id=str(expense["_id"]),
            title=expense["title"],
            creditor=schemas.UserOutput(
                id=str(expense["creditor"]),
                name=[user["name"] for user in users if str(user["_id"]) == str(expense["creditor"])][0]
            ),
            debtors=[
                schemas.UserOutput(
                    id=str(debtor),
                    name=[user["name"] for user in users if str(user["_id"]) == str(debtor)][0]
                ) for debtor in expense['debtors']
            ],
            summ=expense["summ"],

        )
        for expense in event['expenses']
    ]
    total_summ = sum(expense['summ'] for expense in event['expenses'])

    from app.main import templates
    return templates.TemplateResponse("wallet_id.html", {
        "request": request,
        "title": event['title'],
        "body_content": "This is the demo for using FastAPI with Jinja templates",
        "your_debt": 777,
        "expenses": expenses,
        "total_summ": total_summ,

    })
