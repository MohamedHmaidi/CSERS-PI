package Hend.BackendSpringboot.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class MembreDTO {

    private Long idMembre;

    private byte[] imageFile;
    private String imageName;
    private String poste;
    private String number;
    private String competencesTechniques;
    private String certifications;
    private int experience;
    private Long equipeInterventionId;

    private String firstname;
    private String lastname;
    private String email;

    // Constructors
    public MembreDTO() {
    }

    public MembreDTO(Long idMembre, byte[] imageFile,String imageName, String poste, String number,
                     String competencesTechniques, String certifications, int experience, Long equipeInterventionId) {
        this.idMembre = idMembre;
        this.imageFile = imageFile;
        this.imageName = imageName;
        this.poste = poste;
        this.number = number;
        this.competencesTechniques = competencesTechniques;
        this.certifications = certifications;
        this.experience = experience;
        this.equipeInterventionId = equipeInterventionId;
    }


    // Getters and Setters
    public Long getIdMembre() {
        return idMembre;
    }

    public void setIdMembre(Long idMembre) {
        this.idMembre = idMembre;
    }

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCompetencesTechniques() {
        return competencesTechniques;
    }

    public void setCompetencesTechniques(String competencesTechniques) {
        this.competencesTechniques = competencesTechniques;
    }

    public String getCertifications() {
        return certifications;
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public Long getEquipeInterventionId() {
        return equipeInterventionId;
    }

    public void setEquipeInterventionId(Long equipeInterventionId) {
        this.equipeInterventionId = equipeInterventionId;
    }

    public byte[] getImageFile() {
        return imageFile;
    }

    public void setImageFile(byte[] imageFile) {
        this.imageFile = imageFile;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

