package com.blitz.imbus.domain.models;

import com.blitz.imbus.domain.enums.Status;
import com.blitz.imbus.domain.enums.SuggestionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String receiverName;
    private LocalDateTime date;
    private String senderName;
    private Status status;
    private Boolean opened;
    private Boolean suggestion;

    @Enumerated(EnumType.STRING)
    private SuggestionStatus suggestionStatus;

}
