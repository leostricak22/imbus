package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.CroatianCounty;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class UserResponse {
    private Integer id;
    private String name;
    private String surname;
    private String username;
    private CroatianCounty location;
    private Set<CategoryType> categories;
}
