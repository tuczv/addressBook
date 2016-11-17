package org.bitbucket.cyd.web.exceptions;

public class ContactAlreadyExistException extends RuntimeException {
    public ContactAlreadyExistException(final String s) {
        super(s);
    }
}
