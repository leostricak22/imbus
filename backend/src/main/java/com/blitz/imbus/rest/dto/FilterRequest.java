package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.models.FilterCriteria;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class FilterRequest {
    @NotNull
    List<FilterCriteria> filters;
}
