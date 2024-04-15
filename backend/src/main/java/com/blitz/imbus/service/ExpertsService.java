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

    public ExpertsResponse getExpertsFilter(FilterRequest filters) {
        if(!filterService.validateFilter(filters))
            throw new AppException(ErrorCode.BAD_REQUEST);

        List<User> allExpertsWithAllData = userRepository.findByRole(Role.EXPERT);
        List<FilterCriteria> filterList = filters.getFilters();

        return ExpertsResponse.builder()
                .experts(getExperts(allExpertsWithAllData, filterList))
                .build();
    }

    public List<UserResponse> getExperts(List<User> allExpertsWithAllData, List<FilterCriteria> filterList) {
        List<UserResponse> allExperts = new ArrayList<>();

        for (User expert : allExpertsWithAllData) {
            if (!filterService.checkFilterUser(filterList, expert))
                continue;

            allExperts.add(UserResponse.builder()
                    .id(expert.getId())
                    .name(expert.getName())
                    .surname(expert.getSurname())
                    .username(expert.getUsername())
                    .location(expert.getLocation())
                    .categories(expert.getCategories())
                    .build());
        }

        return allExperts;
    }
}
