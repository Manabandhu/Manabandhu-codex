package com.manabandhu.chat.controller;

import com.manabandhu.chat.dto.ChatMessageDto;
import com.manabandhu.chat.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/v1/chat")
public class ChatController {

    private final ChatService service;

    public ChatController(ChatService service) {
        this.service = service;
    }

    @GetMapping("/rooms/{roomId}")
    public Flux<ChatMessageDto> messages(@PathVariable String roomId) {
        return service.findByRoom(roomId);
    }

    @PostMapping("/rooms/{roomId}")
    public Mono<ChatMessageDto> post(@PathVariable String roomId, @RequestBody ChatMessageDto dto) {
        return service.send(new ChatMessageDto(dto.id(), roomId, dto.senderId(), dto.content(), dto.createdAt()));
    }
}
