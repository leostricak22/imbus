package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.FilterTypes;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.rest.dto.FilterRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class FilterService {
    public boolean validateFilter(FilterRequest filters) {
        // put all filters to an array
        List<FilterCriteria> filterArray = filters.getFilters();

        // check every filter if its name is valid
        for (FilterCriteria filterCriteria : filterArray)
            if (!isFilterNameValid(filterCriteria.getName()))
                return false;

        return true;
    }

    // check if filter name is valid
    public boolean isFilterNameValid(String filterName) {
        return Arrays.toString(FilterTypes.class.getEnumConstants()).contains(filterName);
    }
}
