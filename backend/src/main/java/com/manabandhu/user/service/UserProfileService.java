package com.manabandhu.user.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.user.dto.UserProfileRequest;
import com.manabandhu.user.dto.UserProfileResponse;

public interface UserProfileService {
    PageResponse<UserProfileResponse> list(int page, int size);
    UserProfileResponse get(String id);
    UserProfileResponse getForAccount(String userAccountId);
    UserProfileResponse save(String id, UserProfileRequest request, String userAccountId);
}
