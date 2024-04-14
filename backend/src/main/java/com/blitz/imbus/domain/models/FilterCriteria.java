package com.blitz.imbus.domain.models;

import com.blitz.imbus.domain.enums.FilterType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FilterCriteria {
    private FilterType name;
    private String value;
}
