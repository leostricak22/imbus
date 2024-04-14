package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.FilterType;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.rest.dto.FilterRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class FilterService {
    public boolean checkFilterUser(FilterCriteria filter, User user) {
        return (filter.getName() == FilterType.LOCATION && filter.getValue().equals(user.getLocation().toString()));
               // TODO: && (filter.getName() == FilterType.CATEGORY && filter.getValue().equals(user.getCategory().toString())));
    }

    public boolean validateFilter(FilterRequest filters) {
        // put all filters to an array
        List<FilterCriteria> filterList = filters.getFilters();

        // check every filter if its name is valid
        for (FilterCriteria filter : filterList)
            if (!isFilterNameValid(filter.getName().toString()))
                return false;

        return true;
    }

    // check if filter name is valid
    public boolean isFilterNameValid(String filterName) {
        return Arrays.stream(FilterType.class.getEnumConstants())
                .map(Enum::name)
                .anyMatch(name -> name.equals(filterName));
    }
}
