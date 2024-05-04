package Hend.BackendSpringboot.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data // Lombok annotation for getters, setters, equals, and hashCode
@AllArgsConstructor // Lombok annotation for full constructor
@NoArgsConstructor // Lombok annotation for empty constructor
public class TrainingContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Using a generic "id" for the primary key

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "trainingContent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Quiz> quizzes;

//    @ManyToOne(fetch = FetchType.LAZY) // Optional Many-to-One with User (optional)
//    private User user; // User who created the training content (optional)

    @Enumerated(EnumType.STRING) // Store the actual enum value (e.g., "VIDEO")
    private TrainingContentType type; // Type of training content (e.g., VIDEO, DOCUMENT, PRESENTATION)

    @Column(nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now(); // Timestamp of creation

    // Additional attributes specific to training content
    private Boolean completed;
    private Integer estimatedTime; // Estimated time to complete the training content (in minutes)
    @Lob // Large Object for potentially large amounts of text or binary data
    private byte[] content; // Optional raw content for documents, presentations, or videos (implement specific storage strategy based on type)

    @Column(length = 500) // Optional limitation on URL length
    private String contentUrl; // Optional URL for external content

    // Additional fields for specific content types (e.g., video duration)
    private Integer videoDuration; // Duration of video content (in minutes)
}

enum TrainingContentType {
    VIDEO,
    DOCUMENT,
    PRESENTATION,
    EXTERNAL_URL
}
