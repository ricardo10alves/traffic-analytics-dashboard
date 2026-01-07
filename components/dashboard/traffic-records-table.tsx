"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TrafficRecord {
  id: number
  intersection_id: number
  timestamp: string
  vehicle_count: number
  average_wait_time: number
  peak_hour: boolean
}

interface TrafficRecordsTableProps {
  records: TrafficRecord[]
  intersections: Map<number, string>
}

export function TrafficRecordsTable({ records, intersections }: TrafficRecordsTableProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Intersection</TableHead>
            <TableHead className="text-right">Vehicles</TableHead>
            <TableHead className="text-right">Wait Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{formatTimestamp(record.timestamp)}</TableCell>
                <TableCell>{intersections.get(record.intersection_id) || "Unknown"}</TableCell>
                <TableCell className="text-right">{record.vehicle_count}</TableCell>
                <TableCell className="text-right">{record.average_wait_time.toFixed(1)}s</TableCell>
                <TableCell>
                  {record.peak_hour ? (
                    <Badge variant="default">Peak Hour</Badge>
                  ) : (
                    <Badge variant="secondary">Normal</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
