package com.manabandhu.auth.service;

import com.manabandhu.auth.dto.*;

public interface AuthService {
    AuthResponse authenticate(AuthRequest request);
    AuthResponse signup(SignupRequest request);
    AuthResponse oauth(String provider, AuthRequest request);
    void completeOnboarding(String userId, OnboardingRequest request);
    void requestPasswordReset(String email);
    UserDto current(String userId);
}
