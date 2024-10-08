package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.repository.AdRepository;
import com.blitz.imbus.rest.dto.AdRequest;
import com.blitz.imbus.rest.dto.AdResponse;
import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import com.blitz.imbus.service.AdService;
import com.blitz.imbus.service.AuthenticationService;
import com.blitz.imbus.service.JwtService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/ad")
public class AdController {
    private final AdService adService;
    private final AdRepository adRepository;
    private final AuthenticationService authenticationService;

    @GetMapping("/")
    public ResponseEntity<List<AdResponse>> getAllAds() {
        return ResponseEntity.ok(adService.getAdsFilter(new FilterRequest()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdResponse> getAllAds(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(adService.getSpecificAd(id));
    }

    @GetMapping("/user")
    public ResponseEntity<List<AdResponse>> getAllAdsUser() {
        return ResponseEntity.ok(adService.getAdsUser());
    }

    @PreAuthorize("hasAuthority('CLIENT')")
    @PostMapping("/add")
    public ResponseEntity<AdResponse> addAd(
            @RequestParam("attachments") List<MultipartFile> attachments,
            @RequestParam("ad") String adRequest
    ) {
        return ResponseEntity.ok(adService.addAd(attachments, adRequest));
    }

    @PostMapping("/filter")
    public ResponseEntity<List<AdResponse>> allExpertsFilter (
            @Valid @RequestBody FilterRequest filterRequest
    ) {
        return ResponseEntity.ok(adService.getAdsFilter(filterRequest));
    }

}
