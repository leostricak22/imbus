package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.FieldType;
import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.Field;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.FieldRepository;
import com.blitz.imbus.rest.dto.AuthenticationRequest;
import com.blitz.imbus.rest.dto.RegisterRequest;
import com.blitz.imbus.rest.dto.AuthenticationResponse;
import com.blitz.imbus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.blitz.imbus.domain.exception.ErrorCode.CONFLICT;
import static com.blitz.imbus.domain.exception.ErrorCode.UNAUTHORIZED;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final FieldRepository fieldRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // check if user already exists
        if (userRepository.existsByUsernameOrEmail(request.getUsername(), request.getEmail()))
            throw new AppException(CONFLICT);

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
                .created_at(System.currentTimeMillis())
                .location(request.getLocation())
                .fields(request.getFields())
                .build();

        // adding user into database
        userRepository.save(user);

        // adding fields into database
        List<Field> allFields = user.getFields();
        for (Field field : allFields) {
            field.setUser(User.builder()
                            .id(user.getId())
                            .build());

            fieldRepository.save(field);
        }

        // generating token and returning it
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // find user from the database
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(UNAUTHORIZED));

        // authenticating the user
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            throw new AppException(UNAUTHORIZED);
        }

        // generating token and returning it
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
