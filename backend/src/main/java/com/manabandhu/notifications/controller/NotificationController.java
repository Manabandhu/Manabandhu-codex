package com.manabandhu.notifications.controller;

import com.manabandhu.common.api.ApiResponse;
import com.manabandhu.notifications.dto.NotificationRequest;
import com.manabandhu.notifications.dto.NotificationResponse;
import com.manabandhu.notifications.service.NotificationService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> list(Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(notificationService.list(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NotificationResponse>> create(
            @Valid @RequestBody NotificationRequest request,
            Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(notificationService.create(userId, request)));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<ApiResponse<NotificationResponse>> markRead(
            @PathVariable String id,
            Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(notificationService.markRead(id, userId)));
    }
}
