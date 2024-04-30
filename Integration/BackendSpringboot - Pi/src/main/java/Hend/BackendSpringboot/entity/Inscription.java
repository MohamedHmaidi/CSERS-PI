package Hend.BackendSpringboot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "inscription")
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inscription")
    private Long idInscription;

    @ManyToOne
    @JoinColumn(name = "id_formation")
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    // Constructors, getters, and setters

    public Long getIdInscription() {
        return idInscription;
    }

    public void setIdInscription(Long idInscription) {
        this.idInscription = idInscription;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

