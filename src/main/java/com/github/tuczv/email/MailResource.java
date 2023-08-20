package com.github.tuczv.email;

import com.github.tuczv.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RequestMapping("/api")
public class MailResource {

    /*@Autowired
    private final MailService mailService;

    @Autowired
    private final MailRepository mailRepository;

    @Autowired
    private final UserRepository userRepository;

    public MailResource(MailService mailService, MailRepository mailRepository, UserRepository userRepository) {
        this.mailService = mailService;
        this.mailRepository = mailRepository;
        this.userRepository = userRepository;
    }

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
    }*/
}
