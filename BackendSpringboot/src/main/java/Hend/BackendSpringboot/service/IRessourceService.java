package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.entity.Ressource;

import java.util.HashMap;
import java.util.List;

public interface IRessourceService {
    public List<Ressource> retrieveAllRessources();
    public List<Ressource> retrieveAllRessourcesback();

    public Ressource retrieveRessource(Long ressourceId);
    public Ressource addRessource(Ressource r, Integer userId);
    public Ressource archiveRessource(Long ressourceId);
    public Ressource modifyRessource(Ressource r);
    public HashMap<String, Double> TypeRessourceByQuantity();
}
