package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("""
        SELECT e.nomEquipe, SUM(r.reservedQuantity) 
        FROM EquipeIntervention e
        JOIN e.reservations r
        WHERE YEAR(r.reservationDate) = :year AND MONTH(r.reservationDate) = :month
        GROUP BY e.nomEquipe
    """)
    List<Object[]> getReservedQuantityByEquipeAndMonth(int year, int month);
}


