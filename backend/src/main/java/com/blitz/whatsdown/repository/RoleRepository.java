package com.blitz.whatsdown.repository;

import com.blitz.whatsdown.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    // gets Role by ID
    @Query(value = "SELECT * FROM role WHERE id=?", nativeQuery = true)
    Role findRoleById(Integer id);

    // gets every Role
    @Query(value = "SELECT * FROM role", nativeQuery = true)
    List<Role> findAllRoles();
}
