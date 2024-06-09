package com.blitz.imbus.repository;

import com.blitz.imbus.domain.models.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByReceiverNameOrSenderNameOrderByDateDesc(String receiverName, String senderName);
}
