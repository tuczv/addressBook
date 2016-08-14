package org.bitbucket.cyd.domain;

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

    @NotEmpty
    @Size(min = 6, max = 10)
    private String password;

    private String news;

    public User() {
        super();
    }

    public User(String username, String email, String password, String news) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.news = news;
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

    public String getNews() {
        return news;
    }

    public void setNews(String news) {
        this.news = news;
    }
}