# Backend Implementation Guide: Auth & Onboarding

## Overview
Complete backend implementation for authentication and user onboarding flows.

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    profile_picture_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    auth_provider VARCHAR(50) DEFAULT 'email', -- email, google, facebook, apple, phone
    provider_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_provider ON users(auth_provider, provider_id);
```

### 2. User Profiles Table
```sql
CREATE TABLE user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    country VARCHAR(100),
    city VARCHAR(100),
    purposes TEXT[], -- ['student', 'professional', 'family', 'tourist']
    bio TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

### 3. Refresh Tokens Table
```sql
CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_refresh_tokens_user_id ON user_profiles(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
```

### 4. Password Reset Tokens Table
```sql
CREATE TABLE password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
```

### 5. Email Verification Tokens Table
```sql
CREATE TABLE email_verification_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email_verification_tokens_token ON email_verification_tokens(token);
```

## Spring Boot Implementation

### 1. Entity Classes

#### User.java
```java
package com.manabandhu.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true)
    private String phone;

    private String passwordHash;

    @Column(nullable = false)
    private String fullName;

    private String profilePictureUrl;

    @Builder.Default
    private Boolean isVerified = false;

    @Builder.Default
    private Boolean isActive = true;

    @Builder.Default
    private String authProvider = "email";

    private String providerId;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    private LocalDateTime lastLoginAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile profile;
}
```

#### UserProfile.java
```java
package com.manabandhu.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    private String country;
    private String city;

    @ElementCollection
    @CollectionTable(name = "user_purposes", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "purpose")
    private List<String> purposes;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private LocalDate dateOfBirth;
    private String gender;

    @Builder.Default
    private Boolean onboardingCompleted = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
```

### 2. DTOs

#### AuthRequest.java
```java
package com.manabandhu.auth.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6)
    private String password;
}

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 2)
    private String fullName;

    @NotBlank
    @Email
    private String email;

    @Pattern(regexp = "^\\+?[1-9]\\d{9,14}$")
    private String phone;

    @NotBlank
    @Size(min = 8)
    private String password;
}

@Data
public class SocialAuthRequest {
    @NotBlank
    private String provider; // google, facebook, apple

    @NotBlank
    private String idToken;
}
```

#### AuthResponse.java
```java
package com.manabandhu.auth.dto;

import lombok.*;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String refreshToken;
    private UserDto user;
    private Boolean requiresOnboarding;
}

@Data
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String phone;
    private String fullName;
    private String profilePictureUrl;
    private Boolean isVerified;
    private String authProvider;
}
```

#### OnboardingRequest.java
```java
package com.manabandhu.auth.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class OnboardingRequest {
    @NotBlank
    private String country;

    private String city;

    @NotEmpty
    private List<String> purposes;

    private String bio;
    private LocalDate dateOfBirth;
    private String gender;
}
```

### 3. Repository Interfaces

```java
package com.manabandhu.auth.repository;

import com.manabandhu.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    Optional<User> findByAuthProviderAndProviderId(String provider, String providerId);
    Boolean existsByEmail(String email);
    Boolean existsByPhone(String phone);
}

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserId(Long userId);
}

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUserId(Long userId);
}

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}
```

### 4. Service Layer

#### AuthService.java
```java
package com.manabandhu.auth.service;

import com.manabandhu.auth.dto.*;
import com.manabandhu.auth.entity.*;
import com.manabandhu.auth.repository.*;
import com.manabandhu.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserProfileRepository profileRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    @Transactional
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
            .email(request.getEmail())
            .phone(request.getPhone())
            .fullName(request.getFullName())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .authProvider("email")
            .build();

        user = userRepository.save(user);

        // Create empty profile
        UserProfile profile = UserProfile.builder()
            .user(user)
            .build();
        profileRepository.save(profile);

        // Send verification email
        emailService.sendVerificationEmail(user);

        String token = jwtUtil.generateToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return AuthResponse.builder()
            .token(token)
            .refreshToken(refreshToken)
            .user(mapToUserDto(user))
            .requiresOnboarding(true)
            .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!user.getIsActive()) {
            throw new RuntimeException("Account is deactivated");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtUtil.generateToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        UserProfile profile = profileRepository.findByUserId(user.getId()).orElse(null);
        boolean requiresOnboarding = profile == null || !profile.getOnboardingCompleted();

        return AuthResponse.builder()
            .token(token)
            .refreshToken(refreshToken)
            .user(mapToUserDto(user))
            .requiresOnboarding(requiresOnboarding)
            .build();
    }

    @Transactional
    public void completeOnboarding(Long userId, OnboardingRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = profileRepository.findByUserId(userId)
            .orElse(UserProfile.builder().user(user).build());

        profile.setCountry(request.getCountry());
        profile.setCity(request.getCity());
        profile.setPurposes(request.getPurposes());
        profile.setBio(request.getBio());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setGender(request.getGender());
        profile.setOnboardingCompleted(true);
        profile.setUpdatedAt(LocalDateTime.now());

        profileRepository.save(profile);
    }

    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generatePasswordResetToken();
        // Save token to database with expiry
        emailService.sendPasswordResetEmail(user, token);
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
            .id(user.getId())
            .email(user.getEmail())
            .phone(user.getPhone())
            .fullName(user.getFullName())
            .profilePictureUrl(user.getProfilePictureUrl())
            .isVerified(user.getIsVerified())
            .authProvider(user.getAuthProvider())
            .build();
    }
}
```

