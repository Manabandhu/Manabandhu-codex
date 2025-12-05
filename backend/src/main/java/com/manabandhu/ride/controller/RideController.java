package com.manabandhu.ride.controller;

import com.manabandhu.common.api.ApiResponse;
import com.manabandhu.common.api.PageResponse;
import com.manabandhu.ride.dto.RideRequest;
import com.manabandhu.ride.dto.RideResponse;
import com.manabandhu.ride.service.RideService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rides")
public class RideController {

    private final RideService service;

    public RideController(RideService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<RideResponse>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(service.list(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RideResponse>> get(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(service.get(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RideResponse>> create(@Valid @RequestBody RideRequest request) {
        return ResponseEntity.ok(ApiResponse.success(service.save(null, request)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<RideResponse>> updateStatus(@PathVariable String id, @RequestParam String status) {
        RideRequest update = new RideRequest(null, null, null, null, status);
        return ResponseEntity.ok(ApiResponse.success(service.save(id, update)));
    }
}
