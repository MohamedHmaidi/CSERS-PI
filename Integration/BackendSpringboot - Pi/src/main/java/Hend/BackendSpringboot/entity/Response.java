package Hend.BackendSpringboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "response")
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_response")
    private Long idResponse;

    @Column(name = "content", columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "date")
    private Date date;

    // Define the relationship
    @ManyToOne
    @JoinColumn(name = "id_claim")
    private Claim claim;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
}
