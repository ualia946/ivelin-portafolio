FROM python:3.12-slim-bookworm
WORKDIR /app

RUN apt-get update && apt-get install -y \ 
    build-essential \
    python3-dev \
    python3-cffi \
    python3-brotli \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    shared-mime-info \
    fonts-dejavu \
    fonts-liberation \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0","--reload", "--port", "8000"]
