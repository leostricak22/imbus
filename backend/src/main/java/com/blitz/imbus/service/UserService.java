package com.blitz.imbus.service;

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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JwtService jwtService;

    public UserResponse updateUser(Integer userId, MultipartFile image, String userRequestString) {
        UserRequest userRequest = parseUserRequest(userRequestString);

        if (image.isEmpty()) {
            image = null;
        }

        User user = getUser(userId);
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
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }

    private User getUser(Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
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
                user.setProfileImage(imageBytes);
            }
        } catch (IOException e) {
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
