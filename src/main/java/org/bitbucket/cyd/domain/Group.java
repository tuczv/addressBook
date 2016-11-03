package org.bitbucket.cyd.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "groups")
public class Group {

    @Id private String id;
    private String name;

    @DBRef
    private User user;

    public Group() {}

    public Group(String id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    /*    public ArrayList<Contact> getItems() {
        return contacts;
    }

    public void setItems(ArrayList<Contact> contacts) {
        this.contacts = contacts;
    }*/
}
