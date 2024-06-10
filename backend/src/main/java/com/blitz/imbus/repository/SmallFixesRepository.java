package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.Rating;
import com.blitz.imbus.domain.models.SmallFixes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SmallFixesRepository extends JpaRepository<SmallFixes, Integer> {
}
