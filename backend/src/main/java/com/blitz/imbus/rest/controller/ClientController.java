package com.blitz.imbus.rest.controller;

import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.ExpertsResponse;
import com.blitz.imbus.service.ExpertsService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/client")
@AllArgsConstructor
public class ClientController {
    private final ExpertsService expertsService;

    @GetMapping("/all-experts")
    public ResponseEntity<ExpertsResponse> allExperts() {
        return ResponseEntity.ok(expertsService.getExpertsFilter(FilterRequest.builder()
                .filters(new ArrayList<>())
                .build()));
    }

    @PostMapping("/all-experts-filter")
    public ResponseEntity<ExpertsResponse> allExpertsFilter (
            @Valid @RequestBody FilterRequest request
    ) {
        return ResponseEntity.ok(expertsService.getExpertsFilter(request));
    }
}
