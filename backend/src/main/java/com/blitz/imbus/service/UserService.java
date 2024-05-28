package com.blitz.imbus.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

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
        Optional.ofNullable(updateUserRequest.getName())
                .filter(name -> !name.isEmpty() && !name.equals(user.getName()))
                .ifPresent(user::setName);

        Optional.ofNullable(updateUserRequest.getSurname())
                .filter(surname -> !surname.isEmpty() && !surname.equals(user.getSurname()))
                .ifPresent(user::setSurname);

        Optional.ofNullable(updateUserRequest.getUsername())
                .filter(username -> !username.isEmpty() && !username.equals(user.getUsername()))
                .ifPresent(user::setUsername);

        Optional.ofNullable(updateUserRequest.getEmail())
                .filter(email -> !email.isEmpty() && !email.equals(user.getEmail()))
                .ifPresent(user::setEmail);

        Optional.ofNullable(updateUserRequest.getPassword())
                .filter(password -> !password.isEmpty() && !password.equals(user.getPassword()))
                .ifPresent(user::setPassword);

        Optional.ofNullable(updateUserRequest.getRole())
                .filter(role -> role != user.getRole())
                .ifPresent(user::setRole);

        Optional.ofNullable(updateUserRequest.getLocation())
                .filter(location -> location != user.getLocation())
                .ifPresent(user::setLocation);

        Optional.ofNullable(updateUserRequest.getCategories())
                .filter(categories -> !categories.equals(user.getCategories()))
                .ifPresent(user::setCategories);

        Optional.ofNullable(updateUserRequest.getAttachment())
                .map(Attachment::getValue)
                .filter(attachmentBase64 -> {
                    validateAttachmentImage(attachmentBase64);
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

    private void validateAttachmentImage(String attachmentBase64) {
        if (!attachmentService.isAttachmentImage(attachmentBase64)) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }
}
