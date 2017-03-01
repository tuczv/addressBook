package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Contact;
import org.bitbucket.cyd.domain.Group;
import org.bitbucket.cyd.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

    Contact getContactByName(String name);
    Contact getContactById(String id);

    List<Contact> getContactsByGroup(String group);

    List<Contact> getContactsByUser(String user);

    //Contact getContactByEmail(String email);
}
