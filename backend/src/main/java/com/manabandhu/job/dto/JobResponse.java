package com.manabandhu.job.dto;

import java.time.OffsetDateTime;

public record JobResponse(
        String id,
        String title,
        String company,
        String location,
        String category,
        String description,
        boolean verified,
        boolean reported,
        OffsetDateTime createdAt
) {}
