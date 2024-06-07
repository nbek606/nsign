FROM python:3.12-alpine

WORKDIR /app

COPY . .
RUN  pip install --no-cache-dir -r requirements.txt

RUN python manage.py migrate
RUN python manage.py inituser

EXPOSE 8000
ENTRYPOINT ["python3"]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]