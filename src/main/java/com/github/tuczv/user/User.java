package com.github.tuczv.user;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    @NotEmpty
    @Size(min = 3, max = 10)
    private String username;

    @NotEmpty
    private String email;

    @Size(min = 6, max = 10)
    private String password;

    @Size(min = 3, max = 10)
    private String secret;

    //private Set<Authority> authorities = new HashSet<>();

    public User() {
    }

    public User(User user) {
        super();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.secret = user.getSecret();
        //this.authorities = user.getAuthorities();
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.secret = secret;
        //this.authorities = authorities;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

  /*  public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }*/
}