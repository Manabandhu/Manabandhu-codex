package com.manabandhu.room.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public record RoomListingRequest(
        @NotBlank String title,
        @NotBlank String location,
        @NotNull BigDecimal price,
        String description,
        List<String> amenities
) {}
