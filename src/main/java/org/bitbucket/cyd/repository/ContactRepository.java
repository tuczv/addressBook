package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactRepository extends MongoRepository<Contact, String> {

    Contact getContactByName(String name);

    List<Contact> getContactsByGroup(String group);

    Contact getContactById(String id);

}
