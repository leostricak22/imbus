package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.models.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
public class RatingRequest {
    @NotBlank
    private User userRated;

    @NotNull
    private Integer rating;

    private String description;
}
