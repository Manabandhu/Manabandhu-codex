package com.manabandhu.ride.dto;

import java.time.OffsetDateTime;

public record RideResponse(
        String id,
        String route,
        String time,
        Integer seats,
        String notes,
        String status,
        OffsetDateTime createdAt
) {}
