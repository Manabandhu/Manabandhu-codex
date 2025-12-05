package com.manabandhu.chat.mapper;

import com.manabandhu.chat.dto.ChatMessageResponse;
import com.manabandhu.chat.entity.ChatMessage;

public final class ChatMessageMapper {
    private ChatMessageMapper() {}

    public static ChatMessageResponse toResponse(ChatMessage entity) {
        return new ChatMessageResponse(
                entity.getId(),
                entity.getRoomId(),
                entity.getSenderId(),
                entity.getContent(),
                entity.getCreatedAt()
        );
    }
}
