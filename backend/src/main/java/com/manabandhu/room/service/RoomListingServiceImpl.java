package com.manabandhu.room.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.common.exceptions.NotFoundException;
import com.manabandhu.common.utils.PaginationUtils;
import com.manabandhu.room.dto.RoomListingRequest;
import com.manabandhu.room.dto.RoomListingResponse;
import com.manabandhu.room.entity.RoomListing;
import com.manabandhu.room.mapper.RoomListingMapper;
import com.manabandhu.room.repository.RoomListingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoomListingServiceImpl implements RoomListingService {

    private final RoomListingRepository repository;

    public RoomListingServiceImpl(RoomListingRepository repository) {
        this.repository = repository;
    }

    @Override
    public PageResponse<RoomListingResponse> list(int page, int size) {
        Page<RoomListing> pageResult = repository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        Page<RoomListingResponse> mapped = pageResult.map(RoomListingMapper::toResponse);
        return PaginationUtils.from(mapped);
    }

    @Override
    public RoomListingResponse get(String id) {
        RoomListing entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Room listing not found"));
        return RoomListingMapper.toResponse(entity);
    }

    @Override
    @Transactional
    public RoomListingResponse save(String id, RoomListingRequest request) {
        RoomListing entity = id != null
                ? repository.findById(id).orElseThrow(() -> new NotFoundException("Room listing not found"))
                : new RoomListing();
        RoomListingMapper.apply(entity, request);
        RoomListing saved = repository.save(entity);
        return RoomListingMapper.toResponse(saved);
    }
}
