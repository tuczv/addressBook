package com.github.tuczv.repository;

import com.github.tuczv.domain.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

    Contact getContactByName(String name);
    Contact getContactById(String id);

    List<Contact> getContactsByGroup(String group);

    List<Contact> getContactsByUser(String user);

    void delete(String id);

    //Contact getContactByEmail(String email);
}
