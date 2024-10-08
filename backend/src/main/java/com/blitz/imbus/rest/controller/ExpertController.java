package com.blitz.imbus.rest.controller;

import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import com.blitz.imbus.service.ExpertService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/expert")
public class ExpertController {
    private final ExpertService expertService;

    @PreAuthorize("hasAuthority('CLIENT')")
    @GetMapping("/")
    public ResponseEntity<List<UserResponse>> allExperts() {
        return ResponseEntity.ok(expertService.getExpertsFilter(new FilterRequest()));
    }

    @PreAuthorize("hasAuthority('CLIENT')")
    @PostMapping("/filter")
    public ResponseEntity<List<UserResponse>> allExpertsFilter (
            @Valid @RequestBody FilterRequest filterRequest
    ) {
        return ResponseEntity.ok(expertService.getExpertsFilter(filterRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getSpecificExpert (
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(expertService.getSpecificExpert(id));
    }
}
