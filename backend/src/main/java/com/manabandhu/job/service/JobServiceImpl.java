package com.manabandhu.job.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.common.exceptions.NotFoundException;
import com.manabandhu.common.utils.PaginationUtils;
import com.manabandhu.job.dto.JobRequest;
import com.manabandhu.job.dto.JobResponse;
import com.manabandhu.job.entity.Job;
import com.manabandhu.job.mapper.JobMapper;
import com.manabandhu.job.repository.JobRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository repository;

    public JobServiceImpl(JobRepository repository) {
        this.repository = repository;
    }

    @Override
    public PageResponse<JobResponse> list(int page, int size) {
        Page<Job> pageResult = repository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        Page<JobResponse> mapped = pageResult.map(JobMapper::toResponse);
        return PaginationUtils.from(mapped);
    }

    @Override
    public JobResponse get(String id) {
        Job entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Job not found"));
        return JobMapper.toResponse(entity);
    }

    @Override
    @Transactional
    public JobResponse save(String id, JobRequest request) {
        Job entity = id != null
                ? repository.findById(id).orElseThrow(() -> new NotFoundException("Job not found"))
                : new Job();
        JobMapper.apply(entity, request);
        Job saved = repository.save(entity);
        return JobMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public JobResponse report(String id) {
        Job entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Job not found"));
        entity.setReported(true);
        return JobMapper.toResponse(repository.save(entity));
    }
}
