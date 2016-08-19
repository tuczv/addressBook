package org.bitbucket.cyd.web;

import org.bitbucket.cyd.domain.Mail;
import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.MailRepository;
import org.bitbucket.cyd.repository.UserRepository;
import org.bitbucket.cyd.security.SecurityUtils;
import org.bitbucket.cyd.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MailResource {

    @Autowired
    private MailService mailService;

    @Autowired
    private MailRepository mailRepository;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/emails", method = RequestMethod.GET)
    public List<Mail> getEmails() {

        String username = SecurityUtils.getCurrentLoginUser();
        List<Mail> mailList = mailService.getMailsByUser(userRepository.findByUsername(username));
        return mailList;
    }

    @RequestMapping(value = "/emails", method = RequestMethod.POST)
    public @ResponseBody void sendEmail(@RequestBody Mail mail) {
        mailRepository.save(mail);
    }
}
