package com.manabandhu.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserProfileRequest(
        @Email @NotBlank String email,
        @NotBlank String name,
        String avatarUrl,
        boolean verified
) {}
