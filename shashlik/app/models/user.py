from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, intpk, str100


class User(Base):
    __tablename__ = "user"

    id: Mapped[intpk]
    first_name: Mapped[str100 | None]



    # email: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)

