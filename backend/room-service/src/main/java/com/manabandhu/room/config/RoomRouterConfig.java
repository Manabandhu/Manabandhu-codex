package com.manabandhu.room.config;

import com.manabandhu.room.web.RoomHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class RoomRouterConfig {
    @Bean
    public RouterFunction<ServerResponse> roomRoutes(RoomHandler handler) {
        return RouterFunctions.route()
                .GET("/v1/rooms", handler::list)
                .POST("/v1/rooms", handler::create)
                .build();
    }
}
