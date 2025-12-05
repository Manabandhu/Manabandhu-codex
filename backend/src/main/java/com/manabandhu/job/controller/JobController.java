package com.manabandhu.job.controller;

import com.manabandhu.common.api.ApiResponse;
import com.manabandhu.common.api.PageResponse;
import com.manabandhu.job.dto.JobRequest;
import com.manabandhu.job.dto.JobResponse;
import com.manabandhu.job.service.JobService;
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
@RequestMapping("/api/v1/jobs")
public class JobController {

    private final JobService service;

    public JobController(JobService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<JobResponse>>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(service.list(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> get(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(service.get(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<JobResponse>> create(@Valid @RequestBody JobRequest request) {
        return ResponseEntity.ok(ApiResponse.success(service.save(null, request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> update(@PathVariable String id, @Valid @RequestBody JobRequest request) {
        return ResponseEntity.ok(ApiResponse.success(service.save(id, request)));
    }

    @PostMapping("/{id}/report")
    public ResponseEntity<ApiResponse<JobResponse>> report(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(service.report(id)));
    }
}
