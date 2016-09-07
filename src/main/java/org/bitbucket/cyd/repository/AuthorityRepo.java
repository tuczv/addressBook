package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Authority;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuthorityRepo extends MongoRepository<Authority, String> {
}
