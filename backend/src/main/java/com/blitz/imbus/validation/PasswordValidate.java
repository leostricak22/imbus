package com.blitz.whatsdown.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

// validator for the password size

@Target({TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = PasswordValidateValidator.class)
@Documented
public @interface PasswordValidate {
    String message() default "Password is incorrect!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}