package Hend.BackendSpringboot.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "formation")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_formation")
    private Long idFormation;

    @Column(name = "titre_formation")
    private String titreFormation;

    @Column(name = "description")
    private String description;

    @Column(name = "duree")
    private int duree;

    @Column(name = "formateur")
    private String formateur;

    @ManyToOne
    @JoinColumn(name = "id_membre")
    private Membre membre;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    private List<Inscription> inscriptions;

    // Getters and setters
    public Long getIdFormation() {
        return idFormation;
    }

    public void setIdFormation(Long idFormation) {
        this.idFormation = idFormation;
    }

    public String getTitreFormation() {
        return titreFormation;
    }

    public void setTitreFormation(String titreFormation) {
        this.titreFormation = titreFormation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public String getFormateur() {
        return formateur;
    }

    public void setFormateur(String formateur) {
        this.formateur = formateur;
    }

    public Membre getMembre() {
        return membre;
    }

    public void setMembre(Membre membre) {
        this.membre = membre;
    }

    public List<Inscription> getInscriptions() {
        return inscriptions;
    }

    public void setInscriptions(List<Inscription> inscriptions) {
        this.inscriptions = inscriptions;
    }
}

