-- SQL VIEW for real-time room status calculation
-- This view implements the priority logic for room status determination

CREATE OR REPLACE VIEW room_status_view AS
SELECT 
    r.id,
    r.room_number,
    r.room_name,
    r.price_per_night,
    r.room_type_id,
    r.status as room_base_status,
    rt.name as room_type_name,
    rt.base_price,
    
    -- Priority-based status calculation
    CASE 
        -- Priority 1: If room is in MAINTENANCE
        WHEN r.status = 'MAINTENANCE' THEN 'MAINTENANCE'
        
        -- Priority 2: If there's a CHECKED_IN booking
        WHEN EXISTS (
            SELECT 1 FROM bookings b 
            WHERE b.room_id = r.id 
            AND b.status = 'CHECKED_IN'
        ) THEN 'OCCUPIED'
        
        -- Priority 3: If there's a RESERVED booking for today or future
        WHEN EXISTS (
            SELECT 1 FROM bookings b 
            WHERE b.room_id = r.id 
            AND b.status = 'RESERVED' 
            AND b.start_date >= CURRENT_DATE
        ) THEN 'RESERVED'
        
        -- Priority 4: Otherwise AVAILABLE
        ELSE 'AVAILABLE'
    END as calculated_status,
    
    -- Additional booking information for UI
    (
        SELECT json_build_object(
            'id', b.id,
            'guest_id', b.guest_id,
            'start_date', b.start_date,
            'end_date', b.end_date,
            'status', b.status,
            'guest_full_name', g.full_name,
            'guest_email', g.email,
            'guest_phone', g.phone
        )
        FROM bookings b
        LEFT JOIN guests g ON b.guest_id = g.id
        WHERE b.room_id = r.id 
        AND b.status IN ('CHECKED_IN', 'RESERVED')
        ORDER BY 
            CASE b.status 
                WHEN 'CHECKED_IN' THEN 1 
                WHEN 'RESERVED' THEN 2 
            END,
            b.start_date
        LIMIT 1
    ) as current_booking,
    
    -- Count of active bookings for analytics
    (
        SELECT COUNT(*)
        FROM bookings b 
        WHERE b.room_id = r.id 
        AND b.status IN ('CHECKED_IN', 'RESERVED')
        AND b.end_date >= CURRENT_DATE
    ) as active_bookings_count,
    
    -- Next available date (if room is reserved/occupied)
    (
        SELECT MIN(end_date)
        FROM bookings b 
        WHERE b.room_id = r.id 
        AND b.status IN ('CHECKED_IN', 'RESERVED')
        AND b.end_date >= CURRENT_DATE
    ) as next_available_date,

    CURRENT_TIMESTAMP as last_updated

FROM rooms r
LEFT JOIN room_types rt ON r.room_type_id = rt.id;

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_room_status_view_calculated_status ON room_status_view(calculated_status);
CREATE INDEX IF NOT EXISTS idx_room_status_view_room_number ON room_status_view(room_number);

-- Comment explaining the view logic
COMMENT ON VIEW room_status_view IS 'Real-time room status view with priority-based status calculation: MAINTENANCE > OCCUPIED (CHECKED_IN) > RESERVED (future) > AVAILABLE';
