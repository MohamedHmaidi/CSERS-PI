package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Reservation;
import Hend.BackendSpringboot.entity.Ressource;
import Hend.BackendSpringboot.repository.RessourceRepository;

import java.util.List;

public interface IReservationService {
    public List<Reservation> retrieveAllReservations();
    public Reservation retrieveReservation(Long reservationId);
    public Reservation AffecterRessourceAEquipe(Reservation r, Long idRessource, Long idEquipe );
    public void removeReservation(Long reservationId);
    public Reservation modifyReservation(Reservation r);

}
