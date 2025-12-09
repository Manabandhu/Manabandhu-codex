package com.manabandhu.auth.dto;

public record AuthResponse(
    String token,
    String refreshToken,
    UserDto user,
    Boolean requiresOnboarding
) {}
