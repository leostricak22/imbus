package com.blitz.imbus.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
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

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.MemoryCacheImageOutputStream;

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
                .ifPresent(attachmentBase64 -> {
                    attachmentService.validateAttachmentImage(attachmentBase64);
                    byte[] imageBytes = Base64.getDecoder().decode(attachmentBase64);
                    BufferedImage originalImage = null;
                    try {
                        originalImage = ImageIO.read(new ByteArrayInputStream(imageBytes));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }

                    BufferedImage compressedImage = compressImage(originalImage, 0.1f); // Adjust quality here (0.0f to 1.0f)

                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    try {
                        ImageIO.write(compressedImage, "jpg", bos);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    byte[] compressedBytes = bos.toByteArray();
                    String compressedBase64Image = Base64.getEncoder().encodeToString(compressedBytes);

                    if (!compressedBase64Image.equals(user.getProfileImage())) {
                        user.setProfileImage(compressedBase64Image);
                    }
                });

        userRepository.save(user);
    }

    private BufferedImage compressImage(BufferedImage image, float quality) {
        try {
            ImageWriter writer = ImageIO.getImageWritersByFormatName("jpg").next();
            ImageWriteParam param = writer.getDefaultWriteParam();
            param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            param.setCompressionQuality(quality);

            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            MemoryCacheImageOutputStream output = new MemoryCacheImageOutputStream(bos);
            writer.setOutput(output);
            writer.write(null, new IIOImage(image, null, null), param);
            output.close();
            writer.dispose();

            ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
            return ImageIO.read(bis);
        } catch (IOException e) {
            throw new RuntimeException(e);
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

    private <T> void updateField(T newValue, Supplier<T> getter, Consumer<T> setter) {
        Optional.ofNullable(newValue)
                .filter(value -> !value.equals(getter.get()))
                .ifPresent(setter);
    }
}
