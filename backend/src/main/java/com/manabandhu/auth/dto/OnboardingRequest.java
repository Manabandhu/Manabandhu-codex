package com.manabandhu.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.List;

public record OnboardingRequest(
    @NotBlank String country,
    String city,
    @NotEmpty List<String> purposes,
    String bio,
    LocalDate dateOfBirth,
    String gender
) {}
