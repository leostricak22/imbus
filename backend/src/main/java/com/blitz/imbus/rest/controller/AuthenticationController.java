package com.blitz.imbus.rest.controller;

import com.blitz.imbus.service.AuthenticationService;
import com.blitz.imbus.rest.dto.AuthenticationRequest;
import com.blitz.imbus.rest.dto.RegisterRequest;
import com.blitz.imbus.rest.dto.AuthenticationResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    // registration route
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @Valid @RequestBody RegisterRequest request // executing function only if request data format is valid
    ) {
        return ResponseEntity.ok(authenticationService.register(request)); // returning token
    }

    // authentication route
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ) {
        System.out.println(request);
        return ResponseEntity.ok(authenticationService.authenticate(request)); // returning token
    }

}
