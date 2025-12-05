package com.manabandhu.search.service;

import com.manabandhu.job.repository.JobRepository;
import com.manabandhu.room.repository.RoomListingRepository;
import com.manabandhu.search.dto.SearchResult;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class SearchServiceImpl implements SearchService {

    private final RoomListingRepository roomListingRepository;
    private final JobRepository jobRepository;

    public SearchServiceImpl(RoomListingRepository roomListingRepository, JobRepository jobRepository) {
        this.roomListingRepository = roomListingRepository;
        this.jobRepository = jobRepository;
    }

    @Override
    public List<SearchResult> search(String query) {
        if (!StringUtils.hasText(query)) {
            return List.of();
        }

        List<SearchResult> results = new ArrayList<>();
        roomListingRepository.findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(query, query)
                .forEach(room -> results.add(new SearchResult("room", room.getId(), room.getTitle(), room.getDescription())));

        jobRepository.findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query)
                .forEach(job -> results.add(new SearchResult("job", job.getId(), job.getTitle(), job.getDescription())));
        return results;
    }
}
