package Hend.BackendSpringboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "type_incident")
public class TypeIncident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_typeincident")
    private Long idTypeIncident;

    @Column(name = "nom_typeincident")
    private String nomTypeIncident;

    @Column(name = "description")
    private String description;

    @Column(name = "niveau_risque")
    private int niveauRisque;

    @ManyToOne
    @JoinColumn(name = "id_plan")
    private PlanUrgence planUrgence;

    @JsonIgnore
    @OneToMany(mappedBy = "typeIncident", cascade = CascadeType.ALL)
    private List<Incident> incidents;

}
