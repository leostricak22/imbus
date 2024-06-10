package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.domain.models.Offer;
import com.blitz.imbus.rest.dto.OfferResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    boolean existsByAdIdAndUserId(Integer ad, Integer user);
    List<Offer> findAllByAdId(Integer adId);
    List<Offer> findAllByUserIdAndSelected(Integer userId, boolean selected);
}
