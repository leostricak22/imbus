package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.models.FilterCriteria;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class FilterRequest {
    @NotNull
    List<FilterCriteria> filters = new ArrayList<>();
}
