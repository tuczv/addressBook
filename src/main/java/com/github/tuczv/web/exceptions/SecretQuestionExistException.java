package com.github.tuczv.web.exceptions;

public class SecretQuestionExistException extends RuntimeException {
    public SecretQuestionExistException(final String format) {
        super(format);
    }
}
