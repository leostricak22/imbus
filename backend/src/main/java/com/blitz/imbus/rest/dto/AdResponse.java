package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.CroatianCounty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
public class AdResponse {
    private Integer id;

    private UserResponse creator;

    private LocalDateTime created_at;

    private LocalDateTime do_the_job_from;

    private LocalDateTime do_the_job_to;

    private CroatianCounty location;

    private Set<CategoryType> categories;

    private String title;

    private String description;
}
