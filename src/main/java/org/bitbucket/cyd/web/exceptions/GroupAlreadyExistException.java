package org.bitbucket.cyd.web.exceptions;

public class GroupAlreadyExistException extends  RuntimeException {
    public GroupAlreadyExistException(final String s) {
        super(s);
    }
}
