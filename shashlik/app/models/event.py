from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, intpk, str100




class Event(Base):
    __tablename__ = "event"

    id: Mapped[intpk]
    title: Mapped[str100]
