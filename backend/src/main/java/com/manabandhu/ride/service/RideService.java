package com.manabandhu.ride.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.ride.dto.RideRequest;
import com.manabandhu.ride.dto.RideResponse;

public interface RideService {
    PageResponse<RideResponse> list(int page, int size);
    RideResponse get(String id);
    RideResponse save(String id, RideRequest request);
}
