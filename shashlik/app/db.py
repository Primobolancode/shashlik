from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId


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





