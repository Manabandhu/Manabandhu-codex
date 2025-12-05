package com.manabandhu.user.mapper;

import com.manabandhu.user.dto.UserProfileRequest;
import com.manabandhu.user.dto.UserProfileResponse;
import com.manabandhu.user.entity.UserProfile;

public final class UserProfileMapper {
    private UserProfileMapper() {}

    public static UserProfileResponse toResponse(UserProfile entity) {
        return new UserProfileResponse(
                entity.getId(),
                entity.getUserAccountId(),
                entity.getEmail(),
                entity.getName(),
                entity.isVerified(),
                entity.getAvatarUrl(),
                entity.getCreatedAt()
        );
    }

    public static void apply(UserProfile entity, UserProfileRequest request) {
        entity.setEmail(request.email());
        entity.setName(request.name());
        entity.setAvatarUrl(request.avatarUrl());
        entity.setVerified(request.verified());
    }
}
