package com.manabandhu.auth.service;

import com.manabandhu.auth.dto.*;
import com.manabandhu.auth.entity.UserAccount;
import com.manabandhu.auth.mapper.AuthMapper;
import com.manabandhu.auth.repository.UserAccountRepository;
import com.manabandhu.common.exceptions.*;
import com.manabandhu.user.entity.UserProfile;
import com.manabandhu.user.repository.UserProfileRepository;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserAccountRepository userAccountRepository;
    private final UserProfileRepository userProfileRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserAccountRepository userAccountRepository, UserProfileRepository userProfileRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.userProfileRepository = userProfileRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public AuthResponse authenticate(AuthRequest request) {
        UserAccount account = userAccountRepository
                .findByEmail(request.email())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!account.isActive()) {
            throw new UnauthorizedException("Account is deactivated");
        }

        if (!passwordEncoder.matches(request.password(), account.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return buildResponse(account);
    }

    @Override
    @Transactional
    public AuthResponse oauth(String provider, AuthRequest request) {
        UserAccount account = userAccountRepository
                .findByEmail(request.email())
                .orElseGet(() -> createUser(request));
        account.setVerified(true);
        return buildResponse(account);
    }

    @Override
    public UserDto current(String userId) {
        if (userId == null) {
            throw new UnauthorizedException("Missing authentication context");
        }
        UserAccount account = userAccountRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        return AuthMapper.toDto(account);
    }

    private UserAccount createUser(AuthRequest request) {
        UserAccount account = new UserAccount();
        account.setEmail(request.email());
        account.setName(request.name() != null ? request.name() : request.email().split("@")[0]);
        account.setVerified(false);
        String rawPassword = request.password() != null ? request.password() : UUID.randomUUID().toString();
        account.setPassword(passwordEncoder.encode(rawPassword));
        return userAccountRepository.save(account);
    }

    @Override
    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userAccountRepository.findByEmail(request.email()).isPresent()) {
            throw new BadRequestException("Email already registered");
        }

        UserAccount account = new UserAccount();
        account.setEmail(request.email());
        account.setName(request.fullName());
        account.setPhone(request.phone());
        account.setPassword(passwordEncoder.encode(request.password()));
        account.setAuthProvider("email");
        account = userAccountRepository.save(account);

        UserProfile profile = new UserProfile();
        profile.setUserAccountId(account.getId());
        profile.setEmail(account.getEmail());
        profile.setName(account.getName());
        userProfileRepository.save(profile);

        return buildResponse(account);
    }

    @Override
    @Transactional
    public void completeOnboarding(String userId, OnboardingRequest request) {
        UserProfile profile = userProfileRepository.findByUserAccountId(userId)
                .orElseThrow(() -> new NotFoundException("Profile not found"));

        profile.setCountry(request.country());
        profile.setCity(request.city());
        profile.setPurposes(String.join(",", request.purposes()));
        profile.setBio(request.bio());
        profile.setDateOfBirth(request.dateOfBirth());
        profile.setGender(request.gender());
        profile.setOnboardingCompleted(true);
        userProfileRepository.save(profile);
    }

    @Override
    public void requestPasswordReset(String email) {
        userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
        // TODO: Generate token and send email
    }

    private AuthResponse buildResponse(UserAccount account) {
        String token = jwtService.generate(account.getId());
        String refreshToken = jwtService.generateRefresh(account.getId());
        boolean requiresOnboarding = userProfileRepository.findByUserAccountId(account.getId())
                .map(p -> !p.isOnboardingCompleted())
                .orElse(true);
        return new AuthResponse(token, refreshToken, AuthMapper.toDto(account), requiresOnboarding);
    }
}
