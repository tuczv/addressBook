package com.github.tuczv.web.exceptions;

public class ContactAlreadyExistException extends RuntimeException {
    public ContactAlreadyExistException(final String s) {
        super(s);
    }
}
