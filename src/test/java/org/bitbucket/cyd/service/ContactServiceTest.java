package org.bitbucket.cyd.service;

import org.bitbucket.cyd.SpringbootAngularjsAddressbookApplication;
import org.bitbucket.cyd.domain.Contact;
import org.bitbucket.cyd.domain.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringbootAngularjsAddressbookApplication.class)
public class ContactServiceTest {

    @Autowired
    private ContactService contactService;

    private User user;

    @Test
    public void getContactsByUser() throws Exception {
        List<Contact> contacts = contactService.getContactsByUser(user);
        Assert.assertEquals("failure", 0, contacts.size());
    }

}