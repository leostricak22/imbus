package com.blitz.imbus.domain.exception;

import com.blitz.imbus.domain.exception.ErrorCode;
import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private final ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    @Override
    public String toString() {
        return "AppException { " +
                "errorCode=" + errorCode.getCode() + " , description=" + errorCode.getMessage() +
                '}';
    }
}
