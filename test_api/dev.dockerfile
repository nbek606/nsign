FROM python:3.12-alpine

WORKDIR /app

COPY ./requirements.txt .
RUN  pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
ENTRYPOINT ["python3"]