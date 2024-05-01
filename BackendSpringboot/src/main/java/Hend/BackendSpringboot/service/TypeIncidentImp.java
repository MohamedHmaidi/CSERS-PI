package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.TypeIncident;
import Hend.BackendSpringboot.repository.IncidentTypeRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class TypeIncidentImp implements ITypeIncidentService{
    @Autowired
    IncidentTypeRepository incidentTypeRepository;
    @Override
    public List<TypeIncident> retrieveAllIncidentType() {
        return incidentTypeRepository.findAll();
    }

    @Override
    public TypeIncident retrieveType(Long TypeId) {
        return incidentTypeRepository.findById(TypeId).orElse(null);
    }

    @Override
    public TypeIncident addIncidentType(TypeIncident c) {
        return incidentTypeRepository.save(c);
    }

    @Override
    public void removeIncident(Long IncidentTypeId) {
        incidentTypeRepository.deleteById(IncidentTypeId);
    }

    @Override
    public TypeIncident modifyIncidentType(TypeIncident incidentType) {
        return incidentTypeRepository.save(incidentType);
    }
}
