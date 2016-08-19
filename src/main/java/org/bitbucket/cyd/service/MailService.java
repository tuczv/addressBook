package org.bitbucket.cyd.service;

import org.bitbucket.cyd.domain.Mail;
import org.bitbucket.cyd.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailService {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Mail> getMailsByUser(User userFrom) {
        Query query = new Query(Criteria.where("userFrom").is(userFrom));
        return mongoTemplate.find(query, Mail.class);
    }
}
