package org.bitbucket.cyd.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;

public class ContactList {

    public String error;
    
    @JsonDeserialize(as=ArrayList.class, contentAs=Contact.class)
	private ArrayList<Contact> contacts;

    @JsonDeserialize(as=ArrayList.class, contentAs=Contact.class)
    private ArrayList<User> users;

    public ContactList() {
    }

    public ArrayList<Contact> getContacts() {
        return contacts;
    }	

    public void setContacts(ArrayList<Contact> contacts) {
        this.contacts = contacts;
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    public void setUsers(ArrayList<User> users) {
        this.users = users;
    }
}