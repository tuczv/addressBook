package com.github.tuczv.email;

import com.github.tuczv.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MailService {

    private final MongoTemplate mongoTemplate;

    public List<Mail> getMailsByUser(User userFrom) {
        Query query = new Query(Criteria.where("userFrom.id").is(userFrom));
        return mongoTemplate.find(query, Mail.class);
    }
}
