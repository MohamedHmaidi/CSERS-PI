package Hend.BackendSpringboot.controller;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.entity.TypeIncident;
import Hend.BackendSpringboot.service.ITypeIncidentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/incidentType")
public class TypeIncidentRestController {
    ITypeIncidentService typeIncidentService;

    // http://localhost:8089/csers/incidentType/add-incidentType
    @PostMapping("/add-incidentType")
    public TypeIncident addIncidentType(@RequestBody TypeIncident i) {
        TypeIncident typeIncident = typeIncidentService.addIncidentType(i);
        return typeIncident;
    }

    // http://localhost:8089/csers/incidentType/retrieve-all-incidentsTypes
    @GetMapping("/retrieve-all-incidentsTypes")
    public List<TypeIncident> getIncidentsTypes(){

        List<TypeIncident> listIncidentsTypes = typeIncidentService.retrieveAllIncidentType();
        return listIncidentsTypes;
    }
    // http://localhost:8089/csers/incidentType/retrieve-incidentType/8
    @GetMapping("/retrieve-incidentType/{incident-id}")
    public TypeIncident retrieveIncidentType(@PathVariable("incident-id") Long incidentTypeId) {
        TypeIncident incidentType = typeIncidentService.retrieveType(incidentTypeId);
        return incidentType;
    }

    // http://localhost:8089/csers/incidentType/remove-incidentType/{incident-id}
    @DeleteMapping("/remove-incidentType/{incidentType-id}")
    public void removeIncidentType(@PathVariable("incidentType-id") Long incidentTypeId) {
        typeIncidentService.removeIncident(incidentTypeId);
    }
    // http://localhost:8089/csers/incidentType/modify-type-incident
    @PutMapping("/modify-type-incident")
    public TypeIncident modifyTypeIncident(@RequestBody TypeIncident typeIncident) {
        Long typeIncidentId = typeIncident.getIdTypeIncident();
        TypeIncident existingTypeIncident = typeIncidentService.retrieveType(typeIncidentId);

        if (typeIncident.getNomTypeIncident() != null) {
            existingTypeIncident.setNomTypeIncident(typeIncident.getNomTypeIncident());
        }
        if (typeIncident.getDescription() != null) {
            existingTypeIncident.setDescription(typeIncident.getDescription());
        }
        if (typeIncident.getNiveauRisque() != 0) {
            existingTypeIncident.setNiveauRisque(typeIncident.getNiveauRisque());
        }
        if (typeIncident.getPlanUrgence() != null) {
            existingTypeIncident.setPlanUrgence(typeIncident.getPlanUrgence());
        }

        typeIncidentService.modifyIncidentType(existingTypeIncident);
        return existingTypeIncident;
    }

}
