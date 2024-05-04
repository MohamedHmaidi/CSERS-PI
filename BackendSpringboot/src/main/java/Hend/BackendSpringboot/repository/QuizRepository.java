package Hend.BackendSpringboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import Hend.BackendSpringboot.entity.Quiz;
import Hend.BackendSpringboot.entity.TrainingContent;


public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByTrainingContent(TrainingContent trainingContent);

    @Query("SELECT q.type FROM Quiz q GROUP BY q.type ORDER BY COUNT(q) DESC LIMIT 1")
    String findMostPopularQuizType();


    @Query("SELECT COUNT(q) FROM Quiz q")
    long getTotalQuizzesCount();

    @Query("SELECT AVG(q.passingScore) FROM Quiz q")
    double getAverageQuizScore();
}