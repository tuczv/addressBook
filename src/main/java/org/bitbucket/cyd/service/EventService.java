package org.bitbucket.cyd.service;

import org.bitbucket.cyd.domain.CalendarEvent;
import org.bitbucket.cyd.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<CalendarEvent> getEventsByUser(User user) {
        Query query = new Query(Criteria.where("user.id").is(user));
        return mongoTemplate.find(query, CalendarEvent.class);
    }
}
