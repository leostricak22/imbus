package com.blitz.imbus.domain.models;

import com.blitz.imbus.domain.enums.FilterType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FilterCriteria {
    @Enumerated(EnumType.STRING)
    private FilterType name;
    private String value;
}
