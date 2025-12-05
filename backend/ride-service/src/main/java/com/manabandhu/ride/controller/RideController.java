package com.manabandhu.ride.controller;

import com.manabandhu.ride.dto.RideDto;
import com.manabandhu.ride.service.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/v1/rides")
public class RideController {

    private final RideService service;

    public RideController(RideService service) {
        this.service = service;
    }

    @GetMapping
    public Flux<RideDto> list() {
        return service.list();
    }

    @PostMapping
    public Mono<RideDto> create(@RequestBody RideDto dto) {
        return service.save(dto);
    }

    @PatchMapping("/{id}/status/{status}")
    public Mono<ResponseEntity<RideDto>> updateStatus(@PathVariable String id, @PathVariable String status) {
        return service.list()
                .filter(ride -> ride.id().equals(id))
                .next()
                .flatMap(existing -> service.save(new RideDto(id, existing.route(), existing.time(), existing.seats(), existing.notes(), status)))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
