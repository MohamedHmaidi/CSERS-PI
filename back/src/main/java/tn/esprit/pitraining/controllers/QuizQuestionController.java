package tn.esprit.pitraining.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pitraining.entities.QuizQuestion;
import tn.esprit.pitraining.services.QuizQuestionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes/{quizId}/questions") // Base path with placeholder for quiz ID
public class QuizQuestionController {

    private final QuizQuestionService quizQuestionService;

    @Autowired
    public QuizQuestionController(QuizQuestionService quizQuestionService) {
        this.quizQuestionService = quizQuestionService;
    }

    // Get all questions for a specific quiz
    @GetMapping
    public List<QuizQuestion> getQuestionsByQuizId(@PathVariable Long quizId) {
        return quizQuestionService.getQuestionsByQuizId(quizId); // Delegate to service method
    }

    // Get a specific quiz question by ID
    @GetMapping("/{id}")
    public Optional<QuizQuestion> getQuestionById(@PathVariable Long quizId, @PathVariable Long id) {
        return quizQuestionService.getQuestionById(quizId, id); // Delegate to service method
    }

    // Save a new question for a specific quiz
    @PostMapping
    public QuizQuestion createQuestion(@PathVariable Long quizId, @RequestBody QuizQuestion question) {
        return quizQuestionService.saveQuestion(quizId, question); // Delegate to service method
    }

    // Update a quiz question (replace entire question object)
    @PutMapping("/{id}")
    public QuizQuestion updateQuestion(@PathVariable Long quizId, @PathVariable Long id, @RequestBody QuizQuestion updatedQuestion) {
        return quizQuestionService.updateQuestion(quizId, id, updatedQuestion); // Delegate to service method
    }

    // Delete a quiz question by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Indicate successful deletion without content
    public void deleteQuestion(@PathVariable Long quizId, @PathVariable Long id) {
        quizQuestionService.deleteQuestion(quizId, id); // Delegate to service method
    }

    // Exception handler remains the same
}
