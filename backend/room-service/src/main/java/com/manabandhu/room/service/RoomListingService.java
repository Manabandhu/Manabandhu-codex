package com.manabandhu.room.service;

import com.manabandhu.room.dto.RoomListingDto;
import com.manabandhu.room.entity.RoomListing;
import com.manabandhu.room.repository.RoomListingRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class RoomListingService {

    private final RoomListingRepository repository;

    public RoomListingService(RoomListingRepository repository) {
        this.repository = repository;
    }

    public Flux<RoomListingDto> findAll() {
        return Flux.fromIterable(repository.findAll()).map(this::toDto);
    }

    public Mono<RoomListingDto> save(RoomListingDto dto) {
        RoomListing entity = new RoomListing();
        entity.setId(dto.id());
        entity.setTitle(dto.title());
        entity.setLocation(dto.location());
        entity.setPrice(dto.price());
        entity.setAmenities(dto.amenities());
        entity.setDescription(dto.description());
        return Mono.fromCallable(() -> repository.save(entity)).map(this::toDto);
    }

    private RoomListingDto toDto(RoomListing entity) {
        return new RoomListingDto(entity.getId(), entity.getTitle(), entity.getLocation(), entity.getPrice(), entity.getAmenities(), entity.getDescription());
    }
}
