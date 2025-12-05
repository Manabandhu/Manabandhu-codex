package com.manabandhu.ride.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.common.exceptions.NotFoundException;
import com.manabandhu.common.utils.PaginationUtils;
import com.manabandhu.ride.dto.RideRequest;
import com.manabandhu.ride.dto.RideResponse;
import com.manabandhu.ride.entity.Ride;
import com.manabandhu.ride.mapper.RideMapper;
import com.manabandhu.ride.repository.RideRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RideServiceImpl implements RideService {

    private final RideRepository repository;

    public RideServiceImpl(RideRepository repository) {
        this.repository = repository;
    }

    @Override
    public PageResponse<RideResponse> list(int page, int size) {
        Page<Ride> pageResult = repository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        Page<RideResponse> mapped = pageResult.map(RideMapper::toResponse);
        return PaginationUtils.from(mapped);
    }

    @Override
    public RideResponse get(String id) {
        Ride entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Ride not found"));
        return RideMapper.toResponse(entity);
    }

    @Override
    @Transactional
    public RideResponse save(String id, RideRequest request) {
        Ride entity = id != null
                ? repository.findById(id).orElseThrow(() -> new NotFoundException("Ride not found"))
                : new Ride();
        RideMapper.apply(entity, request);
        Ride saved = repository.save(entity);
        return RideMapper.toResponse(saved);
    }
}
