package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.Offer;
import com.blitz.imbus.rest.dto.OfferResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    boolean existsByAdId(Integer ad_id);
    List<Offer> findAllByAdId(Integer adId);
}
