package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.AuthenticationRequest;
import com.blitz.imbus.rest.dto.AuthenticationResponse;
import com.blitz.imbus.rest.dto.UserRequest;
import com.blitz.imbus.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    @GetMapping("/sessionUser")
    public ResponseEntity<User> getAllUsers() {
        return ResponseEntity.ok(userRepository.findByUsername("leostricak22").get());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken() {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody UserRequest userRequest
    ) {
        return ResponseEntity.ok(authenticationService.register(modelMapper.map(userRequest, User.class), userRequest.getPassword()));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest authenticationRequest
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }

}