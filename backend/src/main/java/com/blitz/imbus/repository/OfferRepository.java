package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    boolean existsByAdId(Integer ad_id);
}
