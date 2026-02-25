# Hotel Management System - Room Status Implementation

## Overview
This implementation provides a real-time room status calculation system for a hotel management application using Supabase (PostgreSQL) and React.

## Architecture

### Database Layer
- **SQL View**: `room_status_view` implements priority-based status calculation
- **Priority Order**: MAINTENANCE > OCCUPIED (CHECKED_IN) > RESERVED (future) > AVAILABLE
- **Performance**: Optimized with indexes and single query execution

### Service Layer
- **roomsService**: Fetches data from the SQL view
- **Real-time Updates**: 30-second refresh interval
- **Data Transformation**: Converts view data to UI-friendly format

### React Components
- **Rooms.jsx**: Main container component
- **RoomPage.jsx**: Dashboard with filtering and search
- **RoomCard.jsx**: Individual room display with status-based styling

### React Hooks
- **useRoomStatus**: Core hook for room data with real-time updates
- **useRoomStats**: Statistics and analytics
- **useFilteredRooms**: Filtered room data

## Status Priority Logic

1. **MAINTENANCE**: If `rooms.status = 'MAINTENANCE'`
2. **OCCUPIED**: If exists booking with `status = 'CHECKED_IN'`
3. **RESERVED**: If exists booking with `status = 'RESERVED'` and `start_date >= today`
4. **AVAILABLE**: Otherwise

## Installation & Setup

### 1. Database Setup
Execute the SQL view in your Supabase database:
```sql
-- See: database/views/room_status_view.sql
```

### 2. Update Types
The `RoomStatus` enum now includes:
```javascript
export const RoomStatus = {
  AVAILABLE: "AVAILABLE",
  OCCUPIED: "OCCUPIED", 
  RESERVED: "RESERVED",
  MAINTENANCE: "MAINTENANCE",
  CLEANING: "CLEANING",
};
```

### 3. Component Usage
```jsx
import { useRoomStatus } from '@/hooks/useRoomStatus';

function RoomDashboard() {
  const { data: rooms, isLoading, error } = useRoomStatus();
  
  // Component logic...
}
```

## Features

### Real-time Status
- Automatic status updates every 30 seconds
- Consistent status calculation across all components
- Prevents double booking and status inconsistencies

### Performance Optimizations
- Single SQL query for all room data
- Database-level status calculation
- Indexed queries for fast filtering

### UI Features
- Color-coded room cards by status
- Filter by room status (All, Available, Occupied, Reserved, Maintenance)
- Search by room number or type
- Guest information tooltips for occupied rooms

### Status Colors
- **Available**: Green (emerald)
- **Occupied**: Red (rose)  
- **Reserved**: Blue
- **Maintenance**: Yellow (amber)

## Data Structure

### Room Object
```javascript
{
  id: "uuid",
  number: "101",
  type: "Deluxe Suite",
  name: "Ocean View Suite",
  status: "AVAILABLE", // Calculated status
  price: 250.00,
  basePrice: 200.00,
  roomTypeId: "uuid",
  activeBookingsCount: 0,
  nextAvailableDate: null,
  guest: null | {
    id: "uuid",
    name: "John Doe",
    email: "john@example.com", 
    phone: "+1234567890",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    status: "CHECKED_IN"
  }
}
```

## Best Practices

### Database
- Use views for complex calculations
- Add appropriate indexes
- Keep business logic in the database

### React
- Use custom hooks for data fetching
- Implement proper error handling
- Add loading states
- Use React Query for caching

### Performance
- Minimize API calls
- Use database-level filtering
- Implement proper caching strategies
- Optimize re-renders

## Future Enhancements

1. **WebSocket Integration**: Real-time updates without polling
2. **Advanced Filtering**: Date ranges, price ranges, amenities
3. **Analytics Dashboard**: Occupancy trends, revenue metrics
4. **Mobile Optimization**: Touch-friendly interface
5. **Offline Support**: PWA capabilities

## Troubleshooting

### Common Issues
1. **View not found**: Run the SQL view creation script
2. **Status not updating**: Check view logic and booking dates
3. **Performance issues**: Verify indexes are created
4. **Missing data**: Ensure proper foreign key relationships

### Debug Queries
```sql
-- Test the view directly
SELECT * FROM room_status_view ORDER BY room_number;

-- Check status calculation
SELECT 
  room_number, 
  room_base_status, 
  calculated_status,
  current_booking
FROM room_status_view 
WHERE calculated_status != room_base_status;
```
