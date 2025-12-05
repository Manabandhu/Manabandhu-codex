package com.manabandhu.user.repository;

import com.manabandhu.user.entity.UserProfile;
import org.springframework.data.repository.CrudRepository;

public interface UserProfileRepository extends CrudRepository<UserProfile, String> {}
