package com.github.tuczv.repository;

import com.github.tuczv.domain.CalendarEvent;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface EventsRepository extends MongoRepository<CalendarEvent, String> {
    CalendarEvent getEventById(String id);

    void delete(String id);
}
