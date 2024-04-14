package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.models.Field;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class PostResponse {
    private Long doTheJobFrom;
    private Long doTheJobTo;
    private CroatianCounty location;
    private List<Field> fields;
    private String title;
    private String description;
}
