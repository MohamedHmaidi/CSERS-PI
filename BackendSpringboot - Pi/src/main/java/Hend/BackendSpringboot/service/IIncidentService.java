package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.*;

import java.util.List;

public interface IIncidentService {
    public List<Incident> retrieveAllIncident();
    public Incident retrieveIncident(Long incidentId);
    public Incident addIncident(Incident c);
    public void removeIncident(Long IncidentId);
    public Incident modifyIncident(Incident incident);
}
