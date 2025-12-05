package com.manabandhu.search.service;

import com.manabandhu.search.dto.SearchResult;
import java.util.List;

public interface SearchService {
    List<SearchResult> search(String query);
}
