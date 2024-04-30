package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.TypeIncident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentTypeRepository extends JpaRepository <TypeIncident,Long> {
}