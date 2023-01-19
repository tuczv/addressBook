package com.github.tuczv;

import com.github.tuczv.contact.ContactDao;
import com.github.tuczv.contact.ContactService;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.core.MongoTemplate;

@Slf4j
@PropertySource(value = "classpath:info.properties", ignoreResourceNotFound = true)
public class Config {

    @Bean
    MongoClient mongoClient() {
        return MongoClients.create(
                new ConnectionString("mongodb://mongoadmin:pass@localhost:27017/addressbook?authSource=admin")
        );
    }

    /*@Bean
    MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "addressbook");
    }*/

    @Bean
    ContactDao contactDao(MongoTemplate mongoTemplate) {
        return new ContactDao(mongoTemplate);
    }

    @Bean
    ContactService contactService(ContactDao contactDao) {
        return new ContactService(contactDao);
    }
}
