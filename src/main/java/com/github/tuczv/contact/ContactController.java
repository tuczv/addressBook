package com.github.tuczv.contact;

import com.github.tuczv.addressBook.api.ContactsV1Api;
import com.github.tuczv.addressBook.api.dto.ContactApiDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ContactController implements ContactsV1Api {

    private final ContactService contactService;
    //private final GroupService groupService;
    //private final UserRepository userRepository;
    //private final GroupRepository groupRepository;

    @Override
    public ResponseEntity<List<ContactApiDto>> createContact(ContactApiDto contactApiDto) {
        return null;
    }

    @Override
    public ResponseEntity<List<ContactApiDto>> findContactByGroup(UUID groupName) {
        return null;
    }

    @Override
    public ResponseEntity<ContactApiDto> findContactById(UUID contactId) {
        return null;
    }

    @Override
    public ResponseEntity<List<ContactApiDto>> findContacts() {
        var result = contactService.getContacts();
        return ResponseEntity.ok(result
                .stream()
                .map(this::mapContactDto)
                .toList());
    }

    private ContactApiDto mapContactDto(Contact contact) {
        return new ContactApiDto()
                .id(UUID.randomUUID())
                .name(contact.getName())
                .lastName(contact.getLastName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .group(contact.getGroup())
                .address(contact.getAddress())
                .user(contact.getUser());
    }

    @Override
    public ResponseEntity<ContactApiDto> removeContactById(UUID contactId) {
        return null;
    }

    @Override
    public ResponseEntity<ContactApiDto> updateContactById(UUID contactId, ContactApiDto contactApiDto) {
        return null;
    }
}
