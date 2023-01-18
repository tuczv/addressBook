/*
package com.github.tuczv.security;

import com.github.tuczv.domain.User;
import com.github.tuczv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MongoUserDetailsService implements UserDetailsService {

//    private static final Logger logger = LoggerFactory.getLogger(MongoUserDetailsService.class);

    private final UserRepository userRepository;

    @Autowired
    public MongoUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> userFromDatabase = Optional.ofNullable(userRepository.findByUsername(login));

        return userFromDatabase.map(user -> {
            List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
                    .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                    .collect(Collectors.toList());

            return new org.springframework.security.core.userdetails.User(user.getUsername(),
                    user.getPassword(), grantedAuthorities);

        }).orElseThrow(() -> new UsernameNotFoundException("User" + login + "was not found in the database"));


    }

}
*/
