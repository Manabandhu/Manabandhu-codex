package com.manabandhu.user.dto;

import java.time.OffsetDateTime;

public record UserProfileResponse(
        String id,
        String userAccountId,
        String email,
        String name,
        boolean verified,
        String avatarUrl,
        OffsetDateTime createdAt
) {}
