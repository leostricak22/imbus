package com.blitz.whatsdown.model.requests;

import com.blitz.whatsdown.validation.PasswordValidate;
import com.blitz.whatsdown.validation.RoleIdExists;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class RegisterRequest {
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

    @RoleIdExists
    private Integer role;
}
