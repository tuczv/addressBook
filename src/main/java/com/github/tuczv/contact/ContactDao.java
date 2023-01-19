package com.github.tuczv.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class ContactDao implements ContactOperations {

    private final MongoTemplate mongoTemplate;

    @Override
    public Optional<Contact> getContactByName(String name) {
        return Optional.empty();
    }

    @Override
    public Optional<Contact> getContactById(String id) {
        return Optional.empty();
    }

    @Override
    public List<Contact> getContactsByGroup(String group) {
        return null;
    }

    @Override
    public List<Contact> getContactsByUser(String user) {
        var query = new Query(Criteria.where("user.id").is(user));
        return mongoTemplate.find(query, Contact.class);
    }

    @Override
    public List<Contact> getContacts() {
        return mongoTemplate.findAll(Contact.class);
    }

    @Override
    public void delete(String id) {

    }
}
