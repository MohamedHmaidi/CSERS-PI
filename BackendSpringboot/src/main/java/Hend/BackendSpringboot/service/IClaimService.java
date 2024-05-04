package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Claim;

import java.util.List;
import java.util.Map;

public interface IClaimService {
    public List<Claim> retrieveAllClaims();
    public Claim retrieveClaim(Long claimId);
    public Claim addClaim(Claim c);
    public void removeClaim(Long claimId);
    public Claim modifyClaim(Claim claim);
    Map<Claim.ClaimType, Long> getClaimTypeStatistics();
    Map<Claim.ClassificationType, Long> getClaimClassStatistics();
    List<Claim> searchClaims(String searchText);

}
