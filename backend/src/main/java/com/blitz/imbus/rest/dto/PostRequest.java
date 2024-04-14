package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.models.Field;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class PostRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private Long doTheJobFrom;

    @NotNull // TODO: must be after 'doTheJobFrom'
    private Long doTheJobTo;

    @Enumerated(EnumType.STRING)
    private CroatianCounty location;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Field> fields;

    @NotBlank
    private String title;

    @NotBlank
    private String description;
}
