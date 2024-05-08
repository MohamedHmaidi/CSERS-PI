package Hend.BackendSpringboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "ressource")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Ressource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ressource")
    private Long idRessource;

    @Column(name = "nom_ressource")
    private String nomRessource;

    @Enumerated(EnumType.STRING)
    private TypeRessource typeRessource;

    @Column(name = "archive")
    private boolean archive;

    @Column(name = "localisation")
    private String localisation;

   // @Column(name = "disponibilite")
    //private boolean disponibilite;

    @Column(name = "total_quantite")
    private int totalQuantite;


    @OneToMany(mappedBy = "ressource", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reservation> reservations;

    @Enumerated(EnumType.STRING)
    private etatRessource etatRessource;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;



}

