package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.models.ChatMessage;
import com.blitz.imbus.domain.models.User;
import com.blitz.imbus.repository.ChatMessageRepository;
import com.blitz.imbus.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@RequestMapping("/chat")
@RestController
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/send")
    public void sendMessage(@RequestBody ChatMessage message) {
        message.setDate(LocalDateTime.now());
        chatMessageRepository.save(message);
    }

    @GetMapping("/messages/")
    @ResponseBody
    public List<ChatMessage> getMessagesForUser() {
        String username = authenticationService.findUserBySessionUsername().getUsername();
        return chatMessageRepository.findByReceiverNameOrSenderNameOrderByDateDesc(username, username);
    }
}