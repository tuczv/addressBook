package com.github.tuczv.user;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    User getUserById(String id);

    User findByUsername(String username);

    User getBySecret(String username);

    //void delete(String id);
}