package com.manabandhu.ride.service;

import com.manabandhu.ride.dto.RideDto;
import com.manabandhu.ride.entity.Ride;
import com.manabandhu.ride.repository.RideRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class RideService {

    private final RideRepository repository;

    public RideService(RideRepository repository) {
        this.repository = repository;
    }

    public Flux<RideDto> list() {
        return Flux.fromIterable(repository.findAll()).map(this::toDto);
    }

    public Mono<RideDto> save(RideDto dto) {
        Ride entity = new Ride();
        entity.setId(dto.id());
        entity.setRoute(dto.route());
        entity.setTime(dto.time());
        entity.setSeats(dto.seats());
        entity.setNotes(dto.notes());
        entity.setStatus(dto.status());
        return Mono.fromCallable(() -> repository.save(entity)).map(this::toDto);
    }

    private RideDto toDto(Ride entity) {
        return new RideDto(entity.getId(), entity.getRoute(), entity.getTime(), entity.getSeats(), entity.getNotes(), entity.getStatus());
    }
}
