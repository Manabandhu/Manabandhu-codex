package com.manabandhu.job.dto;

import jakarta.validation.constraints.NotBlank;

public record JobRequest(
        @NotBlank String title,
        String company,
        String location,
        String category,
        String description,
        boolean verified
) {}
