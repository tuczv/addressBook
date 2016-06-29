package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Group;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface GroupRepository extends MongoRepository<Group, String> {
    Group getGroupByName(String name);

    Group getGroupById(String id);
}
