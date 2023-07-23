FROM python:3.10-alpine3.16

COPY requirements.txt /temp/requirements.txt
COPY . /shashlik
WORKDIR /shashlik

EXPOSE 8000
RUN apk update && apk add build-base && apk add libffi-dev && apk add git
RUN pip install --upgrade pip
RUN pip install -r /temp/requirements.txt
RUN adduser --disabled-password shashlik-user
USER shashlik-user



