import datetime
import decimal
from typing import List, Any
from pydantic import BaseModel


"""
*******************  MODELS  ******************* 
"""
class Event(BaseModel):
    title: str
    users: List['User']
    debts: List['Debt']
    expenses: List['Expense']

class User(BaseModel):
    name: str

class Debt(BaseModel):
    creditor: 'User'
    debtor: 'User'
    repaid: bool

class Expense(BaseModel):
    title: str
    creditor: 'User'
    debtors: List['User']
    date: datetime.datetime


"""
*******************  SCHEMAS  ******************* 
"""


class CreateEvent(BaseModel):
    title: str

class CreateUser(BaseModel):
    name: str

class UserOutput(BaseModel):
    id: str
    name: str

class CreateExpense(BaseModel):
    title: str
    creditor_id: str
    debtors_id: List['str']
    summ: float
    datetime: datetime.datetime | None

class ExpenseOutput(BaseModel):
    id: str
    title: str
    creditor: UserOutput
    debtors: List[UserOutput]
    summ: float
    datetime: datetime.datetime | None

class DebtToSave(BaseModel):
    creditor: str
    debtor: str
    summ: float
    repaid: bool

class DebtOutput(BaseModel):
    id: Any
    creditor: Any
    debtor: Any
    summ: Any
    repaid: Any