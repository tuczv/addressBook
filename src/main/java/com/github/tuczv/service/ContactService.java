package com.github.tuczv.service;

import com.github.tuczv.domain.Contact;
import com.github.tuczv.domain.Group;
import com.github.tuczv.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Contact> getContactsByUser(User user) {
        Query query = new Query(Criteria.where("user.id").is(user));
        return mongoTemplate.find(query, Contact.class);
    }

    public List<Contact> getContactsByGroup(Group group) {
        Query query = new Query(Criteria.where("group.id").is(group));
        return mongoTemplate.find(query, Contact.class);
    }

}

