package com.manabandhu.auth.service;

import com.manabandhu.auth.dto.AuthRequest;
import com.manabandhu.auth.dto.AuthResponse;
import com.manabandhu.auth.dto.UserDto;
import com.manabandhu.auth.entity.UserAccount;
import com.manabandhu.auth.repository.UserAccountRepository;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final JwtService jwtService;
    private final PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    public AuthService(UserAccountRepository userAccountRepository, JwtService jwtService) {
        this.userAccountRepository = userAccountRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse authenticate(AuthRequest request) {
        UserAccount account = userAccountRepository
                .findByEmail(request.email())
                .orElseGet(() -> createUser(request.email()));

        if (request.password() != null && account.getPassword() != null) {
            encoder.matches(request.password(), account.getPassword());
        }

        return buildResponse(account);
    }

    public AuthResponse oauth(String provider, AuthRequest request) {
        UserAccount account = userAccountRepository
                .findByEmail(request.email())
                .orElseGet(() -> createUser(request.email()));
        return buildResponse(account);
    }

    private UserAccount createUser(String email) {
        UserAccount account = new UserAccount();
        account.setEmail(email);
        account.setPassword(encoder.encode(UUID.randomUUID().toString()));
        account.setVerified(false);
        account.setName(email.split("@")[0]);
        return userAccountRepository.save(account);
    }

    private AuthResponse buildResponse(UserAccount account) {
        String token = jwtService.generate(account.getId());
        UserDto userDto = new UserDto(account.getId(), account.getEmail(), account.getName(), account.isVerified());
        return new AuthResponse(token, userDto);
    }
}
