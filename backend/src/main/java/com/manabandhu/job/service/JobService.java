package com.manabandhu.job.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.job.dto.JobRequest;
import com.manabandhu.job.dto.JobResponse;

public interface JobService {
    PageResponse<JobResponse> list(int page, int size);
    JobResponse get(String id);
    JobResponse save(String id, JobRequest request);
    JobResponse report(String id);
}