### 5. Controller

#### AuthController.java
```java
package com.manabandhu.auth.controller;

import com.manabandhu.auth.dto.*;
import com.manabandhu.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/social")
    public ResponseEntity<AuthResponse> socialAuth(@Valid @RequestBody SocialAuthRequest request) {
        return ResponseEntity.ok(authService.socialAuth(request));
    }

    @PostMapping("/onboarding")
    public ResponseEntity<Void> completeOnboarding(
        @AuthenticationPrincipal Long userId,
        @Valid @RequestBody OnboardingRequest request
    ) {
        authService.completeOnboarding(userId, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password-reset/request")
    public ResponseEntity<Void> requestPasswordReset(@RequestBody Map<String, String> body) {
        authService.requestPasswordReset(body.get("email"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password-reset/confirm")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(authService.getUserById(userId));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(authService.refreshToken(body.get("refreshToken")));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@AuthenticationPrincipal Long userId) {
        authService.logout(userId);
        return ResponseEntity.ok().build();
    }
}
```

### 6. Security Configuration

#### JwtUtil.java
```java
package com.manabandhu.auth.security;

import com.manabandhu.auth.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration:86400000}") // 24 hours
    private Long expiration;

    @Value("${jwt.refresh-expiration:604800000}") // 7 days
    private Long refreshExpiration;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(User user) {
        return Jwts.builder()
            .setSubject(user.getId().toString())
            .claim("email", user.getEmail())
            .claim("name", user.getFullName())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts.builder()
            .setSubject(user.getId().toString())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + refreshExpiration))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

#### SecurityConfig.java
```java
package com.manabandhu.auth.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/signup", "/api/v1/auth/login", 
                                "/api/v1/auth/social", "/api/v1/auth/password-reset/**",
                                "/api/v1/health").permitAll()
                .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login with email/password
- `POST /api/v1/auth/social` - Social auth (Google, Facebook, Apple)
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

### Onboarding
- `POST /api/v1/auth/onboarding` - Complete user onboarding

### Password Reset
- `POST /api/v1/auth/password-reset/request` - Request password reset
- `POST /api/v1/auth/password-reset/confirm` - Confirm password reset

## Environment Variables

```properties
# JWT Configuration
jwt.secret=your-256-bit-secret-key-here-change-in-production
jwt.expiration=86400000
jwt.refresh-expiration=604800000

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/manabandhu
spring.datasource.username=postgres
spring.datasource.password=password

# Email (for verification & password reset)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# OAuth Providers
oauth.google.client-id=your-google-client-id
oauth.facebook.app-id=your-facebook-app-id
oauth.apple.client-id=your-apple-client-id
```

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:3080/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "SecurePass123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:3080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Complete Onboarding
```bash
curl -X POST http://localhost:3080/api/v1/auth/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "country": "United States",
    "city": "New York",
    "purposes": ["student", "professional"],
    "bio": "Software engineer from India",
    "dateOfBirth": "1995-05-15",
    "gender": "male"
  }'
```

## Next Steps
1. Implement email verification flow
2. Add OAuth integration (Google, Facebook, Apple)
3. Implement phone number verification with OTP
4. Add rate limiting for auth endpoints
5. Set up Redis for token blacklisting
6. Add audit logging for security events
