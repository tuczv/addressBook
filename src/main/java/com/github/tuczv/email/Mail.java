package com.github.tuczv.email;

import com.github.tuczv.user.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mails")
public class Mail {

    @Id
    private String id;

    @NotNull
    private String userTo;

    @NotNull
    @Size(min = 3, max = 25)
    private String subject;

    @Size(max = 200)
    private String body;

    private String date;
    @DBRef
    private User userFrom;

    public Mail() {
    }

    public Mail(String userTo, String subject, String body, String date) {
        this.userTo = userTo;
        this.subject = subject;
        this.body = body;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getUserTo() {
        return userTo;
    }

    public void setUserTo(String userTo) {
        this.userTo = userTo;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUserFrom() {
        return userFrom;
    }

    public void setUserFrom(User userFrom) {
        this.userFrom = userFrom;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
