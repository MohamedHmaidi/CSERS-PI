package tn.esprit.pitraining.services;

import tn.esprit.pitraining.entities.QuizQuestion;

import java.util.List;
import java.util.Optional;

public interface QuizQuestionService {

    List<QuizQuestion> getQuestionsByQuizId(Long quizId);

    Optional<QuizQuestion> getQuestionById(Long quizId, Long id);

    QuizQuestion saveQuestion(Long quizId, QuizQuestion question);

    QuizQuestion updateQuestion(Long quizId, Long id, QuizQuestion updatedQuestion);

    void deleteQuestion(Long quizId, Long id);
}
