package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.models.Field;
import com.blitz.imbus.domain.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PostResponse {
    private Integer id;
    private UserResponse creator;
    private Long doTheJobFrom;
    private Long doTheJobTo;
    private CroatianCounty location;
    private List<Field> fields;
    private String title;
    private String description;
}
