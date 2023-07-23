import os
from functools import lru_cache

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings
# Postgres
POSTGRES_USER="admin"
POSTGRES_PASSWORD="admin"
POSTGRES_HOST="db"
POSTGRES_PORT=5432
POSTGRES_DB="shashlik"
# PGAdmin
PGADMIN_EMAIL="admin@admin.ru"
PGADMIN_PASSWORD="admin"

POSTGRES_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

SECRET_KEY = "RANDOM_HASH_SECRET_KEY"
ALGORITHM = "HS256"
# class Settings(BaseSettings):
#     POSTGRES_URL = os.environ.get('POSTGRES_URL')
    # POSTGRES_USER: str
    # POSTGRES_PASSWORD: str
    # POSTGRES_HOST: str
    # POSTGRES_PORT: int
    # POSTGRES_DB: str
    # PGADMIN_EMAIL: str
    # PGADMIN_PASSWORD: str
    # POSTGRES_URL: PostgresDsn
    # SECRET_KEY: str
    # ALGORITHM: str
    # ACCESS_TOKEN_EXPIRE_MINUTES: int
    # DATE_FORMAT: str
    #
    # class Config:
    #     env_file = "./.env"


# @lru_cache
# def get_settings():
#     return Settings()


# settings = get_settings()


