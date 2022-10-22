package com.github.tuczv.web;

import com.github.tuczv.web.exceptions.UserAlreadyExistException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ExceptionsResource {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionsResource.class);

    @ExceptionHandler(UserAlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    @ResponseBody
    public String handlerUserAlreadyExistException(HttpServletRequest servletRequest, UserAlreadyExistException e) {
        logger.info("UserAlreadyExistException occured: URL=" + servletRequest.getRequestURL());
        return e.getLocalizedMessage();
    }

}
