package com.blitz.imbus.rest.controller;

import com.blitz.imbus.rest.dto.*;
import com.blitz.imbus.service.OfferService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/offer")
public class OfferController {
    private final OfferService offerService;

    @GetMapping("/{adId}")
    public ResponseEntity<List<OfferResponse>> getAllOffers(
            @PathVariable Integer adId
    ) {
        return ResponseEntity.ok(offerService.getAllOffers(adId));
    }

    @PreAuthorize("hasAuthority('EXPERT')")
    @PostMapping("/")
    public ResponseEntity<OfferResponse> giveOfferToAnAd(
            @Valid @RequestBody OfferRequest offerRequest
    ) {
        return ResponseEntity.ok(offerService.giveOfferToAnAd(offerRequest));
    }

    @PreAuthorize("hasAuthority('CLIENT')")
    @PostMapping("/select/{offerId}")
    public ResponseEntity<OfferResponse> selectOffer(
        @PathVariable Integer offerId
    ) {
        return ResponseEntity.ok(offerService.selectOffer(offerId));
    }
}
