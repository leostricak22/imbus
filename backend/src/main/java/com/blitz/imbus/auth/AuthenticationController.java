package com.blitz.whatsdown.auth;

import com.blitz.whatsdown.model.requests.AuthenticationRequest;
import com.blitz.whatsdown.model.requests.RegisterRequest;
import com.blitz.whatsdown.model.responses.AuthenticationResponse;
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
            @Valid @RequestBody RegisterRequest request // Executing function only if request data format is valid
    ) {
        return ResponseEntity.ok(authenticationService.register(request)); // returning token
    }

    // authentication route
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request)); // returning token
    }

}
