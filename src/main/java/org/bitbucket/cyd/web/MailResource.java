package org.bitbucket.cyd.web;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.bitbucket.cyd.domain.Mail;
import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.MailRepository;
import org.bitbucket.cyd.repository.UserRepository;
import org.bitbucket.cyd.security.SecurityUtils;
import org.bitbucket.cyd.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
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
        User user = userRepository.findByUsername(SecurityUtils.getCurrentLoginUser());
        List<Mail> mailList = mailService.getMailsByUser(user);
        return mailList;
    }

    @RequestMapping(value = "/emails", method = RequestMethod.POST)
    public @ResponseBody void sendEmail(@RequestBody Mail mail) {
        mail.setDate(DateFormatUtils.format(new Date(System.currentTimeMillis()), "EEE M/d/yyyy h:mm a"));
        mailRepository.save(mail);
    }

    @RequestMapping(value = "/emails/{id}", method = RequestMethod.DELETE)
    public void deleteEmail(@PathVariable("id") String id) {
        mailRepository.delete(id);
    }
}
