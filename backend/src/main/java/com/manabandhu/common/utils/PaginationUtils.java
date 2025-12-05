package com.manabandhu.common.utils;

import com.manabandhu.common.api.PageResponse;
import org.springframework.data.domain.Page;

public final class PaginationUtils {
    private PaginationUtils() {}

    public static <T> PageResponse<T> from(Page<T> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getSize()
        );
    }
}
