package Hend.BackendSpringboot.entity;


import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class MembreSpecification {

    public static Specification<Membre> filterMembre(String poste, String competencesTechniques, String certifications) {
        return (root, query, criteriaBuilder) -> {
            Predicate postePredicate =
                    criteriaBuilder.like(root.get("poste"), StringUtils.isBlank(poste)
                            ? likePattern("") : poste);
            Predicate competencesTechniquesPredicate =
                    criteriaBuilder.like(root.get("competencesTechniques"), StringUtils.isBlank(competencesTechniques)
                            ? likePattern("") : competencesTechniques);
            Predicate certificationsPredicate =
                    criteriaBuilder.like(root.get("certifications"), StringUtils.isBlank(certifications)
                            ? likePattern("") : certifications);
            return criteriaBuilder.and(postePredicate, competencesTechniquesPredicate, certificationsPredicate);
        };
    }

    private static String likePattern(String value) {
        return "%" + value + "%";
    }
}
