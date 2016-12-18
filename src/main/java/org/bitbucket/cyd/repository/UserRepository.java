package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import javax.jws.soap.SOAPBinding;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User getUserById(String id);

    User findByUsername(String username);

    User getBySecret(String username);

}