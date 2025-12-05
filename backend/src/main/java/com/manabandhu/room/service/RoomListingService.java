package com.manabandhu.room.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.room.dto.RoomListingRequest;
import com.manabandhu.room.dto.RoomListingResponse;

public interface RoomListingService {
    PageResponse<RoomListingResponse> list(int page, int size);
    RoomListingResponse get(String id);
    RoomListingResponse save(String id, RoomListingRequest request);
}
