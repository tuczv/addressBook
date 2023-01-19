package com.github.tuczv.email;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface MailRepository extends MongoRepository<Mail, String> {

    //void delete(String id);
}
