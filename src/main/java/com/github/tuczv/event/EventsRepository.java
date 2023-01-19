package com.github.tuczv.event;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface EventsRepository extends MongoRepository<CalendarEvent, String> {
    CalendarEvent getEventById(String id);

    //void delete(String id);
}
