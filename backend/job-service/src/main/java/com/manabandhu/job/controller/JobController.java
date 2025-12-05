package com.manabandhu.job.controller;

import com.manabandhu.job.dto.JobDto;
import com.manabandhu.job.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/v1/jobs")
public class JobController {

    private final JobService service;

    public JobController(JobService service) {
        this.service = service;
    }

    @GetMapping
    public Flux<JobDto> list() {
        return service.list();
    }

    @PostMapping
    public Mono<JobDto> create(@RequestBody JobDto dto) {
        return service.save(dto);
    }

    @PostMapping("/{id}/report")
    public Mono<ResponseEntity<JobDto>> report(@PathVariable String id) {
        return service.report(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
