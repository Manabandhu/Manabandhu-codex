package com.manabandhu.chat.service;

import com.manabandhu.chat.dto.ChatMessageRequest;
import com.manabandhu.chat.dto.ChatMessageResponse;
import java.util.List;

public interface ChatService {
    List<ChatMessageResponse> messages(String roomId);
    ChatMessageResponse send(String roomId, String senderId, ChatMessageRequest request);
}
