package com.blitz.imbus.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Supplier;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.Attachment;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.UpdateUserRequest;
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
    private final AttachmentService attachmentService;

    private static final Logger logger = LoggerFactory.getLogger(AdService.class);

    public UserResponse updateUser(UpdateUserRequest updateUserRequest) {
        String username = jwtService.getUsernameFromSession();
        User user = getUser(username);
        validateUser(user);

        updateUserDetails(user, updateUserRequest);

        return modelMapper.map(user, UserResponse.class);
    }

    private void updateUserDetails(User user, UpdateUserRequest updateUserRequest) {
        updateField(updateUserRequest.getName(), user::getName, user::setName);
        updateField(updateUserRequest.getSurname(), user::getSurname, user::setSurname);
        updateField(updateUserRequest.getUsername(), user::getUsername, user::setUsername);
        updateField(updateUserRequest.getEmail(), user::getEmail, user::setEmail);
        updateField(updateUserRequest.getPassword(), user::getPassword, user::setPassword);
        updateField(updateUserRequest.getRole(), user::getRole, user::setRole);
        updateField(updateUserRequest.getLocation(), user::getLocation, user::setLocation);
        updateField(updateUserRequest.getCategories(), user::getCategories, user::setCategories);

        Optional.ofNullable(updateUserRequest.getAttachment())
                .map(Attachment::getValue)
                .filter(attachmentBase64 -> {
                    attachmentService.validateAttachmentImage(attachmentBase64);
                    return !attachmentBase64.equals(user.getProfileImage());
                })
                .ifPresent(user::setProfileImage);

        userRepository.save(user);
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

    private <T> void updateField(T newValue, Supplier<T> getter, Consumer<T> setter) {
        Optional.ofNullable(newValue)
                .filter(value -> !value.equals(getter.get()))
                .ifPresent(setter);
    }
}
