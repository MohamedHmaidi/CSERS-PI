package Hend.BackendSpringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import Hend.BackendSpringboot.entity.QuizQuestion;

import java.util.List;
import java.util.Optional;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    // Find all questions by quiz ID (based on the ManyToOne relationship with Quiz)
    List<QuizQuestion> findByQuizId(Long quizId);

    // Find a question by ID and associated quiz ID (based on ID and ManyToOne relationship)
    Optional<QuizQuestion> findByIdAndQuizId(Long id, Long quizId);

    // Delete a question by ID and associated quiz ID (based on ID and ManyToOne relationship)
    void deleteByIdAndQuizId(Long id, Long quizId);
}
