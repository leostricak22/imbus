package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.CroatianCounty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class AdRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private LocalDateTime do_the_job_from;

    @NotNull // TODO: must be after 'doTheJobFrom'
    private LocalDateTime do_the_job_to;

    @Enumerated(EnumType.STRING)
    private CroatianCounty location;

    @Enumerated(EnumType.STRING)
    private Set<CategoryType> categories;

    @NotBlank
    private String title;

    @NotBlank
    private String description;
}
