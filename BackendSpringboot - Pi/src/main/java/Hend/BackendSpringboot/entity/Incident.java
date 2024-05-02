package Hend.BackendSpringboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "incident")
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incident")
    private Long idIncident;

    @Column(name = "localisation")
    private String localisation;

    @Column(name = "description")
    private String description;

    @Column(name = "incident_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Date incidentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private IncidentStatus status;

    @ManyToOne
    @JoinColumn(name = "id_user")

    private User user;

    @ManyToMany
    @JoinTable(
            name = "equipe_intervention_incident",
            joinColumns = @JoinColumn(name = "id_incident"),
            inverseJoinColumns = @JoinColumn(name = "id_equipe")
    )
    private List<EquipeIntervention> equipesIntervention;

    @ManyToOne
    @JoinColumn(name = "id_typeincident")
    private TypeIncident typeIncident;


}

