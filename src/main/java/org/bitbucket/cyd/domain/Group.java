package org.bitbucket.cyd.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "groups")
public class Group {
    @Id private String id;
    private String name;
    private ArrayList<Contact> contacts =  new ArrayList<>();

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

    public ArrayList<Contact> getItems() {
        return contacts;
    }

    public void setItems(ArrayList<Contact> contacts) {
        this.contacts = contacts;
    }
}
