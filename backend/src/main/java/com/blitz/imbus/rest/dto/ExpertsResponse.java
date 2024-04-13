package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.models.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Builder
@Data
public class ExpertsResponse {
    private List<UserResponse> experts;
}
