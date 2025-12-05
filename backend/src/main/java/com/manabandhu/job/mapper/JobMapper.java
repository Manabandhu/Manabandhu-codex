package com.manabandhu.job.mapper;

import com.manabandhu.job.dto.JobRequest;
import com.manabandhu.job.dto.JobResponse;
import com.manabandhu.job.entity.Job;

public final class JobMapper {
    private JobMapper() {}

    public static JobResponse toResponse(Job entity) {
        return new JobResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getCompany(),
                entity.getLocation(),
                entity.getCategory(),
                entity.getDescription(),
                entity.isVerified(),
                entity.isReported(),
                entity.getCreatedAt()
        );
    }

    public static void apply(Job entity, JobRequest request) {
        if (request.title() != null) {
            entity.setTitle(request.title());
        }
        if (request.company() != null) {
            entity.setCompany(request.company());
        }
        if (request.location() != null) {
            entity.setLocation(request.location());
        }
        if (request.category() != null) {
            entity.setCategory(request.category());
        }
        if (request.description() != null) {
            entity.setDescription(request.description());
        }
        entity.setVerified(request.verified());
    }
}
