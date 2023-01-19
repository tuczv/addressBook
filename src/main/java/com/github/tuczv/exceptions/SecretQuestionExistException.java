package com.github.tuczv.exceptions;

public class SecretQuestionExistException extends RuntimeException {
    public SecretQuestionExistException(final String format) {
        super(format);
    }
}
