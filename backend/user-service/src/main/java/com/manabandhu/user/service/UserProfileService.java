package com.manabandhu.user.service;

import com.manabandhu.user.dto.UserProfileDto;
import com.manabandhu.user.entity.UserProfile;
import com.manabandhu.user.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {
        this.repository = repository;
    }

    public Flux<UserProfileDto> list() {
        return Flux.fromIterable(repository.findAll()).map(this::toDto);
    }

    public Mono<UserProfileDto> get(String id) {
        return Mono.justOrEmpty(repository.findById(id).map(this::toDto));
    }

    public Mono<UserProfileDto> upsert(UserProfileDto dto) {
        UserProfile entity = new UserProfile();
        entity.setId(dto.id());
        entity.setEmail(dto.email());
        entity.setName(dto.name());
        entity.setVerified(dto.verified());
        entity.setAvatarUrl(dto.avatarUrl());
        return Mono.fromCallable(() -> repository.save(entity)).map(this::toDto);
    }

    private UserProfileDto toDto(UserProfile entity) {
        return new UserProfileDto(entity.getId(), entity.getEmail(), entity.getName(), entity.isVerified(), entity.getAvatarUrl());
    }
}
