package org.bitbucket.cyd.web;

import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.UserRepository;
import org.bitbucket.cyd.security.AuthorityConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Secured(AuthorityConstant.ADMIN)
@RestController
@RequestMapping(value = "/admin")
public class AdminResource {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public @ResponseBody User getUserById(@PathVariable("id") String id) {
        return userRepository.getUserById(id);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    public User update(@PathVariable("id") String id, @RequestBody User user) {
        User update = userRepository.getUserById(id);
        update.setUsername(user.getUsername());
        update.setEmail(user.getEmail());
        update.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(update);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") String id) {
        userRepository.delete(id);
    }

}
