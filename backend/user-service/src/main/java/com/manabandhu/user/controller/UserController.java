package com.manabandhu.user.controller;

import com.manabandhu.user.dto.UserProfileDto;
import com.manabandhu.user.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/v1/users")
public class UserController {

    private final UserProfileService service;

    public UserController(UserProfileService service) {
        this.service = service;
    }

    @GetMapping
    public Flux<UserProfileDto> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<UserProfileDto>> get(@PathVariable String id) {
        return service.get(id).map(ResponseEntity::ok).defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<UserProfileDto> upsert(@RequestBody UserProfileDto dto) {
        return service.upsert(dto);
    }
}
