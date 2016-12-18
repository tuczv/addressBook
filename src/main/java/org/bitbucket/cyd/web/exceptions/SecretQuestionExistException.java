package org.bitbucket.cyd.web.exceptions;

public class SecretQuestionExistException extends RuntimeException {
    public SecretQuestionExistException(final String format) {
        super(format);
    }
}
