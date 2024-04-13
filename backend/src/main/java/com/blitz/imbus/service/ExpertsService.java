package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.AuthenticationResponse;
import com.blitz.imbus.rest.dto.ExpertsResponse;
import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ExpertsService {
    private final UserRepository userRepository;

    public ExpertsResponse getExperts(FilterRequest filters) {
        List<User> allExpertsWithAllData = userRepository.findByRole(Role.EXPERT);
        List<UserResponse> allExperts = new ArrayList<>();

        for (User expertsAllDatum : allExpertsWithAllData) {
            allExperts.add(UserResponse.builder()
                    .id(expertsAllDatum.getId())
                    .name(expertsAllDatum.getName())
                    .surname(expertsAllDatum.getSurname())
                    .username(expertsAllDatum.getUsername())
                    .build());
        }

        return ExpertsResponse.builder()
                .experts(allExperts)
                .build();
    }
}
