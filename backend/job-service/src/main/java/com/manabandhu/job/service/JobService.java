package com.manabandhu.job.service;

import com.manabandhu.job.dto.JobDto;
import com.manabandhu.job.entity.Job;
import com.manabandhu.job.repository.JobRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class JobService {

    private final JobRepository repository;

    public JobService(JobRepository repository) {
        this.repository = repository;
    }

    public Flux<JobDto> list() {
        return Flux.fromIterable(repository.findAll()).map(this::toDto);
    }

    public Mono<JobDto> save(JobDto dto) {
        Job entity = new Job();
        entity.setId(dto.id());
        entity.setTitle(dto.title());
        entity.setCompany(dto.company());
        entity.setLocation(dto.location());
        entity.setCategory(dto.category());
        entity.setDescription(dto.description());
        entity.setVerified(dto.verified());
        entity.setReported(dto.reported());
        return Mono.fromCallable(() -> repository.save(entity)).map(this::toDto);
    }

    public Mono<JobDto> report(String id) {
        return Mono.justOrEmpty(repository.findById(id))
                .map(job -> {
                    job.setReported(true);
                    return repository.save(job);
                })
                .map(this::toDto);
    }

    private JobDto toDto(Job entity) {
        return new JobDto(entity.getId(), entity.getTitle(), entity.getCompany(), entity.getLocation(), entity.getCategory(), entity.getDescription(), entity.isVerified(), entity.isReported());
    }
}
