package com.manabandhu.notifications.dto;

import java.time.OffsetDateTime;

public record NotificationResponse(
        String id,
        String userId,
        String type,
        String payload,
        boolean read,
        OffsetDateTime createdAt
) {}
