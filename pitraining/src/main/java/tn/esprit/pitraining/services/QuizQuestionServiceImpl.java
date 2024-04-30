package tn.esprit.pitraining.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pitraining.entities.Quiz;
import tn.esprit.pitraining.entities.QuizQuestion;
import tn.esprit.pitraining.repositories.QuizQuestionRepository;

import tn.esprit.pitraining.repositories.QuizRepository;



import java.util.List;
import java.util.Optional;

@Service
public class QuizQuestionServiceImpl implements QuizQuestionService {

    private final QuizQuestionRepository quizQuestionRepository;

    private final QuizRepository quizRepository;

    @Autowired
    public QuizQuestionServiceImpl(QuizQuestionRepository quizQuestionRepository, QuizRepository quizRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public List<QuizQuestion> getQuestionsByQuizId(Long quizId) {
        return quizQuestionRepository.findByQuizId(quizId);
    }

    @Override
    public Optional<QuizQuestion> getQuestionById(Long quizId, Long id) {
        return quizQuestionRepository.findByIdAndQuizId(id, quizId);
    }

    // ... In your QuizQuestionServiceImpl
    @Override
    public QuizQuestion saveQuestion(Long quizId, QuizQuestion question) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(/* Handle not found */);
        question.setQuiz(quiz); // Establish the bidirectional relationship
        return quizQuestionRepository.save(question);
    }


    @Override
    public QuizQuestion updateQuestion(Long quizId, Long id, QuizQuestion updatedQuestion) {
        Optional<QuizQuestion> existingQuestion = quizQuestionRepository.findById(id); // No need to fetch by quizId here

        if (existingQuestion.isPresent()) {
            QuizQuestion questionToUpdate = existingQuestion.get();

            // Update properties from 'updatedQuestion':
            questionToUpdate.setText(updatedQuestion.getText());
            questionToUpdate.setExplanation(updatedQuestion.getExplanation());
            questionToUpdate.setAnswerChoiceA(updatedQuestion.getAnswerChoiceA());
            questionToUpdate.setAnswerChoiceB(updatedQuestion.getAnswerChoiceB());
            questionToUpdate.setAnswerChoiceC(updatedQuestion.getAnswerChoiceC());
            questionToUpdate.setAnswerChoiceD(updatedQuestion.getAnswerChoiceD());
            questionToUpdate.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
            // ... (update other properties similarly)

            // No need to set ID; it's already present
            return quizQuestionRepository.save(questionToUpdate);
        } else {
            throw new ResourceNotFoundException("Quiz question not found with ID: " + id + " for quiz: " + quizId);
        }
    }

    public class ResourceNotFoundException extends RuntimeException {

        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    @Override
    @Transactional
    public void deleteQuestion(Long quizId, Long id) {
        quizQuestionRepository.deleteByIdAndQuizId(id, quizId);
    }

}
