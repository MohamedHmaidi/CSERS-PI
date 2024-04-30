package tn.esprit.pitraining.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pitraining.entities.TrainingContent;
import tn.esprit.pitraining.services.TrainingContentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/training-content")
public class TrainingContentController {

    private final TrainingContentService trainingContentService;

    @Autowired
    public TrainingContentController(TrainingContentService trainingContentService) {
        this.trainingContentService = trainingContentService;
    }

    // Get all training content
    @GetMapping
    public List<TrainingContent> getAllTrainingContent() {
        return trainingContentService.getAllTrainingContent();
    }

    // Get a specific training content by ID
    @GetMapping("/{id}")
    public Optional<TrainingContent> getTrainingContentById(@PathVariable Long id) {
        return trainingContentService.getTrainingContentById(id);
    }

    // Save a new training content
    @PostMapping
    public TrainingContent createTrainingContent(@RequestBody TrainingContent trainingContent) {
        return trainingContentService.createTrainingContent(trainingContent);
    }

    // Update a training content
    @PutMapping("/{id}")
    public TrainingContent updateTrainingContent(@PathVariable Long id, @RequestBody TrainingContent updatedTrainingContent) {
        return trainingContentService.updateTrainingContent(id, updatedTrainingContent);
    }

    // Delete a training content by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrainingContent(@PathVariable Long id) {
        trainingContentService.deleteTrainingContent(id);
    }

}
