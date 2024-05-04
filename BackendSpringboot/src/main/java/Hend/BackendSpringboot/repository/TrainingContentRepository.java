package Hend.BackendSpringboot.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import Hend.BackendSpringboot.entity.TrainingContent;

public interface TrainingContentRepository extends JpaRepository<TrainingContent, Long> {
}
