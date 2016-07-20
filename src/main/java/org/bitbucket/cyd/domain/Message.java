package org.bitbucket.cyd.domain;

import org.springframework.data.annotation.Id;

public class Message {

    @Id private String id;
    private String author;
    private String text;
    private String date;

    public Message() {}

    public Message(String text, String date, String author) {
        this.text = text;
        this.date = date;
        this.author = author;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
