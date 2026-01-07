import sqlite3
import random
from datetime import datetime, timedelta

# Database connection
conn = sqlite3.connect('traffic_analytics.db')
cursor = conn.cursor()

# Get all intersection IDs
cursor.execute("SELECT id FROM intersections")
intersection_ids = [row[0] for row in cursor.fetchall()]

print(f"Generating traffic data for {len(intersection_ids)} intersections...")

# Generate traffic records for the past 30 days
start_date = datetime.now() - timedelta(days=30)
records_generated = 0

for intersection_id in intersection_ids:
    # Generate records for each hour of each day
    current_date = start_date
    
    while current_date <= datetime.now():
        hour = current_date.hour
        
        # Determine if it's peak hour (7-9 AM or 5-7 PM)
        is_peak_hour = (7 <= hour <= 9) or (17 <= hour <= 19)
        
        # Generate vehicle count based on peak hours
        if is_peak_hour:
            vehicle_count = random.randint(200, 500)
            average_wait_time = random.uniform(40.0, 80.0)
        else:
            vehicle_count = random.randint(50, 200)
            average_wait_time = random.uniform(15.0, 45.0)
        
        # Add some randomness based on day of week
        if current_date.weekday() >= 5:  # Weekend
            vehicle_count = int(vehicle_count * 0.7)
            average_wait_time *= 0.8
        
        # Insert record
        cursor.execute("""
            INSERT INTO traffic_records 
            (intersection_id, timestamp, vehicle_count, average_wait_time, peak_hour)
            VALUES (?, ?, ?, ?, ?)
        """, (
            intersection_id,
            current_date.strftime('%Y-%m-%d %H:%M:%S'),
            vehicle_count,
            round(average_wait_time, 2),
            is_peak_hour
        ))
        
        records_generated += 1
        current_date += timedelta(hours=1)

# Commit changes
conn.commit()
conn.close()

print(f"Successfully generated {records_generated} traffic records!")
print(f"Average records per intersection: {records_generated // len(intersection_ids)}")
