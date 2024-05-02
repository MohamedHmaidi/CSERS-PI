package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Reservation;
import Hend.BackendSpringboot.entity.Ressource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
}
