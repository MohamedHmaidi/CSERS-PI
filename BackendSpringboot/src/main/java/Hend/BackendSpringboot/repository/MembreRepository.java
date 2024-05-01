package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Membre;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembreRepository extends JpaRepository<Membre, Long>, JpaSpecificationExecutor<Membre>{

    @Query("SELECT u.firstname, u.lastname, u.email, u.address, m.idMembre, m.poste, m.number, m.competencesTechniques, m.certifications, m.experience, m.equipeIntervention.idEquipe " +
            "FROM User u INNER JOIN Membre m ON u.id_user = m.user.id_user")
    List<Object[]> findAllMembreDetails();


    List<Membre> findByEquipeIntervention_IdEquipe(Long equipeInterventionId);

    List<Membre> findByPosteContainingIgnoreCase(String poste);

   // List<Membre> findAll(Specification<Membre> specification);
   @Query("SELECT m, u.firstname, u.lastname, u.email " +
           "FROM Membre m " +
           "JOIN m.user u " +
           "WHERE (:poste IS NULL OR m.poste = :poste) " +
           "AND (:competencesTechniques IS NULL OR m.competencesTechniques = :competencesTechniques) " +
           "AND (:certifications IS NULL OR m.certifications = :certifications)")
   List<Object[]> findAllMembres(String poste, String competencesTechniques, String certifications);


}


