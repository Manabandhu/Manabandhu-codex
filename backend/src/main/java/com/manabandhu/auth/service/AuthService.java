package com.manabandhu.auth.service;

import com.manabandhu.auth.dto.AuthRequest;
import com.manabandhu.auth.dto.AuthResponse;
import com.manabandhu.auth.dto.UserDto;

public interface AuthService {
    AuthResponse authenticate(AuthRequest request);
    AuthResponse oauth(String provider, AuthRequest request);
    UserDto current(String userId);
}
