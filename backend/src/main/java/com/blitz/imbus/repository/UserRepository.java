// repository for data manipulation for table: user

package com.blitz.whatsdown.repository;

import com.blitz.whatsdown.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // gets user by id
    Optional<User> findById(Long id);

    // gets user by email
    Optional<User> findByEmail(String email);
    // gets user by username
    Optional<User> findByUsername(String username);

    // saving user to db
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO User (name, surname, username, email, active, password, role) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)", nativeQuery = true)
    int addUser(String name, String surname, String username, String email, Boolean active, String password, Integer role);
}
