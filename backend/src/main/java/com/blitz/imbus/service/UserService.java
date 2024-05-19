package com.blitz.imbus.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.UserRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import com.blitz.imbus.service.JwtService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.imageio.ImageIO;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JwtService jwtService;

    private static final Logger logger = LoggerFactory.getLogger(AdService.class);

    public UserResponse updateUser(MultipartFile image, String userRequestString) {
        UserRequest userRequest = parseUserRequest(userRequestString);

        if (image.isEmpty()) {
            image = null;
        }

        User user = getUser(jwtService.getUsernameFromSession());
        validateUser(user);

        updateUserProfileImage(user, image);
        updateUserDetails(user, userRequest);

        userRepository.save(user);
        return modelMapper.map(user, UserResponse.class);
    }

    private UserRequest parseUserRequest(String userRequestString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(userRequestString, UserRequest.class);
        } catch (IOException ex) {
            logger.error("Error parsing user request: " + ex.getMessage());
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }

    private User getUser(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.orElseThrow(() -> new AppException(ErrorCode.BAD_REQUEST));
    }

    private void validateUser(User user) {
        String loggedInUsername = jwtService.getUsernameFromSession();
        if (!Objects.equals(user.getUsername(), loggedInUsername)) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }

    private void updateUserProfileImage(User user, MultipartFile image) {
        try {
            if (image != null) {
                byte[] imageBytes = image.getBytes();
                ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
                BufferedImage originalImage = ImageIO.read(inputStream);

                int newWidth = 200;
                int newHeight = 200;
                BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, originalImage.getType());
                resizedImage.createGraphics().drawImage(originalImage, 0, 0, newWidth, newHeight, null);

                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                ImageIO.write(resizedImage, "jpg", outputStream);
                byte[] compressedImageBytes = outputStream.toByteArray();

                user.setProfileImage(compressedImageBytes);
            }
        } catch (IOException e) {
            logger.error("Error occurred while processing attachments: " + e.getMessage());
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }

    private void updateUserDetails(User user, UserRequest userRequest) {
        user.setName(userRequest.getName());
        user.setSurname(userRequest.getSurname());
        user.setCategories(userRequest.getCategories());
        user.setLocation(userRequest.getLocation());
    }
}
