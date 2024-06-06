package com.blitz.imbus.rest.controller;

import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.UpdateUserRequest;
import com.blitz.imbus.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    private final UserService userService;
    private final ModelMapper modelMapper;

    /*
    @PutMapping("/")
    public ResponseEntity<UserResponse> updateUser(@RequestParam("image") MultipartFile image,
                                                   @RequestParam("user") String userRequest
    ) {
        return ResponseEntity.ok(userService.updateUser(image, userRequest));
    }
    */

    @PutMapping("/")
    public ResponseEntity<?> updateUser(
            @RequestBody UpdateUserRequest updateUserRequest
    ) {
        return ResponseEntity.ok(userService.updateUser(updateUserRequest));
    }
}
