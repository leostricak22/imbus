package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.Ad;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.domain.models.SmallFixes;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.AdRepository;
import com.blitz.imbus.repository.SmallFixesRepository;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.AdRequest;
import com.blitz.imbus.rest.dto.AdResponse;
import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.SmallFixesRequest;
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
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SmallFixesService {
    private final SmallFixesRepository smallFixesRepository;
    private final UserRepository userRepository;

    private final FilterService filterService;
    private final JwtService jwtService;

    private final ModelMapper modelMapper;
    private static final Logger logger = LoggerFactory.getLogger(AdService.class);

    public List<SmallFixes> getSmallFixesFilter(FilterRequest filters) {
        List<SmallFixes> allSmallFixes = smallFixesRepository.findAll();
        List<FilterCriteria> filterList = filters.getFilters();

        return getSmallFixes(allSmallFixes, filterList);
    }

    public List<SmallFixes> getSmallFixes(List<SmallFixes> allSmallFixes, List<FilterCriteria> filterList) {
        List<SmallFixes> allSmallFixesResponse = new ArrayList<>();
        for (SmallFixes smallFixes : allSmallFixes) {
            if (!filterService.checkFilter(filterList, smallFixes))
                continue;

            allSmallFixesResponse.add(smallFixes);
        }

        return allSmallFixesResponse;
    }

    public SmallFixes getSpecificSmallFixes(Integer id) throws AppException {
        Optional<SmallFixes> smallFixes = smallFixesRepository.findById(id);

        if(smallFixes.isEmpty())
            throw new AppException(ErrorCode.BAD_REQUEST);

        return modelMapper.map(smallFixes.get(), SmallFixes.class);
    }

    public SmallFixesRequest parseSmallFixesRequest(String smallFixesRequestString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(smallFixesRequestString, new TypeReference<Map<String, Object>>() {});

            SmallFixesRequest smallFixesRequest = new SmallFixesRequest();
            smallFixesRequest.setDescription((String) map.get("description"));

            return smallFixesRequest;
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
            logger.error("Error parsing ad request: " + ex.getMessage());
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }

    public SmallFixes addSmallFixes(List<MultipartFile> attachments, String smallFixesRequestString) {
        SmallFixesRequest smallFixesRequest = parseSmallFixesRequest(smallFixesRequestString);

        SmallFixes smallFixes = modelMapper.map(smallFixesRequest, SmallFixes.class);

        Optional<User> loggedInUser = userRepository.findByUsername(jwtService.getUsernameFromSession());
        smallFixes.setCreator(loggedInUser.get());

        addAttachments(smallFixes, attachments);
        smallFixesRepository.save(smallFixes);

        return getSpecificSmallFixes(smallFixes.getId());
    }

    private void addAttachments(SmallFixes smallFixes, List<MultipartFile> attachments) {
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

            smallFixes.setAttachments(attachmentsFinal);
        } catch (IOException e) {
            logger.error("Error occurred while processing attachments: " + e.getMessage());
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }
}
