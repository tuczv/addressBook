package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String>{

    List<Message> findAll();
}
