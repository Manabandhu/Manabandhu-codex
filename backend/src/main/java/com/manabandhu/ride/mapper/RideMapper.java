package com.manabandhu.ride.mapper;

import com.manabandhu.ride.dto.RideRequest;
import com.manabandhu.ride.dto.RideResponse;
import com.manabandhu.ride.entity.Ride;

public final class RideMapper {
    private RideMapper() {}

    public static RideResponse toResponse(Ride entity) {
        return new RideResponse(
                entity.getId(),
                entity.getRoute(),
                entity.getTime(),
                entity.getSeats(),
                entity.getNotes(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }

    public static void apply(Ride entity, RideRequest request) {
        if (request.route() != null) {
            entity.setRoute(request.route());
        }
        if (request.time() != null) {
            entity.setTime(request.time());
        }
        if (request.seats() != null) {
            entity.setSeats(request.seats());
        }
        if (request.notes() != null) {
            entity.setNotes(request.notes());
        }
        if (request.status() != null) {
            entity.setStatus(request.status());
        }
    }
}
