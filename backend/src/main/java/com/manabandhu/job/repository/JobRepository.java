package com.manabandhu.job.repository;

import com.manabandhu.job.entity.Job;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(String title, String category);
}
