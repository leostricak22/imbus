package com.blitz.imbus.domain.models;

import com.blitz.imbus.domain.enums.CroatianCounty;
import com.blitz.imbus.domain.enums.CategoryType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ad")
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "creator")
    private User creator;

    @CreationTimestamp
    private LocalDateTime created_at;

    private LocalDateTime do_the_job_from;

    private LocalDateTime do_the_job_to;

    @Enumerated(EnumType.STRING)
    private CroatianCounty location;

    // TODO: add the exact address

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    @CollectionTable(
            name = "categories",
            joinColumns = @JoinColumn(name = "ad_id", referencedColumnName = "id", insertable = true, updatable = true)
    )
    private Set<CategoryType> categories;

    private String title;

    private String description;

    @Lob
    @ElementCollection
    @Column(columnDefinition = "MEDIUMBLOB")
    private List<byte[]> attachments;
}
