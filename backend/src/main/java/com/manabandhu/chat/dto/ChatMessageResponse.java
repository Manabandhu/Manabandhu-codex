package com.manabandhu.chat.dto;

import java.time.OffsetDateTime;

public record ChatMessageResponse(
        String id,
        String roomId,
        String senderId,
        String content,
        OffsetDateTime createdAt
) {}
