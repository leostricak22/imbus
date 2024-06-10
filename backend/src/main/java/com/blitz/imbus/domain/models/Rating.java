package com.blitz.imbus.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "userrating")
    private User userRating;

    @OneToOne
    @JoinColumn(name = "userrated")
    private User userRated;

    private Integer rating;

    @Builder.Default
    private String description="";
}
