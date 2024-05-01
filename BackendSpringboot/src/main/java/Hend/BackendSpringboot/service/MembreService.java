package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.DTOs.MembreDTO;
import Hend.BackendSpringboot.entity.EquipeIntervention;
import Hend.BackendSpringboot.entity.Membre;
import Hend.BackendSpringboot.entity.MembreSpecification;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.EquipeInterventionRepository;
import Hend.BackendSpringboot.repository.MembreRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MembreService {

    private final MembreRepository membreRepository;
    private final EquipeInterventionRepository equipeInterventionRepository;

    private final Map<String, List<String>> postToTeamsMapping = new HashMap<>();

    @Autowired
    public MembreService(MembreRepository membreRepository, EquipeInterventionRepository equipeInterventionRepository) {
        this.membreRepository = membreRepository;
        this.equipeInterventionRepository = equipeInterventionRepository;
        initializePostToTeamsMapping();
    }
    // Method to initialize the mapping between post names and recommended teams
    private void initializePostToTeamsMapping() {
        postToTeamsMapping.put("Fire Chief", List.of("Fire Response Team", "Disaster Management Team"));
        postToTeamsMapping.put("Firefighter", List.of("Fire Response Team", "Disaster Management Team"));
        postToTeamsMapping.put("Fire Safety Officer", List.of("Fire Response Team", "Disaster Management Team"));
        postToTeamsMapping.put("Registered Nurse", List.of("Medical Staff Team", "Health and Medical Services Team"));
        postToTeamsMapping.put("Medical Technician", List.of("Medical Staff Team", "Health and Medical Services Team"));
        postToTeamsMapping.put("Doctor", List.of("Medical Staff Team", "Health and Medical Services Team"));
        postToTeamsMapping.put("Security Supervisor", List.of("Security Team", "Safety Team"));
        postToTeamsMapping.put("Security Officer", List.of("Security Team", "Safety Team"));
        postToTeamsMapping.put("CCTV Operator", List.of("Security Team", "Safety Team"));
        postToTeamsMapping.put("Police", List.of("Security Team", "Safety Team"));
        // Add more mappings as needed
    }

    // Method to recommend teams based on the post name
    public List<String> recommendTeams(String postName) {
        return postToTeamsMapping.getOrDefault(postName, Collections.emptyList());
    }

    public List<MembreDTO> getAllMembres() {
        List<Membre> membres = membreRepository.findAll();
        return membres.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<Membre> findAllMembres(String poste, String competencesTechniques, String certifications) {
        final Specification<Membre> specification =
                MembreSpecification.filterMembre(poste, competencesTechniques, certifications);
        final List<Membre> membres = membreRepository.findAll(specification);
        return membres;
    }

    public List<MembreDTO> findAllMembress(String poste, String competencesTechniques, String certifications) {
        List<Object[]> result = membreRepository.findAllMembres(poste, competencesTechniques, certifications);
        return result.stream()
                .map(obj -> {
                    Membre membre = (Membre) obj[0];
                    String firstname = (String) obj[1];
                    String lastname = (String) obj[2];
                    String email = (String) obj[3];

                    // Create MembreDTO object and set values
                    MembreDTO membreDTO = new MembreDTO();
                    BeanUtils.copyProperties(membre, membreDTO);
                    membreDTO.setFirstname(firstname);
                    membreDTO.setLastname(lastname);
                    membreDTO.setEmail(email);

                    return membreDTO;
                })
                .collect(Collectors.toList());
    }


    public List<MembreDTO> searchByPoste(String poste) {
        List<Membre> membres = membreRepository.findByPosteContainingIgnoreCase(poste);
        return membres.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    public MembreDTO getMembreById(Long id) {
        Optional<Membre> optionalMembre = membreRepository.findById(id);
        if (optionalMembre.isPresent()) {
            Membre membre = optionalMembre.get();
            MembreDTO membreDTO = new MembreDTO();
            membreDTO.setIdMembre(membre.getIdMembre());
            membreDTO.setImageFile(membre.getImageFile());
            //membreDTO.setImageName(membre.getImageName());
            membreDTO.setPoste(membre.getPoste());
            membreDTO.setNumber(membre.getNumber());
            membreDTO.setCompetencesTechniques(membre.getCompetencesTechniques());
            membreDTO.setCertifications(membre.getCertifications());
            membreDTO.setExperience(membre.getExperience());
            //membreDTO.setEquipeInterventionId(membre.getEquipeInterventionId());

            // Populate firstname, lastname, and email from associated User entity
            User user = membre.getUser();
            if (user != null) {
                membreDTO.setFirstname(user.getFirstname());
                membreDTO.setLastname(user.getLastname());
                membreDTO.setEmail(user.getEmail());
            }

            return membreDTO;
        }
        throw new RuntimeException("Membre not found with ID: " + id);
    }

    public List<MembreDTO> getMembersByEquipeId(Long equipeId) {
        List<Membre> membres = membreRepository.findByEquipeIntervention_IdEquipe(equipeId);
        return membres.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    public MembreDTO createMembre(MembreDTO membreDTO) {
        Membre membre = convertToEntity(membreDTO);
        Membre savedMembre = membreRepository.save(membre);
        return convertToDTO(savedMembre);
    }

    public MembreDTO createMembreWithImage(MembreDTO membreDTO, MultipartFile imageFile, String newFileName) throws IOException {
        try {
            Membre membre = convertToEntity(membreDTO);

            if (imageFile != null && !imageFile.isEmpty()) {
                byte[] imageBytes = imageFile.getBytes();
                membre.setImageFile(imageBytes);
            }

            membreDTO.setImageName(newFileName);

            Membre savedMembre = membreRepository.save(membre);

            membreDTO.setIdMembre(savedMembre.getIdMembre());
        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }
        return membreDTO;
    }



    public MembreDTO updateMembre(Long id, MembreDTO membreDTO) {
        Optional<Membre> optionalMembre = membreRepository.findById(id);
        if (optionalMembre.isPresent()) {
            Membre existingMembre = optionalMembre.get();

            // Update the equipeInterventionId if provided
            if (membreDTO.getEquipeInterventionId() != null) {
                EquipeIntervention equipeIntervention = equipeInterventionRepository.findById(membreDTO.getEquipeInterventionId())
                        .orElseThrow(() -> new IllegalArgumentException("EquipeIntervention with ID " + membreDTO.getEquipeInterventionId() + " not found"));
                existingMembre.setEquipeIntervention(equipeIntervention);
            }

            // Save the updated Membre
            Membre updatedMembre = membreRepository.save(existingMembre);
            return convertToDTO(updatedMembre);
        }
        throw new RuntimeException("Membre not found with ID: " + id);
    }

    public void updateMembreEquipe(Long memberId, String equipeName) {
        Optional<Membre> optionalMembre = membreRepository.findById(memberId);
        if (optionalMembre.isPresent()) {
            Membre membre = optionalMembre.get();
            EquipeIntervention equipeIntervention = equipeInterventionRepository.findByNomEquipe(equipeName);
            if (equipeIntervention != null) {
                membre.setEquipeIntervention(equipeIntervention);
                membreRepository.save(membre);
            } else {
                throw new IllegalArgumentException("Equipe with name " + equipeName + " not found");
            }
        } else {
            throw new IllegalArgumentException("Membre not found with ID: " + memberId);
        }
    }


    public List<Map<String, Object>> getAllMembreDetails() {
        List<Object[]> data = membreRepository.findAllMembreDetails();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            Map<String, Object> map = new HashMap<>();
            map.put("firstname", row[0]);
            map.put("lastname", row[1]);
            map.put("email", row[2]);
            map.put("address", row[3]);
            map.put("idMembre", row[4]);
            map.put("poste", row[5]);
            map.put("number", row[6]);
            map.put("competencesTechniques", row[7]);
            map.put("certifications", row[8]);
            map.put("experience", row[9]);
            map.put("equipeInterventionId", row[10]);
            result.add(map);
        }

        return result;
    }


    public void deleteMembre(Long id) {
        if (membreRepository.existsById(id)) {
            membreRepository.deleteById(id);
        } else {
            throw new RuntimeException("Membre not found with ID: " + id);
        }
    }

    private MembreDTO convertToDTO(Membre membre) {
        MembreDTO dto = new MembreDTO();
        BeanUtils.copyProperties(membre, dto);
        if (membre.getEquipeIntervention() != null) {
            dto.setEquipeInterventionId(membre.getEquipeIntervention().getIdEquipe());
        }
        return dto;
    }

    private Membre convertToEntity(MembreDTO dto) {
        Membre membre = new Membre();
        BeanUtils.copyProperties(dto, membre);

        // Convert MultipartFile to byte array
        if (dto.getImageFile() != null && dto.getImageFile().length > 0) {
            byte[] imageBytes = dto.getImageFile();
            membre.setImageFile(imageBytes);
        }

        if (dto.getEquipeInterventionId() != null) {
            EquipeIntervention equipeIntervention = equipeInterventionRepository.findById(dto.getEquipeInterventionId())
                    .orElseThrow(() -> new IllegalArgumentException("EquipeIntervention with ID " + dto.getEquipeInterventionId() + " not found"));
            membre.setEquipeIntervention(equipeIntervention);
        } else {
            throw new IllegalArgumentException("EquipeInterventionId is required");
        }

        return membre;
    }


}
