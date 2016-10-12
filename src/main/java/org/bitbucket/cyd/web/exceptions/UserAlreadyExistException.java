package org.bitbucket.cyd.web.exceptions;

/**
 * Created by victor on 12.10.16.
 */
public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException(final String format) {
        super(format);
    }

}
