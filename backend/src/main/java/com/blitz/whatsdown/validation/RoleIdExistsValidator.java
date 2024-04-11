package com.blitz.whatsdown.validation;

import com.blitz.whatsdown.repository.RoleRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class RoleIdExistsValidator implements ConstraintValidator<RoleIdExists, Integer> {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public boolean isValid(Integer roleId, ConstraintValidatorContext context) {
        return roleRepository.existsById(roleId); // role has to exist in the db
    }
}
