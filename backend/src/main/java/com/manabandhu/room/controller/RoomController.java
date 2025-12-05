package com.manabandhu.room.controller;

import com.manabandhu.common.api.ApiResponse;
import com.manabandhu.common.api.PageResponse;
import com.manabandhu.room.dto.RoomListingRequest;
import com.manabandhu.room.dto.RoomListingResponse;
import com.manabandhu.room.service.RoomListingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

    private final RoomListingService service;

    public RoomController(RoomListingService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<RoomListingResponse>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(service.list(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomListingResponse>> get(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(service.get(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoomListingResponse>> create(@Valid @RequestBody RoomListingRequest request) {
        return ResponseEntity.ok(ApiResponse.success(service.save(null, request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomListingResponse>> update(@PathVariable String id, @Valid @RequestBody RoomListingRequest request) {
        return ResponseEntity.ok(ApiResponse.success(service.save(id, request)));
    }
}
