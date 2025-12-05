package com.manabandhu.room.web;

import com.manabandhu.room.dto.RoomListingDto;
import com.manabandhu.room.service.RoomListingService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class RoomHandler {

    private final RoomListingService service;

    public RoomHandler(RoomListingService service) {
        this.service = service;
    }

    public Mono<ServerResponse> list(ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(service.findAll(), RoomListingDto.class);
    }

    public Mono<ServerResponse> create(ServerRequest request) {
        return request.bodyToMono(RoomListingDto.class)
                .flatMap(service::save)
                .flatMap(dto -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(dto));
    }
}
