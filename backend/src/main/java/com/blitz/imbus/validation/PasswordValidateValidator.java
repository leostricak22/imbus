package com.blitz.imbus.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidateValidator implements ConstraintValidator<PasswordValidate, String> {
    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        return password.length() >= 8;
    }
}
