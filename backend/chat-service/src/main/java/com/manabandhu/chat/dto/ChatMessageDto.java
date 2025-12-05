package com.manabandhu.chat.dto;

import java.time.Instant;

public record ChatMessageDto(String id, String roomId, String senderId, String content, Instant createdAt) {}
