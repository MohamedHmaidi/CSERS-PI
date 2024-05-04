package Hend.BackendSpringboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Hend.BackendSpringboot.entity.TrainingContent;
import Hend.BackendSpringboot.repository.TrainingContentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TrainingContentServiceImpl implements TrainingContentService {

    private final TrainingContentRepository trainingContentRepository;

    @Autowired
    public TrainingContentServiceImpl(TrainingContentRepository trainingContentRepository) {
        this.trainingContentRepository = trainingContentRepository;
    }


    @Override
    public Optional<TrainingContent> findById(Long id) {
        return trainingContentRepository.findById(id);
    }

    @Override
    public List<TrainingContent> getAllTrainingContent() {
        return trainingContentRepository.findAll();
    }

    @Override
    public Optional<TrainingContent> getTrainingContentById(Long id) {
        return trainingContentRepository.findById(id);
    }

    @Override
    public TrainingContent createTrainingContent(TrainingContent trainingContent) {
        // Handle content based on type (e.g., validate content or contentUrl)
        return trainingContentRepository.save(trainingContent);
    }

    @Override
    public TrainingContent updateTrainingContent(Long id, TrainingContent updatedTrainingContent) {
        Optional<TrainingContent> existingContent = trainingContentRepository.findById(id);
        if (existingContent.isPresent()) {
            updatedTrainingContent.setId(id); // Set the ID of the updated training content
            // Handle content based on type (e.g., validate content or contentUrl)
            return trainingContentRepository.save(updatedTrainingContent);
        } else {
            throw new ResourceNotFoundException("Training content not found with ID: " + id);
        }
    }

    public class ResourceNotFoundException extends RuntimeException {

        public ResourceNotFoundException(String message) {
            super(message);
        }
    }


    @Override
    public void deleteTrainingContent(Long id) {
        trainingContentRepository.deleteById(id);
    }
}
