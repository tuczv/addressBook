package org.bitbucket.cyd.web;

import org.bitbucket.cyd.domain.Contact;
import org.bitbucket.cyd.domain.Group;
import org.bitbucket.cyd.repository.ContactRepository;
import org.bitbucket.cyd.repository.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class MainService {
    private static final Logger logger = LoggerFactory.getLogger(MainService.class);


    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private GroupRepository groupRepository;

    @RequestMapping(value = "/contacts", method = RequestMethod.GET)
    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    @RequestMapping(value = "/contacts/{id}", method = RequestMethod.POST)
    public @ResponseBody  void saveContact(@PathVariable("id") String id, @RequestBody Contact contact) {
        contactRepository.save(contact);
    }

    @RequestMapping(value = "/contacts/{id}", method = RequestMethod.GET)
    public @ResponseBody Contact getContactById(@PathVariable("id") String id) {
        Contact contact = contactRepository.getContactById(id);

        if (contact == null) {
            logger.info("Contact with id: " + id + " NOT FOUND");
        }
        return contact;
    }

    @RequestMapping(value = "/contacts/search/{name}", method = RequestMethod.GET)
    public @ResponseBody Contact getContactByName(@PathVariable("name") String name) {
        Contact contact = contactRepository.getContactByName(name);

        if (contact == null) {
            logger.info("Contact by name: " + name + " NOT FOUND");
        }
        return contact;
    }

    @RequestMapping(value = "/contacts/{id}", method = RequestMethod.PUT)
    public Contact updateContact(@PathVariable("id") String id, @RequestBody Contact contact) {
        return contactRepository.save(contact);
    }


    @RequestMapping(value = "/contacts/{id}", method = RequestMethod.DELETE)
    public void deleteContact(@PathVariable("id") String id) {
        logger.info("Success deleting");
        contactRepository.delete(id);
    }

    @RequestMapping(value = "/groups", method = RequestMethod.GET)
    public List<Group> getGroups() {
        return groupRepository.findAll();
    }

    @RequestMapping(value = "/groups", method = RequestMethod.POST)
    public void saveGroup(@RequestBody Group group) {
        groupRepository.save(group);
    }

    @RequestMapping(value = "/groups/{id}", method = RequestMethod.GET)
    public Group getGroupById(@PathVariable("id") String id) {
        Group group = groupRepository.getGroupById(id);

        if (group == null) {
            logger.info("Group with id " + id + " NOT FOUND");
        }

        return group;
    }

    @RequestMapping(value = "/groups/search/{name}", method = RequestMethod.GET)
    public Group getGroupByName(@PathVariable("name") String name) {
        Group group = groupRepository.getGroupByName(name);

        if (group == null) {
            logger.info("Group by name: " + name + " NOT FOUND");
        }

        return group;
    }

    @RequestMapping(value = "/groups/{id}", method = RequestMethod.DELETE)
    public void deleteGroup(@PathVariable("id") String id) {
        logger.info("Success deleting");
        groupRepository.delete(id);
    }

    @RequestMapping(value = "/contacts/bygroups/{name}", method = RequestMethod.GET)
    public @ResponseBody List<Contact> getContactsByGroup(@PathVariable("name") String name) {

        List<Contact> contacts = null;

        if (name != null ) {
            contacts = contactRepository.getContactsByGroup(name);
        }

        if (contacts == null) {
            logger.info("Inside getContactByGroup, group: " + name + ", NOT FOUND");
        }

        return contacts;
    }
}