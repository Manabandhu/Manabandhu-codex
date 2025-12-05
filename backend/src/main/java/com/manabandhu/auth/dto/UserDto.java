package com.manabandhu.auth.dto;

import java.time.OffsetDateTime;

public record UserDto(String id, String email, String name, boolean verified, OffsetDateTime createdAt) {}
