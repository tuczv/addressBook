package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.CalendarEvent;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface EventsRepository extends MongoRepository<CalendarEvent, String> {
}
