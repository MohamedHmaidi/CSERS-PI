package Hend.BackendSpringboot.controller;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.entity.Reservation;
import Hend.BackendSpringboot.entity.Ressource;
import Hend.BackendSpringboot.service.IReservationService;
import Hend.BackendSpringboot.service.IRessourceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/reservation")
public class ReservationRestController {
    IReservationService reservationService;
    // http://localhost:8089/csers/reservation/AffecterRessourceAEquipe/1/1
    @PostMapping("/AffecterRessourceAEquipe/{idRessource}/{idEquipe}")
    public Reservation AffecterRessourceAEquipe(@RequestBody Reservation r, @PathVariable("idRessource") Long idRessource,@PathVariable("idEquipe") Long idEquipe) {
        Reservation reservation = reservationService.AffecterRessourceAEquipe(r,idRessource,idEquipe);
        return reservation;
    }
    // http://localhost:8089/csers/reservation/retrieve-all-reservations
    @GetMapping("/retrieve-all-resservations")
    public List<Reservation> getReservations(){

        List<Reservation> listReservation = reservationService.retrieveAllReservations();
        return listReservation;
    }
    // http://localhost:8089/csers/reservation/retrieve-reservation/8
    @GetMapping("/retrieve-reservation/{reservation-id}")
    public Reservation retrieveReservation(@PathVariable("reservation-id") Long reservationId) {
        Reservation reservation = reservationService.retrieveReservation(reservationId);
        return reservation;
    }

    // http://localhost:8089/csers/reservation/modify-reservation
    @PutMapping("/modify-reservation")
    public Reservation modifyReservation(@RequestBody Reservation reservation) {
        return reservationService.modifyReservation(reservation);
    }

}

