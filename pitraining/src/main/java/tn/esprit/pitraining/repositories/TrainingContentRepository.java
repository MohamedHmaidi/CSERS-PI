package tn.esprit.pitraining.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pitraining.entities.TrainingContent;

public interface TrainingContentRepository extends JpaRepository<TrainingContent, Long> {
}
