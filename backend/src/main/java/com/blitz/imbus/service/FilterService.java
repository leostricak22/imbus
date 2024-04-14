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
        // if filters dont exist in the array, all values should be returned for that filter type
        boolean filterLocationFound = checkIfFilterTypeExistsInJsonArray(filterList, FilterType.LOCATION);
        boolean filterFieldFound = checkIfFilterTypeExistsInJsonArray(filterList, FilterType.FIELD);

        for (FilterCriteria filter : filterList) {
            // check if location is in the filter and its value
            if (!filterLocationFound && checkFilterUserLocation(filter, user))
                filterLocationFound = true;

            // check if field is in the filter and its value
            if (!filterFieldFound && checkFilterUserField(filter, user))
                filterFieldFound = true;

            // if filters were found, exit the for loop
            if (filterLocationFound && filterFieldFound)
                break;
        }

        // returning true if all conditions are met
        return filterLocationFound && filterFieldFound;
    }

    // check location of filter and the user
    public boolean checkFilterUserLocation(FilterCriteria filter, User user) {
        return filter.getName() == FilterType.LOCATION && filter.getValue().equals(user.getLocation().toString());
    }

    // check field of filter and the user
    public boolean checkFilterUserField(FilterCriteria filter, User user) {
        if (filter.getName() == FilterType.FIELD)
            return IntStream.range(0, user.getFields().size()).anyMatch(i -> user.getFields().get(i).getName().toString().equals(filter.getValue()));

        return false;
    }

    // check if there is a specific filter type inside of the filter array
    public boolean checkIfFilterTypeExistsInJsonArray(List<FilterCriteria> filterArray, FilterType filterType) {
        for (FilterCriteria filterCriteria : filterArray)
            if (filterCriteria.getName().equals(filterType))
                return false;

        return true;
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
