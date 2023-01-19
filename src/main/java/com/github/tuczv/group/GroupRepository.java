package com.github.tuczv.group;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface GroupRepository extends MongoRepository<Group, String> {

    Group getGroupByName(String name);

    Group getGroupById(String id);

    //void delete(String id);
}
