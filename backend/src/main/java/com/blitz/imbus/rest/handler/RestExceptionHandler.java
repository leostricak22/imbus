package com.blitz.imbus.rest.handler;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ApiError;
import com.blitz.imbus.domain.exception.ViolationError;
import com.blitz.imbus.domain.exception.ErrorCode;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static java.util.Collections.singletonList;


@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(AppException.class)
    protected ResponseEntity<Object> handleAppException(AppException ex) {
        return createResponseEntity(ex.getErrorCode(), "Error occured");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        return createResponseEntity(ErrorCode.BAD_REQUEST, ex.getBindingResult().getFieldError().getDefaultMessage());
    }

    private ResponseEntity<Object> createResponseEntity(ErrorCode errorCode, String errorMessage) {
        return new ResponseEntity<>(
                new ApiError(errorCode.getCode(), errorCode.getMessage(), singletonList((new ViolationError(errorCode.getCode(), errorMessage)))),
                new HttpHeaders(),
                errorCode.getStatus());
    }
}