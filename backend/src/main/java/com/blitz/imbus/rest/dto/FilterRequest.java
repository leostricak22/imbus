package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.models.FilterCriteria;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FilterRequest {
    @NotNull
    List<FilterCriteria> filters;
}
