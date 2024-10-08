package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.AdRepository;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.AdRequest;
import com.blitz.imbus.rest.dto.AdResponse;
import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Filter;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdService {
    private final AdRepository adRepository;
    private final UserRepository userRepository;

    private final FilterService filterService;
    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationService authenticationService;

    private final ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(AdService.class);

    public List<AdResponse> getAdsFilter(FilterRequest filters) {
        List<Ad> allAds = adRepository.findAll();
        List<FilterCriteria> filterList = filters.getFilters();

        return getAds(allAds, filterList);
    }

    public List<AdResponse> getAds(List<Ad> allAds, List<FilterCriteria> filterList) {
        List<AdResponse> allAdResponse = new ArrayList<>();
        for (Ad ad : allAds) {
            if (!filterService.checkFilter(filterList, ad))
                continue;

            allAdResponse.add(modelMapper.map(ad, AdResponse.class));
        }

        return allAdResponse;
    }

    public AdResponse getSpecificAd(Integer id) throws AppException {
        Optional<Ad> ad = adRepository.findById(id);

        if(ad.isEmpty())
            throw new AppException(ErrorCode.BAD_REQUEST);

        return modelMapper.map(ad.get(), AdResponse.class);
    }

    public AdRequest parseAdRequest(String adRequestString) {
        System.out.println(adRequestString);
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(adRequestString, new TypeReference<Map<String, Object>>() {});

            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            LocalDateTime doTheJobFrom = LocalDateTime.parse((CharSequence) map.get("do_the_job_from"), formatter);
            LocalDateTime doTheJobTo = LocalDateTime.parse((CharSequence) map.get("do_the_job_to"), formatter);

            AdRequest adRequest = new AdRequest();
            adRequest.setDo_the_job_from(doTheJobFrom);
            adRequest.setDo_the_job_to(doTheJobTo);
            adRequest.setLocation(CroatianCounty.valueOf((String) map.get("location")));
            adRequest.setCategories(Collections.singleton(CategoryType.valueOf((String) map.get("categories"))));
            adRequest.setTitle((String) map.get("title"));
            adRequest.setDescription((String) map.get("description"));

            return adRequest;
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
            logger.error("Error parsing ad request: " + ex.getMessage());
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }

    public AdResponse addAd(List<MultipartFile> attachments, String adRequestString) {
        AdRequest adRequest = parseAdRequest(adRequestString);

        Ad ad = modelMapper.map(adRequest, Ad.class);

        Optional<User> loggedInUser = userRepository.findByUsername(jwtService.getUsernameFromSession());
        ad.setCreator(loggedInUser.get());

        addAttachments(ad, attachments);
        adRepository.save(ad);

        return getSpecificAd(ad.getId());
    }

    private void addAttachments(Ad ad, List<MultipartFile> attachments) {
        try {
            List<byte[]> attachmentsFinal = new ArrayList<>();

            for (MultipartFile attachment : attachments) {
                if (attachment != null) {
                    byte[] imageBytes = attachment.getBytes();
                    ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
                    BufferedImage originalImage = ImageIO.read(inputStream);

                    int newWidth = 1000;
                    int newHeight = 1000;
                    BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, originalImage.getType());
                    resizedImage.createGraphics().drawImage(originalImage, 0, 0, newWidth, newHeight, null);

                    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                    ImageIO.write(resizedImage, "jpg", outputStream);
                    byte[] compressedImageBytes = outputStream.toByteArray();

                    attachmentsFinal.add(compressedImageBytes);
                }
            }

            ad.setAttachments(attachmentsFinal);
        } catch (IOException e) {
            logger.error("Error occurred while processing attachments: " + e.getMessage());
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }

    public List<AdResponse> getAdsUser() {
        List<Ad> ads = adRepository.findAllByCreatorId(authenticationService.findUserBySessionUsername().getId());


        return ads.stream().map(ad -> modelMapper.map(ad, AdResponse.class)).collect(Collectors.toList());
    }
}
