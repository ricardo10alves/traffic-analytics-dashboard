'use client';

import { useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, TrendingUp, Clock, BarChart3 } from "lucide-react"
import { TrafficVolumeChart } from "./traffic-volume-chart"
import { WaitTimeChart } from "./wait-time-chart"
import { TrafficDistributionChart } from "./traffic-distribution-chart"
import { TrafficRecordsTable } from "./traffic-records-table"
import {
  getIntersections,
  getTrafficRecords,
  getTrafficMetrics,
  getHourlyAggregate,
  type Intersection,
} from "@/lib/api"

export function TrafficDashboard() {
  const [selectedIntersection, setSelectedIntersection] = useState<string>("all")

  // Fetch intersections
  const { data: intersections } = useSWR<Intersection[]>("intersections", getIntersections)

  // Fetch metrics based on filters
  const { data: metrics } = useSWR(
  ["metrics", selectedIntersection],
  () =>
    getTrafficMetrics({
      intersection_id:
        selectedIntersection === "all"
          ? undefined
          : Number.parseInt(selectedIntersection),
    }),
)

  // Fetch hourly aggregate
  const { data: hourlyData } = useSWR(
  ["hourly", selectedIntersection],
  () =>
    getHourlyAggregate({
      intersection_id:
        selectedIntersection === "all"
          ? undefined
          : Number.parseInt(selectedIntersection),
    }),
)

  // Fetch recent traffic records
  const { data: records } = useSWR(
  ["records", selectedIntersection],
  () =>
    getTrafficRecords({
      intersection_id:
        selectedIntersection === "all"
          ? undefined
          : Number.parseInt(selectedIntersection),
      limit: 20,
    }),
)


  // Create intersection name map
  const intersectionMap = new Map<number, string>()
  intersections?.forEach((intersection) => {
    intersectionMap.set(intersection.id, intersection.name)
  })

  // Calculate summary statistics
  const totalVehicles = metrics?.reduce((sum, m) => sum + m.total_vehicles, 0) || 0
  const avgWaitTime = metrics?.length ? metrics.reduce((sum, m) => sum + m.average_wait_time, 0) / metrics.length : 0
  const peakHour = hourlyData?.reduce((max, h) => (h.average_vehicles > max.average_vehicles ? h : max), hourlyData[0])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Smart Traffic Analytics</h1>
              <p className="text-muted-foreground mt-1">Real-time traffic monitoring and insights</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Select value={selectedIntersection} onValueChange={setSelectedIntersection}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select intersection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Intersections</SelectItem>
                  {intersections?.map((intersection) => (
                    <SelectItem key={intersection.id} value={intersection.id.toString()}>
                      {intersection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Vehicles</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVehicles.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">During selected period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgWaitTime.toFixed(1)}s</div>
              <p className="text-xs text-muted-foreground mt-1">Across all intersections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Peak Hour</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{peakHour ? `${peakHour.hour}:00` : "N/A"}</div>
              <p className="text-xs text-muted-foreground mt-1">Highest traffic volume</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Intersections</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{intersections?.length || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Volume by Hour</CardTitle>
              <CardDescription>Average vehicle count per hour of day</CardDescription>
            </CardHeader>
            <CardContent>
              {hourlyData && hourlyData.length > 0 ? (
                <TrafficVolumeChart data={hourlyData} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Loading chart data...
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wait Time Distribution</CardTitle>
              <CardDescription>Average wait times across intersections</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics && metrics.length > 0 ? (
                <WaitTimeChart data={metrics} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Loading chart data...
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Traffic Records</CardTitle>
              <CardDescription>Latest traffic data from all intersections</CardDescription>
            </CardHeader>
            <CardContent>
              {records ? (
                <TrafficRecordsTable records={records} intersections={intersectionMap} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Loading records...
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Distribution</CardTitle>
              <CardDescription>By intersection location</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics && metrics.length > 0 ? (
                <TrafficDistributionChart data={metrics} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Loading chart data...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
