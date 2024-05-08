package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Reservation;

import java.util.List;

public interface IReservationService {
    public List<Reservation> retrieveAllReservations();
    public Reservation retrieveReservation(Long reservationId);
    public Reservation AffecterRessourceAEquipe(Reservation r, Long idRessource, Long idEquipe );
    public void removeReservation(Long reservationId);
    public Reservation modifyReservation(Reservation r);
    public List<Object[]> getReservedQuantityByEquipeAndMonth(int year, int month);

}
