package com.manabandhu.auth.controller;

import com.manabandhu.auth.dto.AuthRequest;
import com.manabandhu.auth.dto.AuthResponse;
import com.manabandhu.auth.dto.UserDto;
import com.manabandhu.auth.service.AuthService;
import com.manabandhu.common.api.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.authenticate(request)));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> signup(@Valid @RequestBody com.manabandhu.auth.dto.SignupRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.signup(request)));
    }

    @PostMapping("/onboarding")
    public ResponseEntity<ApiResponse<Void>> onboarding(Authentication authentication, @Valid @RequestBody com.manabandhu.auth.dto.OnboardingRequest request) {
        String userId = authentication != null ? authentication.getName() : null;
        authService.completeOnboarding(userId, request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/password-reset/request")
    public ResponseEntity<ApiResponse<Void>> requestPasswordReset(@Valid @RequestBody com.manabandhu.auth.dto.PasswordResetRequest request) {
        authService.requestPasswordReset(request.email());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/provider/{provider}")
    public ResponseEntity<ApiResponse<AuthResponse>> oauth(@PathVariable String provider, @Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.oauth(provider, request)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> me(Authentication authentication) {
        String userId = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(ApiResponse.success(authService.current(userId)));
    }
}
