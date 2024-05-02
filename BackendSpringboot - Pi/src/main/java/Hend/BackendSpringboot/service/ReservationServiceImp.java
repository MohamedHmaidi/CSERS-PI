package Hend.BackendSpringboot.service;


import Hend.BackendSpringboot.entity.EquipeIntervention;
import Hend.BackendSpringboot.entity.Reservation;
import Hend.BackendSpringboot.entity.Ressource;
import Hend.BackendSpringboot.repository.EquipeInterventionRepository;
import Hend.BackendSpringboot.repository.ReservationRepository;
import Hend.BackendSpringboot.repository.RessourceRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class ReservationServiceImp implements IReservationService {
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    EquipeInterventionRepository equipeInterventionRepository;
    @Autowired
    RessourceRepository ressourceRepository;
    @Override
    public List<Reservation> retrieveAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation retrieveReservation(Long reservationId) {
        return reservationRepository.findById(reservationId).get();
    }


    //add reservation
    @Override
    public Reservation AffecterRessourceAEquipe(Reservation r, Long  idRessource, Long idEquipe) {
        EquipeIntervention equipe = equipeInterventionRepository.findById(idEquipe).get();
        Ressource res = ressourceRepository.findById(idRessource).get();
        if (r.getReservedQuantity() > res.getTotalQuantite()) {
            throw new IllegalArgumentException("Quantité reservée est superieure à celle disponible.");
        }
        int updatedTotalQuantite = res.getTotalQuantite() - r.getReservedQuantity();
        res.setTotalQuantite(updatedTotalQuantite);
        ressourceRepository.save(res);
        r.setEquipeIntervention(equipe);
        r.setDateReservation(LocalDate.now());
        r.setRessource(res);
        reservationRepository.save(r);
        return r;
    }

    @Override
    public void removeReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);

    }

    @Override
    public Reservation modifyReservation(Reservation r) {
        return reservationRepository.save(r);
    }
}
