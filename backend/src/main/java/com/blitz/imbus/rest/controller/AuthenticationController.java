package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.service.AuthenticationService;
import com.blitz.imbus.rest.dto.AuthenticationRequest;
import com.blitz.imbus.rest.dto.UserRequest;
import com.blitz.imbus.rest.dto.AuthenticationResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @Valid @RequestBody UserRequest userRequest
    ) {
        return ResponseEntity.ok(authenticationService.register(modelMapper.map(userRequest, User.class), userRequest.getPassword()));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest authenticationRequest
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(authenticationRequest));
    }
}