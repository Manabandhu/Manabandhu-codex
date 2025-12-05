package com.manabandhu.user.service;

import com.manabandhu.common.api.PageResponse;
import com.manabandhu.common.exceptions.NotFoundException;
import com.manabandhu.common.utils.PaginationUtils;
import com.manabandhu.user.dto.UserProfileRequest;
import com.manabandhu.user.dto.UserProfileResponse;
import com.manabandhu.user.entity.UserProfile;
import com.manabandhu.user.mapper.UserProfileMapper;
import com.manabandhu.user.repository.UserProfileRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileServiceImpl(UserProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    public PageResponse<UserProfileResponse> list(int page, int size) {
        Page<UserProfile> pageResult = repository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
        Page<UserProfileResponse> mapped = pageResult.map(UserProfileMapper::toResponse);
        return PaginationUtils.from(mapped);
    }

    @Override
    public UserProfileResponse get(String id) {
        UserProfile entity = repository.findById(id).orElseThrow(() -> new NotFoundException("User profile not found"));
        return UserProfileMapper.toResponse(entity);
    }

    @Override
    public UserProfileResponse getForAccount(String userAccountId) {
        UserProfile entity = repository.findByUserAccountId(userAccountId)
                .orElseThrow(() -> new NotFoundException("User profile not found"));
        return UserProfileMapper.toResponse(entity);
    }

    @Override
    @Transactional
    public UserProfileResponse save(String id, UserProfileRequest request, String userAccountId) {
        UserProfile entity = id != null
                ? repository.findById(id).orElseThrow(() -> new NotFoundException("User profile not found"))
                : new UserProfile();

        if (userAccountId != null) {
            entity.setUserAccountId(userAccountId);
        }

        UserProfileMapper.apply(entity, request);
        UserProfile saved = repository.save(entity);
        return UserProfileMapper.toResponse(saved);
    }
}
