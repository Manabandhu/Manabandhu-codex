package com.manabandhu.chat.controller;

import com.manabandhu.chat.dto.ChatMessageRequest;
import com.manabandhu.chat.dto.ChatMessageResponse;
import com.manabandhu.chat.service.ChatService;
import com.manabandhu.common.api.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    private final ChatService service;

    public ChatController(ChatService service) {
        this.service = service;
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>> messages(@PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.success(service.messages(roomId)));
    }

    @PostMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<ChatMessageResponse>> post(
            @PathVariable String roomId,
            @Valid @RequestBody ChatMessageRequest request,
            Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(service.send(roomId, userId, request)));
    }
}
