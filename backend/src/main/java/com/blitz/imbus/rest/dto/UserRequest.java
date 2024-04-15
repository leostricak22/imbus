package com.blitz.imbus.rest.dto;

import com.blitz.imbus.domain.enums.CategoryType;
import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.enums.Role;
import com.blitz.imbus.validation.PasswordValidate;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Builder
public class UserRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String surname;

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    @PasswordValidate
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private CroatianCounty location;

    @Enumerated(EnumType.STRING)
    private Set<CategoryType> categories;
}
