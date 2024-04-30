package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Claim;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.ClaimRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ClaimServiceImpl implements IClaimService{
    ClaimRepository claimRepository;
    public List<Claim> retrieveAllClaims() {
        return claimRepository.findAll();
    }
    public Claim retrieveClaim(Long claimId) {
        return claimRepository.findById(claimId).get();
    }
    public Claim addClaim(Claim c) {
        return claimRepository.save(c);
    }
    public void removeClaim(Long claimId) {
        claimRepository.deleteById(claimId);
    }
    public Claim modifyClaim(Claim claim) {
        return claimRepository.save(claim);
    }

    @Override
    public Map<Claim.ClaimType, Long> getClaimTypeStatistics() {
        Map<Claim.ClaimType, Long> claimStatistics = new HashMap<>();

        for (Claim.ClaimType type : Claim.ClaimType.values()) {
            Long count = claimRepository.countByClaimType(type);
            claimStatistics.put(type, count);
        }

        return claimStatistics;
    }

    @Override
    public Map<Claim.ClassificationType, Long> getClaimClassStatistics() {
        Map<Claim.ClassificationType, Long> claimStatistics = new HashMap<>();

        for (Claim.ClassificationType type : Claim.ClassificationType.values()) {
            Long count = claimRepository.countByClassification(type);
            claimStatistics.put(type, count);
        }

        return claimStatistics;
    }
    @Override
    public List<Claim> searchClaims(String searchText) {
        Claim claim = new Claim();
        claim.setTitle(searchText);
        User existingUser = new User();
        existingUser.setFirstname(searchText);
        existingUser.setLastname(searchText);
        claim.setUser(existingUser); // Assuming User has firstname and lastname fields
        //ExampleMatcher matcher = ExampleMatcher.matching()
          //      .withMatcher("title", match -> match.contains().ignoreCase());
                //.withMatcher("user.firstname", match -> match.contains().ignoreCase())
                //.withMatcher("user.lastname", match -> match.contains().ignoreCase());
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example<Claim> example = Example.of(claim, matcher);
        return claimRepository.findAll(example);
    }
}
