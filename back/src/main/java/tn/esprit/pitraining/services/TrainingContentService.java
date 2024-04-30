package tn.esprit.pitraining.services;

import tn.esprit.pitraining.entities.TrainingContent;

import java.util.List;
import java.util.Optional;

public interface TrainingContentService {

    List<TrainingContent> getAllTrainingContent();

    Optional<TrainingContent> findById(Long id);

    Optional<TrainingContent> getTrainingContentById(Long id);

    TrainingContent createTrainingContent(TrainingContent trainingContent);

    TrainingContent updateTrainingContent(Long id, TrainingContent updatedTrainingContent);

    void deleteTrainingContent(Long id);
}