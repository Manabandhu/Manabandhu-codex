package com.manabandhu.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth", r -> r.path("/v1/auth/**").uri("http://auth-service:8081"))
                .route("users", r -> r.path("/v1/users/**").uri("http://user-service:8082"))
                .route("rooms", r -> r.path("/v1/rooms/**").uri("http://room-service:8083"))
                .route("rides", r -> r.path("/v1/rides/**").uri("http://ride-service:8084"))
                .route("jobs", r -> r.path("/v1/jobs/**").uri("http://job-service:8085"))
                .route("chat", r -> r.path("/v1/chat/**").uri("http://chat-service:8086"))
                .build();
    }
}
