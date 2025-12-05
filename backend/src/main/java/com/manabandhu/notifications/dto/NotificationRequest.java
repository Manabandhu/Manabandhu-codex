package com.manabandhu.notifications.dto;

import jakarta.validation.constraints.NotBlank;

public record NotificationRequest(
        @NotBlank String type,
        String payload
) {}
