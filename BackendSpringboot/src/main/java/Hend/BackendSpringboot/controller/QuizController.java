package Hend.BackendSpringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import Hend.BackendSpringboot.entity.Quiz;
import Hend.BackendSpringboot.service.QuizService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quizzes") // Base path for all quiz-related requests
public class QuizController {

    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    // Get all quizzes
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes(); // Delegate to service method
    }

    // Get a specific quiz by ID
    @GetMapping("/{id}")
    public Optional<Quiz> getQuizById(@PathVariable Long id) {
        return quizService.getQuizById(id); // Delegate to service method
    }

    @GetMapping("/ByTrainingContent/{trainingContentId}")
    public List<Quiz> getQuizzesByTrainingContentId(@PathVariable Long trainingContentId) {
        return quizService.getQuizzesByTrainingContentId(trainingContentId);
    }

    // Save a new quiz
    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.saveQuiz(quiz); // Delegate to service method
    }

    // Update a quiz (replace entire quiz object)
    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody Quiz updatedQuiz) {
        return quizService.updateQuiz(id, updatedQuiz); // Delegate to service method
    }

    // Get the training content ID associated with a quiz by quiz ID
    @GetMapping("/{quizId}/trainingContentId")
    public Long getTrainingContentIdByQuizId(@PathVariable Long quizId) {
        return quizService.getTrainingContentIdByQuizId(quizId);
    }


    // Endpoint to get the most popular quiz type
    @GetMapping("/statistics/mostPopularQuizType")
    public String getMostPopularQuizType() {
        return quizService.getMostPopularQuizType();
    }

    // Endpoint to get the total number of quizzes
    @GetMapping("/statistics/totalQuizzesCount")
    public long getTotalQuizzesCount() {
        return quizService.getTotalQuizzesCount();
    }

    // Endpoint to get the average quiz score
    @GetMapping("/statistics/averageQuizScore")
    public double getAverageQuizScore() {
        return quizService.getAverageQuizScore();
    }




    // Delete a quiz by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Indicate successful deletion without content
    public void deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id); // Delegate to service method
    }

    // Custom exception handler for ResourceNotFoundException (remains the same)
}
