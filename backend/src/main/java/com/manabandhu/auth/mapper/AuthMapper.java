package com.manabandhu.auth.mapper;

import com.manabandhu.auth.dto.UserDto;
import com.manabandhu.auth.entity.UserAccount;

public final class AuthMapper {
    private AuthMapper() {}

    public static UserDto toDto(UserAccount account) {
        return new UserDto(account.getId(), account.getEmail(), account.getName(), account.isVerified(), account.getCreatedAt());
    }
}
