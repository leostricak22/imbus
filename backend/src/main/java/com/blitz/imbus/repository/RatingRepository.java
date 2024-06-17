package com.blitz.imbus.repository;

import com.blitz.imbus.domain.enums.SuggestionStatus;
import com.blitz.imbus.domain.models.ChatMessage;
import com.blitz.imbus.domain.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findAllByUserRatedUsername(String username);
    List<Rating> findAllByUserRatedId(Integer id);
    boolean existsByUserRatedIdAndUserRatingId(Integer id1, Integer id2);
}
