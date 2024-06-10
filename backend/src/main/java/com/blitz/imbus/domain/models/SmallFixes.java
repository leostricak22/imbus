package com.blitz.imbus.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "smallfixes")
public class SmallFixes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreationTimestamp
    private LocalDateTime created_at;

    @OneToOne
    @JoinColumn(name = "creator")
    private User creator;

    private String description;

    @Lob
    @ElementCollection
    @Column(columnDefinition = "MEDIUMBLOB")
    private List<byte[]> attachments;

}
