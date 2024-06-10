package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.enums.SuggestionStatus;
import com.blitz.imbus.domain.models.*;
import com.blitz.imbus.repository.ChatMessageRepository;
import com.blitz.imbus.repository.OfferRepository;
import com.blitz.imbus.rest.dto.*;
import com.blitz.imbus.service.AuthenticationService;
import com.blitz.imbus.service.OfferService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/offer")
public class OfferController {
    private final OfferService offerService;
    private final OfferRepository offerRepository;
    private final AuthenticationService authenticationService;
    private final ChatMessageRepository chatMessageRepository;

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

    @GetMapping("/jobs")
    public ResponseEntity<?> getAllJobs()
    {
        User loggedInUser = authenticationService.findUserBySessionUsername();

        List<Offer> allAds = offerRepository.findAllByUserIdAndSelected(loggedInUser.getId(), true);

        List<Job> jobs = new ArrayList<>();;
        for (Offer ad : allAds) {
            List<ChatMessage> acceptedDeals = chatMessageRepository.findAllBySuggestionTrueAndSenderNameAndReceiverNameAndSuggestionStatus(loggedInUser.getUsername(), ad.getAd().getCreator().getUsername(), SuggestionStatus.ACCEPT);

            for (ChatMessage acceptedDeal : acceptedDeals) {
                Job tempJob = new Job();
                tempJob.setAd(ad.getAd());
                tempJob.setDate(acceptedDeal.getMessage());
                jobs.add(tempJob);
            }

            acceptedDeals = chatMessageRepository.findAllBySuggestionTrueAndSenderNameAndReceiverNameAndSuggestionStatus(ad.getAd().getCreator().getUsername(), loggedInUser.getUsername(), SuggestionStatus.ACCEPT);

            for (ChatMessage acceptedDeal : acceptedDeals) {
                Job tempJob = new Job();
                tempJob.setAd(ad.getAd());
                tempJob.setDate(acceptedDeal.getMessage());
                jobs.add(tempJob);
            }

        }

        return ResponseEntity.ok(jobs);
    }
}
