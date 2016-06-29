package org.bitbucket.cyd.web.dto;

import org.bitbucket.cyd.domain.User;

public class UserDTO {
    private String  id;
    private String name;
    private String username;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public UserDTO(User user){
        super();
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
    }
}