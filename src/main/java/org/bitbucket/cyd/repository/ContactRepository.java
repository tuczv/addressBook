package org.bitbucket.cyd.repository;

import org.bitbucket.cyd.domain.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ContactRepository extends PagingAndSortingRepository<Contact, String> {

    Page<Contact> findAll(Pageable pageable);

    Contact getContactByName(String name);

    List<Contact> getContactsByGroup(String group);

    Contact getContactById(String id);
}
