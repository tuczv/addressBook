package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {

    Contact getContactByName(String name);

    List<Contact> getContactsByGroup(String group);

    Contact getContactById(String id);

}
