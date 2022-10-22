package com.github.tuczv.repository;

import com.github.tuczv.domain.Mail;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MailRepository extends MongoRepository<Mail, String> {

    void delete(String id);
}
