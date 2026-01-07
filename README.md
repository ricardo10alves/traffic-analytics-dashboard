# Smart Traffic Analytics Dashboard

A full-stack web application for visualizing and analyzing traffic data across multiple intersections. This project demonstrates modern web development practices, data processing, and backend API design.

## 🎯 Project Overview

This dashboard provides real-time insights into traffic patterns, helping traffic management teams make data-driven decisions. It features interactive charts, metrics, and filtering capabilities to analyze vehicle counts, wait times, and peak hour patterns.

## 🛠️ Tech Stack

### Frontend
- **React** with **TypeScript** - Modern component-based UI
- **Next.js 16** - Full-stack React framework
- **Recharts** - Data visualization library
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - High-quality UI components

### Backend
- **Python** with **FastAPI** - High-performance REST API
- **SQLite** - Lightweight SQL database
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

## ✨ Features

### Backend API
- ✅ List all traffic intersections
- ✅ Retrieve traffic records with filters (by intersection, date range)
- ✅ Get aggregated metrics (total vehicles, average wait times)
- ✅ Hourly traffic analysis and peak hour detection
- ✅ RESTful API design with clear endpoint structure
- ✅ Automatic data generation scripts

### Frontend Dashboard
- ✅ Interactive charts (line, bar, pie)
- ✅ Real-time traffic metrics display
- ✅ Filter by intersection and time period
- ✅ Responsive design for all devices
- ✅ Clean, professional UI
- ✅ Data tables with sorting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database**
   
   Run the SQL scripts to create tables and seed initial data:
   ```bash
   # Go back to root directory
   cd ..
   
   # Create database and run schema
   sqlite3 traffic_analytics.db < scripts/01-create-tables.sql
   sqlite3 traffic_analytics.db < scripts/02-seed-data.sql
   ```

5. **Generate traffic data**
   ```bash
   python scripts/03-generate-traffic-data.py
   ```

6. **Start the FastAPI server**
   ```bash
   cd backend
   python main.py
   ```
   
   The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - API Schema: `http://localhost:8000/redoc`

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The dashboard will be available at `http://localhost:3000`

## 📁 Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── page.tsx             # Dashboard main page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── dashboard/           # Dashboard-specific components
│   └── ui/                  # Reusable UI components
├── backend/                 # FastAPI backend
│   ├── main.py             # API routes and logic
│   └── requirements.txt     # Python dependencies
├── scripts/                 # Database scripts
│   ├── 01-create-tables.sql
│   ├── 02-seed-data.sql
│   └── 03-generate-traffic-data.py
└── README.md               # This file
```

## 🔌 API Endpoints

### Intersections
- `GET /api/intersections` - Get all intersections
- `GET /api/intersections/{id}` - Get specific intersection

### Traffic Records
- `GET /api/traffic-records` - Get traffic records (with filters)
  - Query params: `intersection_id`, `start_date`, `end_date`, `limit`

### Analytics
- `GET /api/metrics` - Get aggregated metrics
  - Query params: `intersection_id`, `days`
- `GET /api/hourly-aggregate` - Get hourly averages
  - Query params: `intersection_id`, `days`
- `GET /api/peak-hours` - Get peak hours analysis
  - Query params: `days`

## 🎨 Design Decisions

- **Modular Architecture**: Clear separation between routes, services, and models
- **Type Safety**: TypeScript on frontend, Pydantic on backend
- **Performance**: Indexed database queries, efficient data aggregation
- **Scalability**: RESTful API design allows easy extension
- **User Experience**: Responsive design, intuitive filtering, clear data visualization

## 📊 Data Model

### Intersections Table
- `id` - Unique identifier
- `name` - Intersection name
- `location` - Area description
- `latitude/longitude` - GPS coordinates

### Traffic Records Table
- `id` - Unique identifier
- `intersection_id` - Foreign key to intersections
- `timestamp` - When the record was captured
- `vehicle_count` - Number of vehicles
- `average_wait_time` - Average wait time in seconds
- `peak_hour` - Boolean flag for peak hours

## 🧪 Future Enhancements

- Real-time data streaming with WebSockets
- User authentication and role-based access
- Export data to CSV/PDF
- Predictive analytics using machine learning
- Mobile app version
- Alert system for traffic anomalies

## 📝 License

This project is for portfolio demonstration purposes.

## 👤 Author

Built as a portfolio project demonstrating full-stack development skills for Junior Software Developer positions.
