// repository for data manipulation for table: user

package com.blitz.imbus.repository;

import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    List<User> findByRole(Role role);

    boolean  existsByUsernameOrEmail(String username, String password);
}
