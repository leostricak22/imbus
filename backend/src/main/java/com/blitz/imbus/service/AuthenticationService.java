package com.blitz.imbus.service;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.rest.dto.AuthenticationRequest;
import com.blitz.imbus.rest.dto.UserRequest;
import com.blitz.imbus.rest.dto.AuthenticationResponse;
import com.blitz.imbus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.blitz.imbus.domain.exception.ErrorCode.CONFLICT;
import static com.blitz.imbus.domain.exception.ErrorCode.UNAUTHORIZED;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private static final Logger logger = LoggerFactory.getLogger(AdService.class);

    public AuthenticationResponse register(User user, String password) {
        if (userRepository.existsByUsernameOrEmail(user.getUsername(), user.getEmail()))
            throw new AppException(CONFLICT);

        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new AppException(UNAUTHORIZED));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            logger.error("Bad credentials detected while authenticating: " + ex.getMessage());
            throw new AppException(UNAUTHORIZED);
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User findUserBySessionUsername() {
        return userRepository.findByUsername(jwtService.getUsernameFromSession()).get();
    }
}
