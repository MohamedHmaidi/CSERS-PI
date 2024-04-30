package tn.esprit.pitraining.services;

import tn.esprit.pitraining.entities.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizService {

    List<Quiz> getAllQuizzes();

    Optional<Quiz> getQuizById(Long id);

    List<Quiz> getQuizzesByTrainingContentId(Long trainingContentId); // New method

    Quiz saveQuiz(Quiz quiz);

    Quiz updateQuiz(Long id, Quiz updatedQuiz);

    void deleteQuiz(Long id);

    // New statistics-related methods
    String getMostPopularQuizType();

    long getTotalQuizzesCount();

    double getAverageQuizScore();
}
