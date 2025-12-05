package com.manabandhu.chat.service;

import com.manabandhu.chat.dto.ChatMessageDto;
import com.manabandhu.chat.entity.ChatMessage;
import com.manabandhu.chat.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ChatService {
    private final ChatMessageRepository repository;

    public ChatService(ChatMessageRepository repository) {
        this.repository = repository;
    }

    public Flux<ChatMessageDto> findByRoom(String roomId) {
        return Flux.fromIterable(repository.findAll())
                .filter(m -> m.getRoomId().equals(roomId))
                .map(this::toDto);
    }

    public Mono<ChatMessageDto> send(ChatMessageDto dto) {
        ChatMessage entity = new ChatMessage();
        entity.setId(dto.id());
        entity.setRoomId(dto.roomId());
        entity.setSenderId(dto.senderId());
        entity.setContent(dto.content());
        entity.setCreatedAt(dto.createdAt());
        return Mono.fromCallable(() -> repository.save(entity)).map(this::toDto);
    }

    private ChatMessageDto toDto(ChatMessage entity) {
        return new ChatMessageDto(entity.getId(), entity.getRoomId(), entity.getSenderId(), entity.getContent(), entity.getCreatedAt());
    }
}
