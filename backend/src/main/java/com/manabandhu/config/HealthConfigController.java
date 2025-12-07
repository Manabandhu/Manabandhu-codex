package com.manabandhu.config;

import com.manabandhu.common.api.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("healthConfigController")
@RequestMapping("/api/v1/health")
public class HealthConfigController {

    @GetMapping
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(ApiResponse.success("ok", "healthy"));
    }
}
