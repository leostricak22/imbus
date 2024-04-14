package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.FilterType;
import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.ExpertsResponse;
import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class ExpertsService {
    private final UserRepository userRepository;
    private final FilterService filterService;

    public ExpertsResponse getExperts(FilterRequest filters) {
        // check if filters are valid
        if(!filterService.validateFilter(filters))
            throw new AppException(ErrorCode.BAD_REQUEST);

        // get all experts
        List<User> allExpertsWithAllData = userRepository.findByRole(Role.EXPERT);
        List<UserResponse> allExperts = new ArrayList<>();

        List<FilterCriteria> filterList = filters.getFilters();

        // create UserResponse object from every user
        boolean passesFilter;
        for (User expert : allExpertsWithAllData) {
            passesFilter = false;
            for (FilterCriteria filter : filterList) {
                // check if location is in the filter and its value
                if (filterService.checkFilterUser(filter, expert)) {
                    passesFilter = true;
                    break;
                }
            }

            if(!passesFilter)
                continue;

            // add user to allExperts
            allExperts.add(UserResponse.builder()
                    .id(expert.getId())
                    .name(expert.getName())
                    .surname(expert.getSurname())
                    .username(expert.getUsername())
                    .location(expert.getLocation())
                    .build());
        }

        // returning all experts with the selected filters
        return ExpertsResponse.builder()
                .experts(allExperts)
                .build();
    }
}
