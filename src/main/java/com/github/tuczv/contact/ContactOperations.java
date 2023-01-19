package com.github.tuczv.contact;

import java.util.List;
import java.util.Optional;

public interface ContactOperations {

    Optional<Contact> getContactByName(String name);

    Optional<Contact> getContactById(String id);

    List<Contact> getContactsByGroup(String group);

    List<Contact> getContactsByUser(String user);

    List<Contact> getContacts();

    void delete(String id);

    //Contact getContactByEmail(String email);
}
