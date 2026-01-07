-- Create intersections table
CREATE TABLE IF NOT EXISTS intersections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create traffic_records table
CREATE TABLE IF NOT EXISTS traffic_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    intersection_id INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    vehicle_count INTEGER NOT NULL,
    average_wait_time REAL NOT NULL,
    peak_hour BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (intersection_id) REFERENCES intersections(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_traffic_records_intersection_id ON traffic_records(intersection_id);
CREATE INDEX IF NOT EXISTS idx_traffic_records_timestamp ON traffic_records(timestamp);
CREATE INDEX IF NOT EXISTS idx_traffic_records_peak_hour ON traffic_records(peak_hour);
