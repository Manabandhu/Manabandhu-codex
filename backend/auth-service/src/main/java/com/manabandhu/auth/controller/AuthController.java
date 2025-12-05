package com.manabandhu.auth.controller;

import com.manabandhu.auth.dto.AuthRequest;
import com.manabandhu.auth.dto.AuthResponse;
import com.manabandhu.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/provider/{provider}")
    public ResponseEntity<AuthResponse> oauth(@PathVariable String provider, @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.oauth(provider, request));
    }
}
