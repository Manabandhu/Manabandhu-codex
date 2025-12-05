package com.manabandhu.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
        @Email @NotBlank String email,
        String password,
        String name
) {}
