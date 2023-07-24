# from collections.abc import AsyncGenerator
#
# from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
# from sqlalchemy.orm import sessionmaker
#
# from app import settings
#
# postgres_url = settings.POSTGRES_URL
#
# engine = create_async_engine(postgres_url, echo=True, future=True)
# AsyncSessionFactory = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     expire_on_commit=False,
#     bind=engine,
#     class_=AsyncSession,
# )
#
#
# async def get_session() -> AsyncGenerator:
#     async with AsyncSessionFactory() as session:
#         yield session
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

from app.schemas.schemas import DebtToSave


def init_db():
    db_client = AsyncIOMotorClient("mongodb://mongo:27017", username='root', password='example')
    current_db = db_client["shashlik"]
    return current_db


def get_result(result):
    result["_id"] = str(result["_id"])
    return result


async def get_current_event(event_id: str, db=Depends(init_db)):
    c = db.event
    result = await c.find_one({"_id": ObjectId(event_id)})
    return result


def generate_debts(creditor: str, debtors: list, summ: float, reverse=False):
    all_created_debt = [DebtToSave(
        creditor=str(creditor) if not reverse else str(debtor),
        debtor=str(debtor) if not reverse else str(creditor),
        summ=summ / len(debtors),
        repaid=False,
    ) for debtor in debtors]

    return all_created_debt


def sort_by_balance(user):
    return user['balance']

async def optimize_debts(event_id, collection):
    event = await collection.find_one({"_id": ObjectId(event_id)})

    balances = []
    for user in event['users']:
        balances.append(
            {
                "id": str(user['_id']),
                "balance": sum(d["summ"] for d in event['debts'] if d['repaid'] == False and str(d['creditor']) == str(user['_id']))
                           -
                           sum(d["summ"] for d in event['debts'] if d['repaid'] == False and str(d['debtor']) == str(user['_id']))
            }
        )

    balances.sort(key=sort_by_balance)
    balances.reverse()
    i = 0
    while i < len(balances):
        if balances[i]['balance'] == 0:
            balances.pop(i)
        else:
            i += 1

    new_debts = []

    while len(balances) > 0:
        big = balances[0]['balance']
        small = balances[-1]['balance']
        if big == 0 and small == 0:
            balances.pop(0)
            balances.pop()
            continue
        elif big == 0:
            balances.pop(0)
            continue
        elif small == 0:
            balances.pop()
        new_debts.append(
            DebtToSave(
                creditor=balances[0]['id'],
                debtor=balances[-1]['id'],
                summ=abs(small if abs(big) > abs(small) else big),
                repaid=False,
            )
        )
        if abs(big) > abs(small):
            balances[0]['balance'] = big + small
            balances.pop()
        elif abs(big) < abs(small):
            balances[-1]['balance'] = big + small
            balances.pop(0)
        else:
            balances.pop(0)
            balances.pop()


    for repaid_debt in [i for i in event['debts'] if i['repaid'] == True]:
        new_debts.append(
            DebtToSave(
                creditor=repaid_debt['creditor'],
                debtor=repaid_debt['debtor'],
                summ=repaid_debt['summ'],
                repaid=True,
            )
        )


    result = await collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": {"debts": []}},
    )
    if new_debts:
        result = await collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": {"debts": [{"_id": ObjectId(), "creditor": debt.creditor, "debtor": debt.debtor, "summ": debt.summ, "repaid": debt.repaid} for debt in new_debts]}},
        )

    # instance.invoice.debts.filter(repaid=False).all().delete()
    # Debt.objects.bulk_create(new_debts)


    # for debt in event['debts']:
    #     for debt_to_save in debts_to_save:
    #         if debt_to_save.keys()

    # created_debts = []
    # for debt in event['debts']:
    #     if len(created_debts) == 0:
    #         created_debts.append(
    #             DebtToSave(
    #                 creditor=str(debt['creditor']),
    #                 debtor=str(debt['debtor']),
    #                 summ=debt['summ'],
    #             )
    #         )
    #     else:
    #
    #         for created_debt in created_debts:
    #             print(str(created_debt.creditor) + '      ' + str(debt['creditor']))
    #             print(created_debt.creditor + '      ' + str(debt['creditor']))
    #             if str(created_debt.creditor) == str(debt['creditor']) and created_debt.debtor == str(debt['debtor']):
    #                 created_debt.summ += debt['summ']
    #
    #             elif str(created_debt.creditor) == str(debt['debtor']) and str(created_debt.debtor) == str(debt['creditor']):
    #                 if created_debt.summ > debt['summ']:
    #                     created_debt.summ -= debt['summ']
    #
    #
    #                 elif created_debt.summ < debt['summ']:
    #                     created_debt.summ = abs(created_debt.summ - debt['summ'])
    #                     created_debt.creditor = debt.debtor
    #                     created_debt.debtor = debt.creditor
    #                 elif created_debt.summ == debt['summ']:
    #                     created_debts.remove(created_debt)
    #
    #
    #             else:
    #                 created_debts.append(
    #                     DebtToSave(
    #                         creditor=str(debt['creditor']),
    #                         debtor=str(debt['debtor']),
    #                         summ=debt['summ'],
    #                     )
    #                 )
    # return 'ok'
