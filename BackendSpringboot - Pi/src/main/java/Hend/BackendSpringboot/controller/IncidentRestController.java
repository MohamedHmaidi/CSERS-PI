package Hend.BackendSpringboot.controller;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.service.IIncidentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/incident")
public class IncidentRestController {
    IIncidentService incidentService;

    // http://localhost:8089/csers/incident/add-incident
    @PostMapping("/add-incident")
    public Incident addIncident(@RequestBody Incident i) {
        Incident incident = incidentService.addIncident(i);
        return incident;
    }
    // http://localhost:8089/csers/incident/retrieve-all-incidents
    @GetMapping("/retrieve-all-incidents")
    public List<Incident> getIncidents(){

        List<Incident> listIncidents = incidentService.retrieveAllIncident();
        return listIncidents;
    }


    // http://localhost:8089/csers/incident/retrieve-incident/8
    @GetMapping("/retrieve-incident/{incident-id}")
    public Incident retrieveIncident(@PathVariable("incident-id") Long incidentId) {
        Incident incident = incidentService.retrieveIncident(incidentId);
        return incident;
    }


    // http://localhost:8089/csers/incident/remove-incident/{incident-id}
    @DeleteMapping("/remove-incident/{incident-id}")
    public void removeIncident(@PathVariable("incident-id") Long incidentId) {
        incidentService.removeIncident(incidentId);
    }

    // http://localhost:8089/csers/incident/modify-incident
    @PutMapping("/modify-incident")
    public Incident modifyIncident(@RequestBody Incident incident) {

        Long incidentId = incident.getIdIncident();
        Incident existingIncident = incidentService.retrieveIncident(incidentId);

        if (incident.getLocalisation() != null) {
            existingIncident.setLocalisation(incident.getLocalisation());
        }
        if (incident.getDescription() != null) {
            existingIncident.setDescription(incident.getDescription());
        }
        if (incident.getIncidentDate() != null) {
            existingIncident.setIncidentDate(incident.getIncidentDate());
        }
        if (incident.getStatus() != null) {
            existingIncident.setStatus(incident.getStatus());
        }
        if (incident.getUser() != null) {
            existingIncident.setUser(incident.getUser());
        }
        if (incident.getEquipesIntervention() != null) {
            existingIncident.setEquipesIntervention(incident.getEquipesIntervention());
        }
        if (incident.getTypeIncident() != null) {
            existingIncident.setTypeIncident(incident.getTypeIncident());
        }

        incidentService.modifyIncident(existingIncident);
        return existingIncident;
    }

}
