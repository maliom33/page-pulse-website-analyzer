# Page Pulse Backend

A production-ready Flask REST API for analyzing webpage HTML and returning a simple JSON report.

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows use .venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
python app.py
```

## Endpoint

POST /api/analyze

Example request:

```json
{
  "url": "https://example.com"
}
```
