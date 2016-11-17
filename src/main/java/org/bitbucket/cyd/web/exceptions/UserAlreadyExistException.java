package org.bitbucket.cyd.web.exceptions;

public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException(final String format) {
        super(format);
    }

}
