package com.manabandhu.health;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {
    
    @GetMapping("/doctors")
    public List<Map<String, Object>> searchDoctors(@RequestParam(required = false) String specialty) {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "name", "Dr. Smith", "specialty", "General"));
    }
    
    @PostMapping("/appointments")
    public Map<String, Object> bookAppointment(@RequestBody Map<String, Object> appointment) {
        appointment.put("id", UUID.randomUUID().toString());
        appointment.put("status", "scheduled");
        return appointment;
    }
    
    @GetMapping("/fitness/challenges")
    public List<Map<String, Object>> getChallenges() {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "title", "30-Day Walk", "participants", 120));
    }
    
    @GetMapping("/diet/plan")
    public Map<String, Object> getDietPlan(@RequestParam String userId) {
        return Map.of("userId", userId, "targetCalories", 2000, "meals", List.of());
    }
}
