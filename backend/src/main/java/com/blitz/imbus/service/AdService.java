package com.blitz.imbus.service;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.AdRepository;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.AdRequest;
import com.blitz.imbus.rest.dto.AdResponse;
import com.blitz.imbus.rest.dto.UserResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdService {
    private final AdRepository adRepository;
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final JwtService jwtService;

    public List<AdResponse> getAllAds() {
        List<Ad> allAds = adRepository.findAll();

        List<AdResponse> allAdRespons = new ArrayList<>();
        for (Ad allAd : allAds) {
            allAdRespons.add(getSpecificAd(allAd.getId()));
        }

        return allAdRespons;
    }

    public AdResponse getSpecificAd(Integer id) {
        Optional<Ad> ad = adRepository.findById(id);

        if(ad.isEmpty())
            throw new AppException(ErrorCode.BAD_REQUEST);

        return modelMapper.map(ad.get(), AdResponse.class);
    }

    public AdResponse addAd(Ad ad) {
        Optional<User> loggedInUser = userRepository.findByUsername(jwtService.getUsernameFromSession());
        ad.setCreator(loggedInUser.get());

        adRepository.save(ad);

        return getSpecificAd(ad.getId());
    }
}
