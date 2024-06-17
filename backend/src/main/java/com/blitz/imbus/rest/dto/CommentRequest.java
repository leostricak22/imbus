package com.blitz.imbus.rest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommentRequest {
    @NotNull
    private Integer smallFixId;

    @NotBlank
    private String description;
}
