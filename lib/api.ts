const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function getIntersections() {
  const res = await fetch(`${API_URL}/api/intersections`);
  return res.json();
}

export async function getTrafficMetrics(params: {
  intersection_id?: number;
  days?: number;
}) {
  const query = new URLSearchParams();
  if (params.intersection_id) query.append("intersection_id", params.intersection_id.toString());
  if (params.days) query.append("days", params.days.toString());

  const res = await fetch(`${API_URL}/api/metrics?${query}`);
  return res.json();
}

export async function getHourlyAggregate(params: {
  intersection_id?: number;
  days?: number;
}) {
  const query = new URLSearchParams();
  if (params.intersection_id) query.append("intersection_id", params.intersection_id.toString());
  if (params.days) query.append("days", params.days.toString());

  const res = await fetch(`${API_URL}/api/hourly?${query}`);
  return res.json();
}

export async function getTrafficRecords(params: {
  intersection_id?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();

  if (params.intersection_id)
    query.append("intersection_id", params.intersection_id.toString());
  if (params.limit)
    query.append("limit", params.limit.toString());

  const res = await fetch(`${API_URL}/api/records?${query}`);
  return res.json();
}