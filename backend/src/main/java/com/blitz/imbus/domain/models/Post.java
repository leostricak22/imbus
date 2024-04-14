package com.blitz.imbus.domain.models;

import com.blitz.imbus.domain.enums.CroatianCounty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.blitz.imbus.domain.models.User;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer creator_id;

    private Long created_at;

    private Long doTheJobFrom;

    private Long doTheJobTo;

    @Enumerated(EnumType.STRING)
    private CroatianCounty location;

    // TODO: add the exact address

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Field> fields;

    private String title;

    private String description;

    // TODO: add attachments
}
