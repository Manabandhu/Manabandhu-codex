package com.manabandhu.job.repository;

import com.manabandhu.job.entity.Job;
import org.springframework.data.repository.CrudRepository;

public interface JobRepository extends CrudRepository<Job, String> {}
