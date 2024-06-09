package com.blitz.imbus.service;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.domain.models.Offer;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.AdRepository;
import com.blitz.imbus.repository.OfferRepository;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.OfferRequest;
import com.blitz.imbus.rest.dto.OfferResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.blitz.imbus.domain.exception.ErrorCode.BAD_REQUEST;
import static com.blitz.imbus.domain.exception.ErrorCode.CONFLICT;

@Service
@AllArgsConstructor
public class OfferService {
    private final JwtService jwtService;

    private final OfferRepository offerRepository;
    private final UserRepository userRepository;
    private final AdRepository adRepository;

    private final ModelMapper modelMapper;

    public OfferResponse giveOfferToAnAd(OfferRequest offerRequest) {
        Optional<User> loggedInUser = userRepository.findByUsername(jwtService.getUsernameFromSession());
        Ad selectedAd = adRepository.findById(offerRequest.getAdId())
                .orElseThrow(() -> new AppException(BAD_REQUEST));

        if(offerRepository.existsByAdIdAndUserId(selectedAd.getId(), loggedInUser.get().getId()))
            throw new AppException(CONFLICT);

        Offer offer = Offer.builder()
                .ad(selectedAd)
                .user(loggedInUser.get())
                .price(offerRequest.getPrice())
                .build();

        offerRepository.save(offer);

        return modelMapper.map(offer, OfferResponse.class);
    }

    public List<OfferResponse> getAllOffers(Integer adId) {
        List<Offer> allOffers = offerRepository.findAllByAdId(adId);

        List<OfferResponse> offerResponse = new ArrayList<>();
        for(Offer offer : allOffers)
            //if(offer.getAd().getCreator().getUsername().equals(jwtService.getUsernameFromSession()))
                offerResponse.add(modelMapper.map(offer, OfferResponse.class));

        return offerResponse;
    }

    public OfferResponse selectOffer(Integer offerId) {
        Offer offerToSelect = offerRepository.findById(offerId)
                .orElseThrow(() -> new AppException(BAD_REQUEST));

        List<Offer> selectedOffersWithSameAdId = offerRepository.findAllByAdId(offerToSelect.getAd().getId());
        for (Offer offer : selectedOffersWithSameAdId)
            if(offer.getSelected())
                throw new AppException(CONFLICT);

        offerToSelect.setSelected(true);
        offerRepository.save(offerToSelect);

        return modelMapper.map(offerToSelect, OfferResponse.class);
    }
}
