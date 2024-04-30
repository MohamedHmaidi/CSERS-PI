package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IIncidentService {
    public List<Incident> retrieveAllIncident();
    public Incident retrieveIncident(Long incidentId);
    public Incident addIncident(Incident c);
    public void removeIncident(Long IncidentId);
    public Incident modifyIncident(Incident incident);

    public Map<Date, Integer> countIncidentsPerDay();
    public List<Object[]> countIncidentsByType();
}
