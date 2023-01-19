package com.github.tuczv;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@Slf4j
public class Application {

    public static void main(String... args) {
        run(args);
        log.info("Started application");
    }

    public static Application run(String... args) {
        return new SpringApplicationBuilder(Application.class, Config.class)
                .bannerMode(Banner.Mode.OFF)
                .main(Application.class)
                .build()
                .run(args)
                .getBean(Application.class);
    }
}
