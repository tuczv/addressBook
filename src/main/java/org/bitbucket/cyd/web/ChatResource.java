package org.bitbucket.cyd.web;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.bitbucket.cyd.domain.Message;
import org.bitbucket.cyd.repository.MessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatResource {
    public static Logger logger = LoggerFactory.getLogger(ChatResource.class);

    @Autowired
    private MessageRepository messageRepository;

    @RequestMapping(value = "/messages", method = RequestMethod.GET)
    @SubscribeMapping("/chat")
    public List<Message> allMessages() {
        return messageRepository.findAll();
    }

    @RequestMapping(value = "/messages", method = RequestMethod.POST)
    @MessageMapping("/chat")
    @SendTo("/topic/message")
    public Message send(Message userMessage) throws  Exception{
        userMessage.setDate(DateFormatUtils.format(new Date(System.currentTimeMillis()), "yyyy-MM-dd HH:mm:ss"));
        userMessage.getAuthor();
        logger.info("sent message success");
        return messageRepository.save(userMessage);
    }

}
