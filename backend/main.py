from datetime import datetime, timedelta
from fastapi import Request
from fastapi.responses import Response
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_generator import generate_traffic_records, INTERSECTIONS
import threading
import time

TRAFFIC_RECORDS = generate_traffic_records(120)

def refresh_data(interval_seconds: int = 120):
    global TRAFFIC_RECORDS
    while True:
        time.sleep(interval_seconds)
        TRAFFIC_RECORDS = generate_traffic_records()
        print("Traffic data regenerated")
        
def filter_by_days(records, days: int):
    cutoff = datetime.now() - timedelta(days=days)
    return [
        r for r in records
        if datetime.fromisoformat(r["timestamp"]) >= cutoff
    ]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.options("/{path:path}")
async def options_handler(path: str):
    return Response(status_code=200)

threading.Thread(target=refresh_data, daemon=True).start()


@app.get("/api/intersections")
def get_intersections():
    return INTERSECTIONS

@app.get("/api/metrics")
def get_metrics(intersection_id: int | None = None, days: int = 7):
    records = filter_by_days(TRAFFIC_RECORDS, days)

    if intersection_id:
        records = [r for r in records if r["intersection_id"] == intersection_id]

    metrics = {}

    for r in records:
        iid = r["intersection_id"]
        metrics.setdefault(iid, {
            "intersection_id": iid,
            "intersection_name": r["intersection_name"],
            "total_vehicles": 0,
            "wait_times": [],
        })

        metrics[iid]["total_vehicles"] += r["vehicle_count"]
        metrics[iid]["wait_times"].append(r["average_wait_time"])

    return [
        {
            "intersection_id": m["intersection_id"],
            "intersection_name": m["intersection_name"],
            "total_vehicles": m["total_vehicles"],
            "average_wait_time": round(
                sum(m["wait_times"]) / len(m["wait_times"]), 1
            ),
        }
        for m in metrics.values()
    ]

@app.get("/api/hourly")
def get_hourly(intersection_id: int | None = None, days: int = 7):
    records = filter_by_days(TRAFFIC_RECORDS, days)

    hourly = {}

    for r in records:
        if intersection_id and r["intersection_id"] != intersection_id:
            continue

        hour = datetime.fromisoformat(r["timestamp"]).hour
        hourly.setdefault(hour, []).append(r["vehicle_count"])

    return [
        {
            "hour": h,
            "average_vehicles": round(sum(v) / len(v)),
        }
        for h, v in sorted(hourly.items())
    ]

@app.get("/api/records")
def get_records(intersection_id: int | None = None, limit: int = 20, days: int = 7):
    records = TRAFFIC_RECORDS

    records = filter_by_days(records, days)

    if intersection_id:
        records = [r for r in records if r["intersection_id"] == intersection_id]

    return records[:limit]