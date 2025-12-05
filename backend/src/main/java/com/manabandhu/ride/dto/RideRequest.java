package com.manabandhu.ride.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RideRequest(
        @NotBlank String route,
        String time,
        @NotNull Integer seats,
        String notes,
        String status
) {}
