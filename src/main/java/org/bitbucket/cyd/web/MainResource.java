package org.bitbucket.cyd.web;

import org.bitbucket.cyd.domain.Contact;
import org.bitbucket.cyd.domain.Group;
import org.bitbucket.cyd.domain.User;
import org.bitbucket.cyd.repository.ContactRepository;
import org.bitbucket.cyd.repository.GroupRepository;
import org.bitbucket.cyd.repository.UserRepository;
import org.bitbucket.cyd.security.SecurityUtils;
import org.bitbucket.cyd.service.ContactService;
import org.bitbucket.cyd.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;


@RestController
@RequestMapping(value = "/api")
public class MainResource {

    private static final Logger logger = LoggerFactory.getLogger(MainResource.class);

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ContactService contactService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    /*@RequestMapping(value = "/contacts", method = RequestMethod.GET)
    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }*/

    @RequestMapping(value = "/contacts", method = RequestMethod.GET)
    public List<Contact> getContacts() {
        String user = SecurityUtils.getCurrentLoginUser();
        List<Contact> contacts = contactRepository.getContactsByUser(user);
        return contacts;
    }
    
    @RequestMapping(value = "/contacts/{id}", method = RequestMethod.POST)
    public @ResponseBody void saveContact(@PathVariable("id") String id, @RequestBody Contact contact) {
        /*if ((contactRepository.getContactByName(contact.getName()) != null) || (contactRepository.getContactByEmail(contact.getEmail()) != null)) {
            throw new ContactAlreadyExistException("");
        }*/
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
        Contact current = contactRepository.getContactById(id);

        current.setName(contact.getName());
        current.setLastName(contact.getLastName());
        current.setEmail(contact.getEmail());
        current.setPhone(contact.getPhone());
        current.setAddress(contact.getAddress());
        current.setGroup(contact.getGroup());

        return contactRepository.save(current);
    }

    @RequestMapping(value = "/contacts/{id}", method = RequestMethod.DELETE)
    public void deleteContact(@PathVariable("id") String id) {
        logger.info("Success deleting");
        contactRepository.delete(id);
    }

    @RequestMapping(value= "/contacts", method = RequestMethod.DELETE)
    public @ResponseBody ResponseEntity deleteAll(@RequestBody List<Contact> contacts) {
        logger.info("" + contacts);
        Iterator<Contact> it = contacts.iterator();
        while(it.hasNext())
        {
            Contact ud = (Contact) it.next();
            contactRepository.delete(ud);
        }
        return new ResponseEntity(HttpStatus.OK);

    }

   /* @RequestMapping(value = "/contacts", method = RequestMethod.DELETE)
    public void deleteListContact() {
        logger.info("Success deleting");
        contactRepository.deleteAll();
    }*/

     @RequestMapping(value= "/contacts", method = RequestMethod.POST)
     public void updateBeforeImportContacts(List<Contact> contacts) {
         for (Contact contact: contacts) {
             contactRepository.save(contact);
         }
     }

    @RequestMapping(value = "/groups", method = RequestMethod.GET)
    public List<Group> getGroups() {
        User user = userRepository.findByUsername(SecurityUtils.getCurrentLoginUser());
        List<Group> groups = groupService.getGroupsByUser(user);
        return groups;
    }


    @RequestMapping(value = "/groups/{id}", method = RequestMethod.POST)
    public @ResponseBody void saveGroup(@PathVariable("id") String id, @RequestBody Group group) {
       /* if (groupRepository.getGroupByName(group.getName())!= null) {
            throw new GroupAlreadyExistException("");
        }*/
        groupRepository.save(group);
    }

    @RequestMapping(value = "/groups/{id}", method = RequestMethod.PUT)
    public Group editGroup(@PathVariable("id") String id, @RequestBody Group group) {
        Group editGroup = groupRepository.getGroupById(id);
        editGroup.setName(group.getName());
        return groupRepository.save(editGroup);
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

    @RequestMapping(value = "/contacts/group/{group}", method = RequestMethod.GET)
    public @ResponseBody List<Contact> getContactsByGroup(@PathVariable("group") String group) {

        List<Contact> contacts = null;

        if (group != null ) {
            contacts = contactRepository.getContactsByGroup(group);
        }

        if (contacts == null) {
            logger.info("Inside getContactByGroup, group: " + group + ", NOT FOUND");
        }

        return contacts;
    }
}