package Hend.BackendSpringboot.service;


import Hend.BackendSpringboot.entity.TypeIncident;

import java.util.List;

public interface ITypeIncidentService {
    public List<TypeIncident> retrieveAllIncidentType();
    public TypeIncident retrieveType(Long TypeId);
    public TypeIncident addIncidentType(TypeIncident c);
    public void removeIncident(Long IncidentTypeId);
    public TypeIncident modifyIncidentType(TypeIncident incidentType);

}
