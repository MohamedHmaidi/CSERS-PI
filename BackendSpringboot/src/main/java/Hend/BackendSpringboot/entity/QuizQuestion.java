package Hend.BackendSpringboot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Lombok annotation for getters, setters, equals, and hashCode
@AllArgsConstructor // Lombok annotation for full constructor
@NoArgsConstructor // Lombok annotation for empty constructor
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text; // Question text

    @Lob // Large Object for potentially large amounts of text or images
    private String explanation; // Optional explanation for the answer

    @ManyToOne(fetch = FetchType.LAZY) // Many-to-One relationship with Quiz (lazy fetching)
    @JsonIgnore
    private Quiz quiz;

    // Added fields for different question types
    private String answerChoiceA; // For multiple choice or matching
    private String answerChoiceB; // For multiple choice or matching
    private String answerChoiceC; // For multiple choice or matching
    private String answerChoiceD; // For multiple choice
    private String correctAnswer; // For various question types

    // Additional fields for specific question types (e.g., essay)
    @Lob
    private String essayAnswerExample; // Example answer for essay questions

}
