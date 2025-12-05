package com.manabandhu.room.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "${USER_SERVICE_URL:http://user-service:3082}")
public interface UserClient {
    @GetMapping("/v1/users/{id}")
    String getUser(@PathVariable("id") String id);
}
