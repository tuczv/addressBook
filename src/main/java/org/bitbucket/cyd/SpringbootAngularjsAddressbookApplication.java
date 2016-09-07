package org.bitbucket.cyd;

import org.bitbucket.cyd.domain.Authority;
import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;

import static java.util.Arrays.asList;

@SpringBootApplication
@ComponentScan
@EnableAutoConfiguration
public class SpringbootAngularjsAddressbookApplication implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(SpringbootAngularjsAddressbookApplication.class, args);
	}

	@Override
	public void run(String... strings) throws Exception {
/*		if (!userRepository.exists("admin")) {
            Authority administrator = new Authority("ROLE_ADMIN");
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(new BCryptPasswordEncoder().encode("admin123"));

            admin.setAuthorities(new HashSet<>(asList(administrator)));
            userRepository.save(admin);
        }*/
	}
}
