package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Contact;
import org.bitbucket.cyd.domain.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

    Contact getContactByName(String name);

//    List<Contact> getContactsByGroup(Group group);

    Contact getContactById(String id);

    Contact getContactByEmail(String email);
}
