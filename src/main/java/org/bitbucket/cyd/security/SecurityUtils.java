package org.bitbucket.cyd.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public final class SecurityUtils {

    public SecurityUtils() {
    }

/*Get current login*/
    public static String getCurrentLoginUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = null;

        if(principal instanceof UserDetails){
            username = ((UserDetails)principal).getUsername();
        }
        else{
            username = principal.toString();
        }

        return username;
    }
}
