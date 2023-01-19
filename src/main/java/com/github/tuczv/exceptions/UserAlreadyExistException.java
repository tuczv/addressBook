package com.github.tuczv.exceptions;

public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException(final String format) {
        super(format);
    }

}
