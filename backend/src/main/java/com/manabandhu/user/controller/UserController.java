package com.manabandhu.user.controller;

import com.manabandhu.common.api.ApiResponse;
import com.manabandhu.common.api.PageResponse;
import com.manabandhu.user.dto.UserProfileRequest;
import com.manabandhu.user.dto.UserProfileResponse;
import com.manabandhu.user.service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserProfileService service;

    public UserController(UserProfileService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<UserProfileResponse>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(service.list(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserProfileResponse>> get(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(service.get(id)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> me(Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(service.getForAccount(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserProfileResponse>> create(
            @Valid @RequestBody UserProfileRequest request,
            Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(service.save(null, request, userId)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserProfileResponse>> update(
            @PathVariable String id,
            @Valid @RequestBody UserProfileRequest request,
            Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(service.save(id, request, userId)));
    }
}
