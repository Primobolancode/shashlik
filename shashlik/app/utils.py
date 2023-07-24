from bson import ObjectId

from app.schemas import DebtToSave

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
                "balance": sum(d["summ"] for d in event['debts'] if
                               d['repaid'] == False and str(d['creditor']) == str(user['_id']))
                           -
                           sum(d["summ"] for d in event['debts'] if
                               d['repaid'] == False and str(d['debtor']) == str(user['_id']))
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
            {"$set": {"debts": [{"_id": ObjectId(), "creditor": debt.creditor, "debtor": debt.debtor, "summ": debt.summ,
                                 "repaid": debt.repaid} for debt in new_debts]}},
        )

