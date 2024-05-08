package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.DTOs.EquipeInterventionDTO;
import Hend.BackendSpringboot.entity.EquipeIntervention;
import Hend.BackendSpringboot.entity.Membre;
import Hend.BackendSpringboot.repository.EquipeInterventionRepository;
import Hend.BackendSpringboot.repository.IncidentRepository;
import Hend.BackendSpringboot.repository.MembreRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class EquipeInterventionService {

    private final EquipeInterventionRepository equipeInterventionRepository;
    private final IncidentRepository incidentRepository;

    private final MembreRepository membreRepository;

    private final Map<String, List<String>> descriptionToTeamsMapping;

    @Autowired
    public EquipeInterventionService(EquipeInterventionRepository equipeInterventionRepository, IncidentRepository incidentRepository, MembreRepository membreRepository) {
        this.equipeInterventionRepository = equipeInterventionRepository;
        this.incidentRepository = incidentRepository;
        this.membreRepository = membreRepository;
        this.descriptionToTeamsMapping = initializeDescriptionToTeamsMapping();
    }

    private Map<String, List<String>> initializeDescriptionToTeamsMapping() {
        Map<String, List<String>> descriptionToTeamsMapping = new HashMap<>();

        descriptionToTeamsMapping.put("combustion", List.of("Fire Response Team", "Disaster Management Team"));
        descriptionToTeamsMapping.put("burning", List.of("Fire Response Team", "Disaster Management Team"));
        descriptionToTeamsMapping.put("smoke", List.of("Fire Response Team", "Disaster Management Team"));
        descriptionToTeamsMapping.put("flames", List.of("Fire Response Team", "Disaster Management Team"));
        descriptionToTeamsMapping.put("heat", List.of("Fire Response Team", "Disaster Management Team"));
        descriptionToTeamsMapping.put("pain", List.of("Medical Staff Team", "Health and Medical Services Team"));
        descriptionToTeamsMapping.put("injury", List.of("Medical Staff Team", "Health and Medical Services Team"));
        descriptionToTeamsMapping.put("trauma", List.of("Medical Staff Team", "Health and Medical Services Team"));
        descriptionToTeamsMapping.put("blood", List.of("Medical Staff Team", "Health and Medical Services Team"));
        descriptionToTeamsMapping.put("wound", List.of("Medical Staff Team", "Health and Medical Services Team"));
        descriptionToTeamsMapping.put("emergency", List.of("Medical Staff Team", "Health and Medical Services Team"));
        descriptionToTeamsMapping.put("medical attention", List.of("Medical Staff Team", "Health and Medical Services Team"));
        descriptionToTeamsMapping.put("danger", List.of("Security Team", "Safety Team"));
        descriptionToTeamsMapping.put("threat", List.of("Security Team", "Safety Team"));
        descriptionToTeamsMapping.put("security", List.of("Security Team", "Safety Team"));
        descriptionToTeamsMapping.put("suspicious", List.of("Security Team", "Safety Team"));
        descriptionToTeamsMapping.put("trespass", List.of("Security Team", "Safety Team"));
        descriptionToTeamsMapping.put("safety concern", List.of("Security Team", "Safety Team"));

        return descriptionToTeamsMapping;
    }

    public List<EquipeIntervention> recommendTeamsForIncident(String description) {
        List<EquipeIntervention> recommendedTeams = new ArrayList<>();
        for (Map.Entry<String, List<String>> entry : descriptionToTeamsMapping.entrySet()) {
            String keyword = entry.getKey();
            if (description.toLowerCase().contains(keyword)) {
                List<String> teamNames = entry.getValue();
                for (String teamName : teamNames) {
                    EquipeIntervention equipe = equipeInterventionRepository.findByNomEquipe(teamName);
                    if (equipe != null) {
                        recommendedTeams.add(equipe);
                    }
                }
            }
        }
        return recommendedTeams;
    }

    public List<EquipeInterventionDTO> getAllEquipes() {
        List<EquipeIntervention> equipes = equipeInterventionRepository.findAll();
        return equipes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EquipeInterventionDTO getEquipeById(Long id) {
        Optional<EquipeIntervention> optionalEquipe = equipeInterventionRepository.findById(id);
        if (optionalEquipe.isPresent()) {
            return convertToDTO(optionalEquipe.get());
        }
        throw new RuntimeException("Équipe non trouvée avec l'ID: " + id);
    }

    public List<byte[]> getMemberImagesByEquipeId(Long equipeId) {
        List<Membre> membres = membreRepository.findByEquipeIntervention_IdEquipe(equipeId);
        if (membres.isEmpty()) {
            throw new RuntimeException("Aucun membre trouvé pour l'équipe avec l'ID: " + equipeId);
        }
        return membres.stream()
                .map(Membre::getImageFile)
                .collect(Collectors.toList());
    }

    public EquipeInterventionDTO createEquipe(EquipeInterventionDTO equipeInterventionDTO) {
        EquipeIntervention equipe = convertToEntity(equipeInterventionDTO);
        EquipeIntervention savedEquipe = equipeInterventionRepository.save(equipe);
        return convertToDTO(savedEquipe);
    }

    public EquipeInterventionDTO updateEquipe(Long id, EquipeInterventionDTO equipeInterventionDTO) {
        Optional<EquipeIntervention> optionalEquipe = equipeInterventionRepository.findById(id);
        if (optionalEquipe.isPresent()) {
            EquipeIntervention existingEquipe = optionalEquipe.get();
            BeanUtils.copyProperties(equipeInterventionDTO, existingEquipe, "idEquipe");
            EquipeIntervention updatedEquipe = equipeInterventionRepository.save(existingEquipe);
            return convertToDTO(updatedEquipe);
        }
        throw new RuntimeException("Équipe non trouvée avec l'ID: " + id);
    }

    public void deleteEquipe(Long id) {
        if (equipeInterventionRepository.existsById(id)) {
            equipeInterventionRepository.deleteById(id);
        } else {
            throw new RuntimeException("Équipe non trouvée avec l'ID: " + id);
        }
    }

    private EquipeInterventionDTO convertToDTO(EquipeIntervention equipe) {
        EquipeInterventionDTO dto = new EquipeInterventionDTO();
        dto.setIdEquipe(equipe.getIdEquipe());
        dto.setNomEquipe(equipe.getNomEquipe());
        dto.setDescription(equipe.getDescription());
        dto.setDisponibilite(equipe.getDisponibilite());
        return dto;
    }


    private EquipeIntervention convertToEntity(EquipeInterventionDTO dto) {
        EquipeIntervention equipe = new EquipeIntervention();
        BeanUtils.copyProperties(dto, equipe);
        return equipe;
    }
}

