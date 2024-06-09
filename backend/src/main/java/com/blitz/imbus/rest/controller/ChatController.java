package com.blitz.imbus.rest.controller;

import com.blitz.imbus.domain.enums.SuggestionStatus;
import com.blitz.imbus.domain.models.ChatMessage;
import com.blitz.imbus.repository.ChatMessageRepository;
import com.blitz.imbus.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

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
        message.setOpened(false);
        message.setSuggestion(false);

        chatMessageRepository.save(message);
    }

    @PostMapping("/setopened")
    public void setopened(@RequestBody String chatUser) {
        String currentUsername = authenticationService.findUserBySessionUsername().getUsername();

        List<ChatMessage> messages = chatMessageRepository.findByReceiverNameOrSenderNameOrderByDateDesc(currentUsername, chatUser);

        for (ChatMessage message : messages) {
            message.setOpened(true);
        }

        chatMessageRepository.saveAll(messages);
    }

    @GetMapping("/messages/")
    @ResponseBody
    public List<ChatMessage> getMessagesForUser() {
        String username = authenticationService.findUserBySessionUsername().getUsername();
        return chatMessageRepository.findByReceiverNameOrSenderNameOrderByDateDesc(username, username);
    }

    @PostMapping("/suggestion")
    @ResponseBody
    public ResponseEntity<?> addSuggestion(@RequestBody ChatMessage message) {
        if (message.getId() == null) {
            String senderName = authenticationService.findUserBySessionUsername().getUsername();
            String receiverName = message.getReceiverName();
            SuggestionStatus waitingStatus = SuggestionStatus.WAITING;

            List<ChatMessage> suggestions = chatMessageRepository.findAllBySuggestionTrueAndSenderNameAndReceiverNameAndSuggestionStatus(senderName, receiverName, waitingStatus);
            suggestions.addAll(chatMessageRepository.findAllBySuggestionTrueAndSenderNameAndReceiverNameAndSuggestionStatus(receiverName, senderName, waitingStatus));

            for (ChatMessage suggestion : suggestions) {
                suggestion.setSuggestionStatus(SuggestionStatus.REJECT);
            }

            message.setSenderName(senderName);
            message.setDate(LocalDateTime.now());
            message.setOpened(false);
            message.setSuggestion(true);
            message.setSuggestionStatus(waitingStatus);

            chatMessageRepository.saveAll(suggestions);
        }

        return ResponseEntity.ok(chatMessageRepository.save(message));
    }
}
