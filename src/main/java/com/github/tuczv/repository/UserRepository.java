package com.github.tuczv.repository;

import com.github.tuczv.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User getUserById(String id);

    User findByUsername(String username);

    User getBySecret(String username);

    void delete(String id);
}