package com.github.tuczv.contact;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class ContactService {

    private final ContactDao contactDao;

    public List<Contact> getContactsByUser(String user) {
        return contactDao.getContactsByUser(user);
    }

    public List<Contact> getContacts() {
        return contactDao.getContacts();
    }
}

