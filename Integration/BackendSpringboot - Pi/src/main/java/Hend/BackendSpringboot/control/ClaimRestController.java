package Hend.BackendSpringboot.control;

import Hend.BackendSpringboot.entity.Claim;
import Hend.BackendSpringboot.service.IArtificialResponseSerice;
import Hend.BackendSpringboot.service.IClaimService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/claim")
public class ClaimRestController {
    IClaimService claimService;
    IArtificialResponseSerice aiResponseService;
    @GetMapping("/retrieve-all-claims")
    public List<Claim> getClaims() {
        List<Claim> listClaims = claimService.retrieveAllClaims();
        return listClaims;
    }
    @GetMapping("/retrieve-claim/{claim-id}")
    public Claim retrieveClaim(@PathVariable("claim-id") Long chId) {
        Claim claim = claimService.retrieveClaim(chId);
        return claim;
    }

    @PostMapping("/add-claim")
    public Claim addClaim(@RequestBody Claim c) {
        Claim.ClassificationType claimClass = aiResponseService.generateClassification(c);
        c.setClassification(claimClass);
        //Create Claim
        Claim claim = claimService.addClaim(c);

        //Automated Response
        aiResponseService.generateResponse(c);
        return claim;
    }


    @DeleteMapping("/remove-claim/{claim-id}")
    public void removeClaim(@PathVariable("claim-id") Long chId) {
        claimService.removeClaim(chId);
    }


    @PutMapping("/modify-claim")
    public Claim modifyClaim(@RequestBody Claim c) {
        Claim claim = claimService.modifyClaim(c);
        return claim;
    }

    @GetMapping("/correct-claim/{claim-id}")
    public String correctClaimDescription(@PathVariable("claim-id") Long chId) {
        Claim c = claimService.retrieveClaim(chId);
        String correctedText = aiResponseService.correctSpelling(c);
        return correctedText;
    }

    @GetMapping("/claim-type-statistics")
    public Map<Claim.ClaimType, Long> getClaimTypeStatistics() {
        return claimService.getClaimTypeStatistics();
    }

    @GetMapping("/claim-class-statistics")
    public Map<Claim.ClassificationType, Long> getClaimClassStatistics() {
        return claimService.getClaimClassStatistics();
    }

    @GetMapping("/search-claims/{searchText}")
    public List<Claim> searchClaims(@PathVariable("searchText") String searchText) {
        List<Claim> searchResults = claimService.searchClaims(searchText);
        return searchResults;
    }
}
