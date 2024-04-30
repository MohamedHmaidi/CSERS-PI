package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClaimRepository extends JpaRepository<Claim,Long> {
    Long countByClaimType(Claim.ClaimType type);
    Long countByClassification(Claim.ClassificationType type);
}
