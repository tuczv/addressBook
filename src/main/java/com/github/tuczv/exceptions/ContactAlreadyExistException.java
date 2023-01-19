package com.github.tuczv.exceptions;

public class ContactAlreadyExistException extends RuntimeException {
    public ContactAlreadyExistException(final String s) {
        super(s);
    }
}
