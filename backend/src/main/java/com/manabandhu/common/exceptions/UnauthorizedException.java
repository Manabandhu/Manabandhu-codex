package com.manabandhu.common.exceptions;

public class UnauthorizedException extends ApiException {
    public UnauthorizedException(String message) {
        super(message, 401);
    }
}
