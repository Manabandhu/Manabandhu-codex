package com.manabandhu.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
    @NotBlank @Size(min = 2) String fullName,
    @NotBlank @Email String email,
    String phone,
    @NotBlank @Size(min = 8) String password
) {}
