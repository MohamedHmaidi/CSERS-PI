package Hend.BackendSpringboot.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ressource")
public class Ressource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ressource")
    private Long idRessource;

    @Column(name = "nom_ressource")
    private String nomRessource;

    @Column(name = "type_ressource")
    private String typeRessource;

    @Column(name = "localisation")
    private String localisation;

    @Column(name = "disponibilite")
    private boolean disponibilite;

    @Column(name = "total_quantite")
    private int totalQuantite;

    @OneToMany(mappedBy = "ressource", cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    //@Column(name = "etat")
    //private String etat; // Peut être un enum si vous le souhaitez

    // Getters and setters
    public Long getIdRessource() {
        return idRessource;
    }

    public String getNomRessource() {
        return nomRessource;
    }

    public String getTypeRessource() {
        return typeRessource;
    }

    public String getLocalisation() {
        return localisation;
    }

    public boolean isDisponibilite() {
        return disponibilite;
    }

    public int getTotalQuantite(){ return totalQuantite; }

}

