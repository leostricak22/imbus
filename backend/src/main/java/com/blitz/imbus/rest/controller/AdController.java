package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.rest.dto.AdRequest;
import com.blitz.imbus.rest.dto.AdResponse;
import com.blitz.imbus.service.AdService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/ad")
public class AdController {
    private final AdService adService;
    private final ModelMapper modelMapper;

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

    @PreAuthorize("hasAuthority('CLIENT')")
    @PostMapping("/add")
    public ResponseEntity<AdResponse> addAd(
            @Valid @RequestBody AdRequest adRequest
    ) {
        return ResponseEntity.ok(adService.addAd(modelMapper.map(adRequest, Ad.class)));
    }
}
