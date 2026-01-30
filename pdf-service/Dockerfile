FROM python:3.12-slim-bookworm
WORKDIR /app

RUN apt-get update && apt-get install -y \ 
    build-essential \
    libpango-1.0-0 \
    libpangoft2-1.0-0

COPY ./requirements.txt .
COPY ./main.py .

RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0","--reload", "--port", "8000"]
