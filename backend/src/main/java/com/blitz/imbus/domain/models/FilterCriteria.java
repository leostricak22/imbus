package com.blitz.imbus.domain.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FilterCriteria {
    private String name;
    private String value;
}
