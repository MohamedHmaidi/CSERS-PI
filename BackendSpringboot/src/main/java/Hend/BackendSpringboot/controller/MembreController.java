package Hend.BackendSpringboot.controller;

import Hend.BackendSpringboot.DTOs.MembreDTO;
import Hend.BackendSpringboot.entity.Membre;
import Hend.BackendSpringboot.service.MembreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/membres")
@CrossOrigin(origins = "http://localhost:4200")
public class MembreController {

    private static final String UPLOAD_DIR = "C:/Users/hend8/Desktop/BackendSpringboot/src/main/resources/static/Files/";


    private final MembreService membreService;

    private final ResourceLoader resourceLoader;

    public MembreController(MembreService membreService, ResourceLoader resourceLoader) {
        this.membreService = membreService;
        this.resourceLoader = resourceLoader;
    }

    @Autowired
    public MembreController(MembreService membreService) {
        this.membreService = membreService;
        resourceLoader = null;
    }

    @GetMapping("/getallmembre")
    public ResponseEntity<List<MembreDTO>> getAllMembres() {
        List<MembreDTO> membres = membreService.getAllMembres();
        return ResponseEntity.ok(membres);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Map<String, Object>>> getAllMembreDetails() {
        List<Map<String, Object>> membres = membreService.getAllMembreDetails();
        return ResponseEntity.ok().body(membres);
    }



    @GetMapping("/search")
    public ResponseEntity<List<MembreDTO>> getMembress(
            @RequestParam(required = false) String poste,
            @RequestParam(required = false) String competencesTechniques,
            @RequestParam(required = false) String certifications
    ) {
        List<MembreDTO> membres = membreService.findAllMembress(poste, competencesTechniques, certifications);
        return ResponseEntity.ok(membres);
    }


    @GetMapping("/recommend-teams")
    public ResponseEntity<List<String>> getRecommendedTeams(@RequestParam String poste) {
        List<String> recommendedTeams = membreService.recommendTeams(poste);
        return ResponseEntity.ok(recommendedTeams);
    }

    @GetMapping("/getMembreById/{id}")
    public ResponseEntity<MembreDTO> getMembreById(@PathVariable Long id) {
        MembreDTO membre = membreService.getMembreById(id);
        return ResponseEntity.ok(membre);
    }

    @GetMapping("/byEquipeId/{equipeId}")
    public ResponseEntity<List<MembreDTO>> getMembersByEquipeId(@PathVariable Long equipeId) {
        List<MembreDTO> membres = membreService.getMembersByEquipeId(equipeId);
        return ResponseEntity.ok(membres);
    }

    @PutMapping("/{memberId}/updateEquipe/{equipeName}")
    public ResponseEntity<String> updateMembreEquipe(@PathVariable Long memberId, @PathVariable String equipeName) {
        try {
            membreService.updateMembreEquipe(memberId, equipeName);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating member's equipe.");
        }
    }


    @PostMapping("/create")
    public ResponseEntity<MembreDTO> createMembre(@RequestBody MembreDTO membreDTO) {
        MembreDTO createdMembre = membreService.createMembre(membreDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMembre);
    }

    @PostMapping("/createmembre")
    public ResponseEntity<MembreDTO> createMembre(
            @RequestParam("poste") String poste,
            @RequestParam("number") String number,
            @RequestParam("competencesTechniques") String competencesTechniques,
            @RequestParam("certifications") String certifications,
            @RequestParam("experience") int experience,
            @RequestParam("equipeInterventionId") Long equipeInterventionId,
            @RequestParam("imageFile") MultipartFile imageFile
    ) {
        try {
            String originalFileName = imageFile.getOriginalFilename();
            String newFileName = originalFileName + "_"  + System.currentTimeMillis();
            MembreDTO membreDTO = new MembreDTO(null, null, null,poste, number,
                    competencesTechniques, certifications, experience, equipeInterventionId);


            // Call service method to create member with image
            MembreDTO createdMembre = membreService.createMembreWithImage(membreDTO, imageFile, newFileName);

            // Remove the imageFile field from the response
            createdMembre.setImageFile(null);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdMembre);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/searchByPoste")
    public ResponseEntity<List<MembreDTO>> searchByPoste(@RequestParam String poste) {
        List<MembreDTO> membres = membreService.searchByPoste(poste);
        return ResponseEntity.ok(membres);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<MembreDTO> updateMembre(@PathVariable Long id, @RequestBody MembreDTO membreDTO) {
        try {
            MembreDTO updatedMembre = membreService.updateMembre(id, membreDTO);
            return ResponseEntity.ok(updatedMembre);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMembre(@PathVariable Long id) {
        membreService.deleteMembre(id);
        return ResponseEntity.ok("L'équipe avec l'ID " + id + " a été supprimée avec succès.");
    }
}

