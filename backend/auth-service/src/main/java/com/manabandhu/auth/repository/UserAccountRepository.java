package com.manabandhu.auth.repository;

import com.manabandhu.auth.entity.UserAccount;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserAccountRepository extends CrudRepository<UserAccount, String> {
    Optional<UserAccount> findByEmail(String email);
}
