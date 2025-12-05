package com.manabandhu.room.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public record RoomListingResponse(
        String id,
        String title,
        String location,
        BigDecimal price,
        String description,
        List<String> amenities,
        OffsetDateTime createdAt
) {}
