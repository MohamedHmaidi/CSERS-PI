package Hend.BackendSpringboot.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "reservation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reservation")
    private Long idReservation;

    @Column(name = "reserved_quantity")
    private int reservedQuantity;

    @Column(name = "reservation_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Date reservationDate;

    @ManyToOne
    @JoinColumn(name = "id_equipe")
    private EquipeIntervention equipeIntervention;

    @ManyToOne
    @JoinColumn(name = "id_ressource")
    @JsonIgnore
    private Ressource ressource;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "M-d-yyyy")
    private LocalDate dateReservation;


}
