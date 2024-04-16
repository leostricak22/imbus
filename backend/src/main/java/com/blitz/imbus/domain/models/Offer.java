package com.blitz.imbus.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.swing.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "offer")
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "expert")
    private User user;

    @OneToOne
    @JoinColumn(name = "ad")
    private Ad ad;

    private Float price;

    @Builder.Default
    private Boolean selected=false;
}
