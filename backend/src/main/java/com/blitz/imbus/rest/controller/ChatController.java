package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.ChatMessage;
import com.blitz.imbus.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public ChatMessage receiveMessage(@Payload ChatMessage message){
        message.setDate(LocalDateTime.now());
        chatMessageRepository.save(message);
        return message;
    }

    @MessageMapping("/private-message")
    public ChatMessage recMessage(@Payload ChatMessage message){
        message.setDate(LocalDateTime.now());
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        chatMessageRepository.save(message);
        return message;
    }

    @GetMapping("/ws/messages/{user}")
    @ResponseBody
    public List<ChatMessage> getMessagesForUser(@PathVariable String user) {
        return chatMessageRepository.findByReceiverNameOrSenderNameOrderByDateDesc(user, user);
    }
}