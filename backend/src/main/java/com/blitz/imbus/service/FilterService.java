package com.blitz.imbus.service;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.FilterType;
import com.blitz.imbus.domain.models.FilterCriteria;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.rest.dto.FilterRequest;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.hibernate.Filter;
import org.hibernate.event.spi.SaveOrUpdateEvent;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class FilterService {
    private final ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(AdService.class);

    public <T> boolean checkFilter(List<FilterCriteria> filterList, T objectToBeFiltered){
        boolean filterLocationFound = checkIfFilterTypeExistsInJsonArray(filterList, FilterType.LOCATION);
        boolean filterFieldFound = checkIfFilterTypeExistsInJsonArray(filterList, FilterType.CATEGORY);

        for (FilterCriteria filter : filterList) {
            if (filterLocationFound && filterFieldFound) break;

            if (!filterLocationFound && checkFilterLocation(filter, objectToBeFiltered))
                filterLocationFound = true;

            if (!filterFieldFound && checkFilterCategory(filter, objectToBeFiltered))
                filterFieldFound = true;
        }

        return filterLocationFound && filterFieldFound;
    }

    @SneakyThrows
    public <T> boolean checkFilterLocation(FilterCriteria filter, T objectToBeFiltered) {
        if (!methodExists(objectToBeFiltered, "getLocation")) return true;

        String objectLocation = objectToBeFiltered.getClass().getMethod("getLocation").invoke(objectToBeFiltered).toString();

        return filter.getName() == FilterType.LOCATION &&
               filter.getValue().equals(objectLocation);
    }

    @SneakyThrows
    public <T> boolean checkFilterCategory(FilterCriteria filter, T objectToBeFiltered) {
        if (!methodExists(objectToBeFiltered, "getCategories")) return true;
        if (filter.getName() != FilterType.CATEGORY) return false;

        Object categories = objectToBeFiltered.getClass().getMethod("getCategories").invoke(objectToBeFiltered);

        return ((Collection<CategoryType>) categories).stream().anyMatch(category -> category.toString().equals(filter.getValue()));
    }

    public boolean methodExists(Object objectToBeFiltered, String method) {
        try {
            objectToBeFiltered.getClass().getMethod(method);
            return true;
        } catch (NoSuchMethodException e) {
            logger.error("Error checking method existence: " + e.getMessage());
            return false;
        }
    }

    public boolean checkIfFilterTypeExistsInJsonArray(List<FilterCriteria> filterArray, FilterType filterType) {
        for (FilterCriteria filterCriteria : filterArray)
            if (filterCriteria.getName().equals(filterType))
                return false;

        return true;
    }
}
