package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.TrainingContent;


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