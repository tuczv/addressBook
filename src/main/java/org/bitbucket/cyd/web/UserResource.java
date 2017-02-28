package org.bitbucket.cyd.web;

import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.UserRepository;
import org.bitbucket.cyd.security.SecurityUtils;
import org.bitbucket.cyd.web.exceptions.SecretQuestionExistException;
import org.bitbucket.cyd.web.exceptions.UserAlreadyExistException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class UserResource {

    private static final Logger logger = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/users/register", method = RequestMethod.POST)
    public User registerUser(@RequestBody User user) {

        if (userRepository.findByUsername(user.getUsername().toLowerCase()) != null) {
            throw new UserAlreadyExistException("");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        logger.info("Register new user");
        return new User();
    }

    @RequestMapping(value = "/users/login", method = RequestMethod.GET)
    public User login() {
        String username = SecurityUtils.getCurrentLoginUser();
        User user = userRepository.findByUsername(username);
        return user;
    }

    @RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
    public @ResponseBody User getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

    @RequestMapping(value = "/users/secret/{secret}", method = RequestMethod.GET)
    public @ResponseBody User getUserBySecret(@PathVariable String secret) {
        return userRepository.getBySecret(secret);
    }

    @RequestMapping(value = "/users/{username}", method = RequestMethod.PUT)
    public User reset(@PathVariable("username") String username, @RequestBody User user) {

        User resetUser = userRepository.findByUsername(username);

        if (!resetUser.getSecret().equals(user.getSecret())) {
            throw new SecretQuestionExistException("");
        }
        resetUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(resetUser);
    }
}
