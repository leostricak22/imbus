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

        return AdResponse.builder()
                .id(ad.get().getId())
                .creator(UserResponse.builder()
                        .id(ad.get().getCreator().getId())
                        .username(ad.get().getCreator().getUsername())
                        .name(ad.get().getCreator().getName())
                        .surname(ad.get().getCreator().getSurname())
                        .location(ad.get().getCreator().getLocation())
                        .categories(ad.get().getCreator().getCategories())
                        .build())
                .title(ad.get().getTitle())
                .description(ad.get().getDescription())
                .created_at(ad.get().getCreated_at())
                .do_the_job_from(ad.get().getDo_the_job_from())
                .do_the_job_to(ad.get().getDo_the_job_to())
                .categories(ad.get().getCategories())
                .location(ad.get().getLocation())
                .build();
    }

    public AdResponse addAd(AdRequest request) {
        Optional<User> loggedInUser = userRepository.findByUsername(jwtService.getUsernameFromSession());

        Ad ad = Ad.builder()
                .created_at(LocalDateTime.now())
                .creator(loggedInUser.get())
                .title(request.getTitle())
                .description(request.getDescription())
                .do_the_job_from(request.getDo_the_job_from())
                .do_the_job_to(request.getDo_the_job_to())
                .location(request.getLocation())
                .categories(request.getCategories())
                .build();

        adRepository.save(ad);

        return getSpecificAd(ad.getId());
    }
}
