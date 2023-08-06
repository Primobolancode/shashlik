from bson import ObjectId
from decimal import Decimal, ROUND_HALF_UP, ROUND_CEILING
from app.schemas import DebtToSave
import math
def generate_debts(creditor: str, debtors: list, summ: float, reverse=False):
    all_created_debt = [DebtToSave(
        creditor=str(creditor) if not reverse else str(debtor),
        debtor=str(debtor) if not reverse else str(creditor),
        summ=summ/len(debtors),
        repaid=False,
    ) for debtor in debtors]

    return all_created_debt


def sort_by_balance(user):
    return user['balance']


async def optimize_debts(event_id, collection):
    # REWRITE AND FIND OUT HOW TO USE DECIMAL AND TEST WITH .001 PLACES

    event = await collection.find_one({"_id": ObjectId(event_id)})

    balances = []
    for user in event['users']:

        # creditor_sum = sum(Decimal(d["summ"]) for d in event['debts'] if
        #                    not d['repaid'] and str(d['creditor']) == str(user['_id']))
        # debtor_sum = sum(Decimal(d["summ"]) for d in event['debts'] if
        #                  not d['repaid'] and str(d['debtor']) == str(user['_id']))
        # balance = creditor_sum - debtor_sum
        # if balance != Decimal('0'):
        #     balances.append({"id": str(user['_id']), 'balance': balance})
        creditor_sum: float = [sum(d["summ"] for d in event['debts'] if
                            not d['repaid'] and str(d['creditor']) == str(user['_id']))][0]

        debtor_sum: float = [float(sum(d["summ"] for d in event['debts'] if
                                not d['repaid'] and str(d['debtor']) == str(user['_id'])))][0]

        balance = creditor_sum - debtor_sum

        if balance != 0:
            balances.append({"id": str(user['_id']), 'balance': balance})

    balances.sort(key=sort_by_balance)
    balances.reverse()
    balances = [{"id": balance["id"], 'balance': balance['balance']}
                for balance in balances if balance['balance'] != 0]

    i = 0
    while i < len(balances):
        if balances[i]['balance'] == 0:
            balances.pop(i)
        else:
            i += 1

    new_debts = []

    while len(balances) > 0:
        if len(balances) == 1:
            balances.pop(0)



        else:
            big = round(balances[0]['balance'], 3)
            small = round(balances[-1]['balance'], 3)
            if big == 0 and small == 0:
                balances.pop(0)
                balances.pop()
                continue
            elif big == 0:
                balances.pop(0)
                continue
            elif small == 0:
                balances.pop()
            if abs(round(big, 2)) == abs(round(small, 2)) == 0:
                balances.pop(0)
                balances.pop()
            summ = abs(small) if abs(big) > abs(small) else abs(big)
            if summ != 0:
                new_debts.append(
                    DebtToSave(
                        creditor=balances[0]['id'],
                        debtor=balances[-1]['id'],
                        summ=summ,
                        repaid=False,
                    )
                )
            else:
                balances.pop(0)
                balances.pop()
            if abs(big) > abs(small):
                balances[0]['balance'] = big + small
                balances.pop()
            elif abs(big) < abs(small):
                balances[-1]['balance'] = big + small
                balances.pop(0)
            else:
                balances.pop(0)
                balances.pop()

    for repaid_debt in [debt for debt in event['debts'] if debt['repaid']]:
        new_debts.append(
            DebtToSave(
                creditor=repaid_debt['creditor'],
                debtor=repaid_debt['debtor'],
                summ=custom_round(repaid_debt['summ']),
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
            {"$set": {"debts": [{"_id": ObjectId(), "creditor": debt.creditor, "debtor": debt.debtor, "summ": custom_round(debt.summ),
                                 "repaid": debt.repaid} for debt in new_debts]}},
        )

def custom_round(value):
    precision = str(value).split('.')[1]
    if len(precision) >= 3:
        if precision[1] == '9':
            value = math.ceil(value)
    return value


