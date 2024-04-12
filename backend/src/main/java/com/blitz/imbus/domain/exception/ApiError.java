package com.blitz.imbus.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApiError {
    private int code;
    private String message;
    private List<ViolationError> violationErrors;
}
