package com.manabandhu.auth.service;

import com.manabandhu.auth.dto.AuthRequest;
import com.manabandhu.auth.dto.AuthResponse;
import com.manabandhu.auth.dto.UserDto;
import com.manabandhu.auth.entity.UserAccount;
import com.manabandhu.auth.mapper.AuthMapper;
import com.manabandhu.auth.repository.UserAccountRepository;
import com.manabandhu.common.exceptions.NotFoundException;
import com.manabandhu.common.exceptions.UnauthorizedException;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserAccountRepository userAccountRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserAccountRepository userAccountRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public AuthResponse authenticate(AuthRequest request) {
        UserAccount account = userAccountRepository
                .findByEmail(request.email())
                .orElseGet(() -> createUser(request));

        if (request.password() != null) {
            if (account.getPassword() == null) {
                account.setPassword(passwordEncoder.encode(request.password()));
                account = userAccountRepository.save(account);
            } else if (!passwordEncoder.matches(request.password(), account.getPassword())) {
                throw new UnauthorizedException("Invalid credentials");
            }
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

    private AuthResponse buildResponse(UserAccount account) {
        String token = jwtService.generate(account.getId());
        return new AuthResponse(token, AuthMapper.toDto(account));
    }
}
