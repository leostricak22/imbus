// repository for data manipulation for table: user

package com.blitz.imbus.repository;

import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // gets user by email
    Optional<User> findByEmail(String email);

    // gets user by username
    Optional<User> findByUsername(String username);

    // gets user by role
    List<User> findByRole(Role role);

    // check if user exists by username or email
    boolean  existsByUsernameOrEmail(String username, String password);
}
