package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Ressource;
import Hend.BackendSpringboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RessourceRepository extends JpaRepository<Ressource,Long> {
}
