package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.domain.models.Rating;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserResponse {
    private Integer id;
    private String name;
    private String surname;
    private String username;
    private CroatianCounty location;
    private Role role;
    private Set<CategoryType> categories;
    private String profileImage;
    private List<Rating> ratings = null;
    private Boolean premium;
}
