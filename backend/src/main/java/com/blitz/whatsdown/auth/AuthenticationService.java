package com.blitz.whatsdown.auth;

import com.blitz.whatsdown.config.JwtService;
import com.blitz.whatsdown.model.User;
import com.blitz.whatsdown.model.requests.AuthenticationRequest;
import com.blitz.whatsdown.model.requests.RegisterRequest;
import com.blitz.whatsdown.model.responses.AuthenticationResponse;
import com.blitz.whatsdown.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // saving user to database with encoded password
        request.setPassword(passwordEncoder.encode(request.getPassword()));

        User user = User.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(request.getRole())
                .active(true)
                .build();

        // adding user into database
        userRepository.save(user);

        // generating token and returning it
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // find user from the database
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        // authenticating the user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        request.getPassword()
                )
        );

        // generating token and returning it
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
