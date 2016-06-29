package org.bitbucket.cyd.web;

import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.UserRepository;
import org.bitbucket.cyd.web.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/api/users")
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value="/register",method = RequestMethod.POST)
    public ResponseEntity<User> registerUser(@RequestBody User user){
        if(userRepository.findByUsername(user.getUsername())== null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return new ResponseEntity<User>(HttpStatus.OK);
        }
        return new ResponseEntity<User>(HttpStatus.CONFLICT);
    }

    @RequestMapping(value="/me",method = RequestMethod.GET)
    public ResponseEntity<UserDTO> me(){
        String username;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else
            username = principal.toString();

        User user = userRepository.findByUsername(username);
        UserDTO userDTO = new UserDTO(user);
        return new ResponseEntity<UserDTO>(userDTO,HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") String id) {
        userRepository.delete(id);
    }
}
