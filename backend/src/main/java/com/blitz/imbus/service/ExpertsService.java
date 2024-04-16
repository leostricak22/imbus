package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.UserRepository;
import com.blitz.imbus.rest.dto.FilterRequest;
import com.blitz.imbus.rest.dto.UserResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ExpertsService {
    private final UserRepository userRepository;
    private final FilterService filterService;

    private final ModelMapper modelMapper;

    public List<UserResponse> getExpertsFilter(FilterRequest filters) {
        if(!filterService.validateFilter(filters))
            throw new AppException(ErrorCode.BAD_REQUEST);

        List<User> allExpertsWithAllData = userRepository.findByRole(Role.EXPERT);
        List<FilterCriteria> filterList = filters.getFilters();

        return getExperts(allExpertsWithAllData, filterList);
    }

    public List<UserResponse> getExperts(List<User> allExpertsWithAllData, List<FilterCriteria> filterList) {
        List<UserResponse> allExperts = new ArrayList<>();

        for (User expert : allExpertsWithAllData) {
            if (!filterService.checkFilterUser(filterList, expert))
                continue;

            allExperts.add(modelMapper.map(expert, UserResponse.class));
        }

        return allExperts;
    }
}
