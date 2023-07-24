from bson import ObjectId
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.db import init_db, get_current_event
from app.utils import generate_debts, optimize_debts
from app.routers import api_router, page_router
from app.schemas import CreateEvent, CreateUser, UserOutput, Expense, CreateExpense, ExpenseOutput, DebtOutput

app = FastAPI(title="So Fast Project", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.include_router(page_router)

app.mount("/static", StaticFiles(directory="static"), name="static")

"""
1. Создать event + 
2. Удалить event +

3. Добавить пользователя в event +
4. Удалить пользователя из event +
5. Получить список пользователей +

6. Добавить расход +
7. Удалить расход + 
8. Получить список расходов + 

# SIGNALS with one function
(add debt) +


9. Посмотреть долги +
10. Погасить долг +
12. Удалить погашение долга +


12. Пересчитать -

"""


# @app.post('/event/new', tags=['event'])
# async def create_event(event: CreateEvent, db=Depends(init_db)):
#     collection = db.event
#     event = dict(event)
#     event['users'] = event['expenses'] = event['debts'] = []
#     result = await collection.insert_one(dict(event))
#     return {'result': str(result.inserted_id)}


# @app.delete("/event/{event_id}", tags=['event'])
# async def delete_event(event_id, db=Depends(init_db)):
#     collection = db.event
#     result = await collection.delete_one(
#         {
#             "_id": ObjectId(event_id),
#         }
#     )
#     return


# @app.get("/event/{event_id}/users", tags=['user'])
# async def get_users_from_event(event_id, db=Depends(init_db)):
#     collection = db.event
#     result = await collection.find_one(
#         {
#             "_id": ObjectId(event_id),
#         }
#     )
#     result = [UserOutput(name=user['name'], id=str(user['_id'])) for user in result['users']]
#     return {"users": result}
#
# @app.post('/event/{event_id}/user', tags=['user'])
# async def add_user_to_event(event_id: str, new_user: CreateUser, db=Depends(init_db)):
#     c = db.event
#     update_result = await c.update_one(
#         {"_id": ObjectId(event_id)},
#         {"$push": {"users": {"_id": ObjectId(), "name": new_user.name}}}
#     )
#     return 'ok'
#
# @app.delete("/event/{event_id}/user/{user_id}", tags=['user'])
# async def remove_user_from_event(event_id: str, user_id, db=Depends(init_db)):
#     c = db.event
#     update_result = await c.update_one(
#         {"_id": ObjectId(event_id)},
#         {"$pull": {"users": {"_id": ObjectId(user_id)}}}
#     )
#     return 'ok'
#
# @app.post("/event/{event_id}/expense", tags=['expense'])
# async def add_expense(event_id, expense: CreateExpense, db=Depends(init_db)):
#     collection = db.event
#     await collection.update_one(
#         {"_id": ObjectId(event_id)},
#         {"$push": {"expenses": {
#             "_id": ObjectId(),
#             "title": expense.title,
#             "creditor": ObjectId(expense.creditor_id),
#             "debtors": [ObjectId(i) for i in expense.debtors_id],
#             "summ": expense.summ,
#         }}}
#     )
#     debts = generate_debts(expense.creditor_id, expense.debtors_id, expense.summ)
#     debts_with_object_ids = [
#         {
#             "_id": ObjectId(),
#             "creditor": ObjectId(debt.creditor),
#             "debtor": ObjectId(debt.debtor),
#             "summ": debt.summ,
#             "repaid": debt.repaid,
#         }
#         for debt in debts if debt.creditor != debt.debtor
#     ]
#     await collection.update_one(
#         {"_id": ObjectId(event_id)},
#         {"$push": {"debts": {"$each": debts_with_object_ids}}}
#     )
#     await optimize_debts(event_id, collection)
#     return 'ok'
#
#
# @app.delete("/event/{event_id}/expense/{expense_id}", tags=['expense'])
# async def delete_expense(event_id, expense_id, db=Depends(init_db)):
#     collection = db.event
#     expense = await collection.find_one(
#         {"_id": ObjectId(event_id), "expenses._id": ObjectId(expense_id)},
#         {"expenses.$": 1}
#     )
#     expense = expense['expenses'][0]
#     debts = generate_debts(str(expense['creditor']), expense['debtors'], expense['summ'], reverse=True)
#     debts_with_object_ids = [
#         {
#             "_id": ObjectId(),
#             "creditor": ObjectId(debt.creditor),
#             "debtor": ObjectId(debt.debtor),
#             "summ": debt.summ,
#             "repaid": debt.repaid,
#         }
#         for debt in debts if debt.creditor != debt.debtor
#     ]
#     await collection.update_one(
#         {"_id": ObjectId(event_id)},
#         {"$push": {"debts": {"$each": debts_with_object_ids}}}
#     )
#     await collection.update_one(
#         {"_id": ObjectId(event_id)},
#         {"$pull": {"expenses": {"_id": ObjectId(expense_id)}}}
#     )
#     await optimize_debts(event_id, collection)
#     return 'ok'
#
#
# @app.get("/event/{event_id}/expenses", tags=['expense'])
# async def get_expenses(event_id, db=Depends(init_db), event=Depends(get_current_event)):
#     users = event['users']
#     result = [
#         ExpenseOutput(
#             id=str(expense["_id"]),
#             title=expense["title"],
#             creditor=UserOutput(
#                 id=str(expense["creditor"]),
#                 name=[user["name"] for user in users if str(user["_id"]) == str(expense["creditor"])][0]
#             ),
#             debtors=[
#                 UserOutput(
#                     id=str(debtor),
#                     name=[user["name"] for user in users if str(user["_id"]) == str(debtor)][0]
#                 ) for debtor in expense['debtors']
#             ],
#             summ=expense["summ"],
#
#         )
#         for expense in event['expenses']
#     ]
#     return result
#
#
# @app.get("/event/{event_id}/debts", tags=['debts'])
# async def get_debts(
#         event_id,
#         db=Depends(init_db),
#         event=Depends(get_current_event)
# ):
#     users = event['users']
#     result = [
#         DebtOutput(
#             id=str(debt["_id"]),
#             repaid=debt['repaid'],
#             creditor=UserOutput(
#                 id=str(debt["creditor"]),
#                 name=[user["name"] for user in users if str(user["_id"]) == str(debt["creditor"])][0]
#             ),
#             debtor=UserOutput(
#                 id=str(debt["debtor"]),
#                 name=[user["name"] for user in users if str(user["_id"]) == str(debt["debtor"])][0]
#             ),
#             summ=debt["summ"],
#         )
#         for debt in event['debts']
#     ]
#     return result
#
# @app.post("/event/{event_id}/debt/{debt_id}/repaid", tags=['debts'])
# async def repaid_debt(event_id, debt_id, db=Depends(init_db)):
#     collection = db.event
#     result = await collection.update_one(
#         {"_id": ObjectId(event_id), "debts._id": ObjectId(debt_id)},
#         {"$set": {"debts.$.repaid": True}}
#     )
#     await optimize_debts(event_id, collection)
#     return 'ok'
#
# @app.post("/event/{event_id}/debt/{debt_id}/unrepaid", tags=['debts'])
# async def unrepaid_debt(event_id, debt_id, db=Depends(init_db)):
#     collection = db.event
#     result = await collection.update_one(
#         {"_id": ObjectId(event_id), "debts._id": ObjectId(debt_id)},
#         {"$set": {"debts.$.repaid": False}}
#     )
#     await optimize_debts(event_id, collection)
#     return 'ok'

