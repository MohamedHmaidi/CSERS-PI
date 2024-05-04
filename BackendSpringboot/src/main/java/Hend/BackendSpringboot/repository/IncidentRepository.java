package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident,Long> {
    @Query("SELECT DATE(i.incidentDate), COUNT(i) FROM Incident i GROUP BY DATE(i.incidentDate)")
    List<Object[]> countIncidentsPerDay();

    @Query("SELECT i.typeIncident.nomTypeIncident, COUNT(i) FROM Incident i GROUP BY i.typeIncident.nomTypeIncident")
    List<Object[]> countIncidentsByType();


}
