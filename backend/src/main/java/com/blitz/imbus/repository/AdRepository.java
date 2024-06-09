package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdRepository extends JpaRepository<Ad, Integer> {
    List<Ad> findAllByCreatorId(Integer creatorId);
}
