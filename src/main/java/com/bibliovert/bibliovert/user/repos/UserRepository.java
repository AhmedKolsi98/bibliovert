package com.bibliovert.bibliovert.user.repos;

import com.bibliovert.bibliovert.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
}
