package tn.esprit.pitraining.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.pitraining.entities.Quiz;
import tn.esprit.pitraining.entities.QuizQuestion;
import tn.esprit.pitraining.entities.TrainingContent;
import tn.esprit.pitraining.repositories.QuizRepository;
import tn.esprit.pitraining.services.TrainingContentService;


import java.util.List;
import java.util.Optional;

@Service // Mark as a Spring service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;

    private final TrainingContentService trainingContentService;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, TrainingContentService trainingContentService) {
        this.quizRepository = quizRepository;
        this.trainingContentService = trainingContentService;
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }


    @Override
    public List<Quiz> getQuizzesByTrainingContentId(Long trainingContentId) {
        // Retrieve TrainingContent from the service, handle the Optional
        TrainingContent trainingContent = trainingContentService.findById(trainingContentId)
                .orElseThrow(() -> new IllegalArgumentException("Training content not found for ID: " + trainingContentId));
        // Now that you have a TrainingContent instance, pass it to findByTrainingContent
        return quizRepository.findByTrainingContent(trainingContent);
    }

    @Override
    public Long getTrainingContentIdByQuizId(Long quizId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();
            TrainingContent trainingContent = quiz.getTrainingContent();
            if (trainingContent != null) {
                return trainingContent.getId(); // Retrieve training_content_id
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Training content not found for Quiz ID: " + quizId);
    }



    @Override
    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    @Override
    public Quiz saveQuiz(Quiz quiz) {
        if (quiz.getQuestions() != null && !quiz.getQuestions().isEmpty()) {
            for (QuizQuestion question : quiz.getQuestions()) {
                question.setQuiz(quiz);
            }
        }

        // Fetch the TrainingContent (assuming you have the trainingContentService)
        Optional<TrainingContent> optionalTrainingContent = trainingContentService.findById(quiz.getTrainingContentId());

        // Check if TrainingContent exists and set the association
        if (optionalTrainingContent.isPresent()) {
            TrainingContent trainingContent = optionalTrainingContent.get();
            quiz.setTrainingContent(trainingContent); // Set the association
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Training Content not found");
        }

        return quizRepository.save(quiz); // Save with the established association
    }



    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        Optional<Quiz> existingQuiz = quizRepository.findById(id);
        if (existingQuiz.isPresent()) {
            Quiz quizToUpdate = existingQuiz.get();

            quizToUpdate.setTitle(updatedQuiz.getTitle());
            quizToUpdate.setDescription(updatedQuiz.getDescription());
            quizToUpdate.setType(updatedQuiz.getType());
            quizToUpdate.setPassingScore(updatedQuiz.getPassingScore());

            // Explicitly handle the trainingContent association
            if (updatedQuiz.getTrainingContentId() != null) {
                Optional<TrainingContent> optionalTrainingContent = trainingContentService.findById(updatedQuiz.getTrainingContentId());
                if (optionalTrainingContent.isPresent()) {
                    quizToUpdate.setTrainingContent(optionalTrainingContent.get());
                } else {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Training Content not found");
                }
            } else {
                // If trainingContentId is null, you might want to:
                // 1. Keep the existing association
                // 2. Remove the association by setting quizToUpdate.setTrainingContent(null)
            }

            return quizRepository.save(quizToUpdate);
        } else {
            throw new ResourceNotFoundException("Quiz not found with ID: " + id);
        }
    }



    public class ResourceNotFoundException extends RuntimeException {

        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    @Override
    public String getMostPopularQuizType() {
        return quizRepository.findMostPopularQuizType();
    }


    @Override
    public long getTotalQuizzesCount() {
        return quizRepository.getTotalQuizzesCount();
    }

    @Override
    public double getAverageQuizScore() {
        return quizRepository.getAverageQuizScore();
    }
}
