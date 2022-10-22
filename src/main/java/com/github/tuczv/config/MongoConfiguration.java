package com.github.tuczv.config;

import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public class MongoConfiguration {
    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate((com.mongodb.client.MongoClient) new MongoClient("localhost", 27017), "test");
    }
}
