package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Claim;

public interface IArtificialResponseSerice {
    public String generateResponse(Claim claim);
    public Claim.ClassificationType generateClassification(Claim claim);
    public String correctSpelling(Claim claim);
}
