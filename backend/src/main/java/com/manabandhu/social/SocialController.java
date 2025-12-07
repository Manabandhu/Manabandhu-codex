package com.manabandhu.social;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/social")
public class SocialController {
    
    @GetMapping("/groups")
    public List<Map<String, Object>> getGroups() {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "name", "Desi Food Lovers", "members", 250));
    }
    
    @PostMapping("/posts")
    public Map<String, Object> createPost(@RequestBody Map<String, Object> post) {
        post.put("id", UUID.randomUUID().toString());
        return post;
    }
    
    @GetMapping("/festivals")
    public List<Map<String, Object>> getFestivals() {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "name", "Diwali", "date", "2024-11-01"));
    }
    
    @GetMapping("/food-delivery")
    public List<Map<String, Object>> getDesiFood(@RequestParam String location) {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "restaurant", "Curry House", "cuisine", "Indian"));
    }
    
    @GetMapping("/matrimony")
    public List<Map<String, Object>> getMatrimonyProfiles(@RequestParam(required = false) String filters) {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "name", "Profile 1", "age", 28));
    }
}
