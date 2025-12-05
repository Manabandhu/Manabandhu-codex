package com.manabandhu.user.repository;

import com.manabandhu.user.entity.UserProfile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, String> {
    Optional<UserProfile> findByUserAccountId(String userAccountId);
}
