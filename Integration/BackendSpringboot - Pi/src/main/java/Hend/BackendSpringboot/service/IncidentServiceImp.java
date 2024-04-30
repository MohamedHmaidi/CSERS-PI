package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.IncidentRepository;
import Hend.BackendSpringboot.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class IncidentServiceImp implements IIncidentService{

    @Autowired
    IncidentRepository incidentRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public Incident addIncident(Incident i) {

        i.setUser(userRepository.findById(1L).orElse(null));

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

    @Override
    public Map<Date, Integer> countIncidentsPerDay() {
        Map<Date, Integer> incidentsPerDay = new HashMap<>();
        List<Object[]> result = incidentRepository.countIncidentsPerDay();
        for (Object[] row : result) {
            Date date = (Date) row[0];
            int count = ((Number) row[1]).intValue();
            incidentsPerDay.put(date, count);
        }
        return incidentsPerDay;
    }

    public List<Object[]> countIncidentsByType() {
        return incidentRepository.countIncidentsByType();
    }


}
