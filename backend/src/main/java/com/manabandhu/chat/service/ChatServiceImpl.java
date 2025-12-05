package com.manabandhu.chat.service;

import com.manabandhu.chat.dto.ChatMessageRequest;
import com.manabandhu.chat.dto.ChatMessageResponse;
import com.manabandhu.chat.entity.ChatMessage;
import com.manabandhu.chat.mapper.ChatMessageMapper;
import com.manabandhu.chat.repository.ChatMessageRepository;
import com.manabandhu.common.exceptions.BadRequestException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatServiceImpl implements ChatService {

    private final ChatMessageRepository repository;

    public ChatServiceImpl(ChatMessageRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ChatMessageResponse> messages(String roomId) {
        return repository.findByRoomIdOrderByCreatedAtAsc(roomId).stream().map(ChatMessageMapper::toResponse).toList();
    }

    @Override
    @Transactional
    public ChatMessageResponse send(String roomId, String senderId, ChatMessageRequest request) {
        if (roomId == null || roomId.isBlank()) {
            throw new BadRequestException("Room id is required");
        }
        ChatMessage entity = new ChatMessage();
        entity.setRoomId(roomId);
        entity.setSenderId(senderId);
        entity.setContent(request.content());
        return ChatMessageMapper.toResponse(repository.save(entity));
    }
}
