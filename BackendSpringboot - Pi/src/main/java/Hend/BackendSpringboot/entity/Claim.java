package Hend.BackendSpringboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "claim")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_claim")
    private Long idClaim;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "varchar(255) default 'PENDING'")
    private ClaimStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "classification", columnDefinition = "varchar(255) default 'REGULAR'")
    private ClassificationType classification;

    @Enumerated(EnumType.STRING)
    @Column(name = "claim_type", columnDefinition = "varchar(255) default 'FEEDBACK'")
    private ClaimType claimType;

    @Column(name = "date")
    private Date date;


    @OneToMany(mappedBy = "claim", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Response> responses;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    public enum ClassificationType {
        VERY_URGENT,
        URGENT,
        REGULAR,
        OFF_TOPIC
    }

    public enum ClaimType {
        BUG_REPORT,
        FEATURE_REQUEST,
        FEEDBACK,
        SERVICE
    }

    public enum ClaimStatus {
        PENDING,CLOSED
    }
}

