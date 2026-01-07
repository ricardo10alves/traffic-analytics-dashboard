-- Insert sample intersections
INSERT INTO intersections (name, location, latitude, longitude) VALUES
('Main St & 1st Ave', 'Downtown', 40.7589, -73.9851),
('Oak Rd & Elm St', 'Midtown', 40.7614, -73.9776),
('Park Ave & 5th St', 'Uptown', 40.7831, -73.9712),
('River Rd & Bridge St', 'Waterfront', 40.7489, -73.9680),
('Highway 101 & Central Blvd', 'Suburbs', 40.7128, -74.0060);

-- Insert sample traffic records for the past 7 days
-- This will be replaced by Python-generated data, but serves as initial seed
INSERT INTO traffic_records (intersection_id, timestamp, vehicle_count, average_wait_time, peak_hour) VALUES
-- Day 1 samples
(1, datetime('now', '-7 days', '8 hours'), 245, 45.5, TRUE),
(1, datetime('now', '-7 days', '12 hours'), 189, 32.3, FALSE),
(1, datetime('now', '-7 days', '17 hours'), 312, 58.7, TRUE),
(2, datetime('now', '-7 days', '8 hours'), 198, 38.2, TRUE),
(2, datetime('now', '-7 days', '12 hours'), 156, 28.9, FALSE),
(3, datetime('now', '-7 days', '9 hours'), 278, 52.1, TRUE),
(4, datetime('now', '-7 days', '8 hours'), 167, 35.6, FALSE),
(5, datetime('now', '-7 days', '7 hours'), 423, 71.4, TRUE);
