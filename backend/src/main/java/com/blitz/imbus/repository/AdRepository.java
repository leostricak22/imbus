package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdRepository extends JpaRepository<Ad, Integer> {
}
