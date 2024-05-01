package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.entity.TypeIncident;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.IncidentRepository;
import Hend.BackendSpringboot.repository.IncidentTypeRepository;
import Hend.BackendSpringboot.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class IncidentServiceImp implements IIncidentService{

    private final IncidentRepository incidentRepository;
    private final IncidentTypeRepository typeIncidentRepository;
    private final UserRepository userRepository;


    public IncidentServiceImp(IncidentRepository incidentRepository, IncidentTypeRepository typeIncidentRepository, UserRepository userRepository) {
        this.incidentRepository = incidentRepository;
        this.typeIncidentRepository = typeIncidentRepository;
        this.userRepository = userRepository;
    }




    @Override
    public Incident addIncident(Incident i) {

        i.setUser(userRepository.findById(1).orElse(null));
        TypeIncident typeIncident = typeIncidentRepository.findById(i.getTypeIncident().getIdTypeIncident()).orElse(null);
        // Set the TypeIncident for the Incident
        i.setTypeIncident(typeIncident);

        return incidentRepository.save(i);
    }
    @Override
    public List<Incident> retrieveAllIncident() {
        return incidentRepository.findAll();
    }

    @Override
    public Incident retrieveIncident(Long incidentId) {
        return incidentRepository.findById(incidentId).orElse(null);
    }

    @Override
    public void removeIncident(Long incidentId) {
        incidentRepository.deleteById(incidentId);
    }

    @Override
    public Incident modifyIncident(Incident incident) {
        return incidentRepository.save(incident);
    }
}
