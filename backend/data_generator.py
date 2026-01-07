import random
from datetime import datetime, timedelta

INTERSECTIONS = [
    {"id": 1, "name": "A1 & Main Street"},
    {"id": 2, "name": "B2 & Central Avenue"},
    {"id": 3, "name": "C3 & Riverside"},
]

def generate_traffic_records(count: int = 120):
    records = []
    now = datetime.now()

    for i in range(count):
        intersection = random.choice(INTERSECTIONS)
        timestamp = now - timedelta(minutes=i * 5)
        hour = timestamp.hour

        peak = hour in range(7, 10) or hour in range(16, 19)

        vehicle_count = random.randint(40, 80) if peak else random.randint(10, 40)
        avg_wait = random.uniform(25, 45) if peak else random.uniform(10, 25)

        records.append({
            "id": i + 1,
            "intersection_id": intersection["id"],
            "intersection_name": intersection["name"],
            "vehicle_count": vehicle_count,
            "average_wait_time": round(avg_wait, 1),
            "peak_hour": peak,
            "timestamp": timestamp.isoformat(),
        })

    return records