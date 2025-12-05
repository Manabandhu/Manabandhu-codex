package com.manabandhu.search.controller;

import com.manabandhu.common.api.ApiResponse;
import com.manabandhu.search.dto.SearchResult;
import com.manabandhu.search.service.SearchService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SearchResult>>> search(@RequestParam("q") String query) {
        return ResponseEntity.ok(ApiResponse.success(searchService.search(query)));
    }
}
