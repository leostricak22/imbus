package com.blitz.whatsdown.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

// validator for the role

@Target({TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = RoleIdExistsValidator.class)
public @interface RoleIdExists {
    String message() default "Role ID doesn't exits";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
