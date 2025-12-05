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
                .route("auth", r -> r.path("/v1/auth/**").uri("http://auth-service:3081"))
                .route("users", r -> r.path("/v1/users/**").uri("http://user-service:3082"))
                .route("rooms", r -> r.path("/v1/rooms/**").uri("http://room-service:3083"))
                .route("rides", r -> r.path("/v1/rides/**").uri("http://ride-service:3084"))
                .route("jobs", r -> r.path("/v1/jobs/**").uri("http://job-service:3085"))
                .route("chat", r -> r.path("/v1/chat/**").uri("http://chat-service:3086"))
                .build();
    }
}
