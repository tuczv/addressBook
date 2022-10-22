package com.github.tuczv.repository;

import com.github.tuczv.domain.Group;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface GroupRepository extends MongoRepository<Group, String> {

    Group getGroupByName(String name);

    Group getGroupById(String id);

    void delete(String id);
}
