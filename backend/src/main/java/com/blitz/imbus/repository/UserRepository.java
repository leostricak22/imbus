// repository for data manipulation for table: user

package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // gets user by email
    Optional<User> findByEmail(String email);
    // gets user by username
    Optional<User> findByUsername(String username);
}
