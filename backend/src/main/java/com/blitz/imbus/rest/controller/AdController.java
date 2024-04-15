package com.blitz.imbus.rest.controller;

import com.blitz.imbus.rest.dto.AdRequest;
import com.blitz.imbus.rest.dto.AdResponse;
import com.blitz.imbus.service.AdService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/ad")
public class AdController {
    private final AdService adService;

    @GetMapping("/")
    public ResponseEntity<List<AdResponse>> getAllAds() {
        return ResponseEntity.ok(adService.getAllAds());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdResponse> getAllAds(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(adService.getSpecificAd(id));
    }

    @PostMapping("/add")
    public ResponseEntity<AdResponse> addAd(
            @Valid @RequestBody AdRequest request
    ) {
        return ResponseEntity.ok(adService.addAd(request));
    }
}
