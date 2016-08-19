package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Mail;
import org.bitbucket.cyd.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MailRepository extends MongoRepository<Mail, String> {

}
