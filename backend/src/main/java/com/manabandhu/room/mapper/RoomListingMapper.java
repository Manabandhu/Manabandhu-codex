package com.manabandhu.room.mapper;

import com.manabandhu.room.dto.RoomListingRequest;
import com.manabandhu.room.dto.RoomListingResponse;
import com.manabandhu.room.entity.RoomListing;

public final class RoomListingMapper {
    private RoomListingMapper() {}

    public static RoomListingResponse toResponse(RoomListing entity) {
        return new RoomListingResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getLocation(),
                entity.getPrice(),
                entity.getDescription(),
                entity.getAmenities(),
                entity.getCreatedAt()
        );
    }

    public static void apply(RoomListing entity, RoomListingRequest request) {
        entity.setTitle(request.title());
        entity.setLocation(request.location());
        entity.setPrice(request.price());
        entity.setDescription(request.description());
        entity.setAmenities(request.amenities());
    }
}
