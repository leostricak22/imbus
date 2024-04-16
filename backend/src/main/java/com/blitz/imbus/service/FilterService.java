package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.FilterType;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.rest.dto.FilterRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

@Service
public class FilterService {
    public boolean checkFilterUser(List<FilterCriteria> filterList, User user) {
        boolean filterLocationFound = checkIfFilterTypeExistsInJsonArray(filterList, FilterType.LOCATION);
        boolean filterFieldFound = checkIfFilterTypeExistsInJsonArray(filterList, FilterType.FIELD);

        for (FilterCriteria filter : filterList) {
            if (filterLocationFound && filterFieldFound) break;

            if (!filterLocationFound && checkFilterUserLocation(filter, user))
                filterLocationFound = true;

            if (!filterFieldFound && checkFilterUserField(filter, user))
                filterFieldFound = true;
        }

        return filterLocationFound && filterFieldFound;
    }

    public boolean checkFilterUserLocation(FilterCriteria filter, User user) {
        return filter.getName() == FilterType.LOCATION && filter.getValue().equals(user.getLocation().toString());
    }

    public boolean checkFilterUserField(FilterCriteria filter, User user) {
        if (filter.getName() == FilterType.FIELD)
            return user.getCategories().stream().anyMatch(category -> category.getName().equals(filter.getValue()));

        return false;
    }

    public boolean checkIfFilterTypeExistsInJsonArray(List<FilterCriteria> filterArray, FilterType filterType) {
        for (FilterCriteria filterCriteria : filterArray)
            if (filterCriteria.getName().equals(filterType))
                return false;

        return true;
    }

    public boolean validateFilter(FilterRequest filters) {
        List<FilterCriteria> filterList = filters.getFilters();

        for (FilterCriteria filter : filterList)
            if (!isFilterNameValid(filter.getName().toString()))
                return false;

        return true;
    }

    public boolean isFilterNameValid(String filterName) {
        return Arrays.stream(FilterType.class.getEnumConstants())
                .map(Enum::name)
                .anyMatch(name -> name.equals(filterName));
    }
}
