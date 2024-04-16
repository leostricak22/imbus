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
import java.util.Optional;

@Service
@AllArgsConstructor
public class ExpertService {
    private final UserRepository userRepository;
    private final FilterService filterService;

    private final ModelMapper modelMapper;

    public List<UserResponse> getExpertsFilter(FilterRequest filters) {
        List<User> allExperts = userRepository.findByRole(Role.EXPERT);
        List<FilterCriteria> filterList = filters.getFilters();

        return getExperts(allExperts, filterList);
    }

    public List<UserResponse> getExperts(List<User> allExperts, List<FilterCriteria> filterList) {
        List<UserResponse> allExpertsResponse = new ArrayList<>();

        for (User expert : allExperts) {
            if (!filterService.checkFilter(filterList, expert))
                continue;

            allExpertsResponse.add(modelMapper.map(expert, UserResponse.class));
        }

        return allExpertsResponse;
    }

    public UserResponse getSpecificExpert(Integer id) {
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty())
            throw new AppException(ErrorCode.BAD_REQUEST);

        return modelMapper.map(user.get(), UserResponse.class);
    }
}
