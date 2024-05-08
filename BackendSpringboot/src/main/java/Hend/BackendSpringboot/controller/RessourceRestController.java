package Hend.BackendSpringboot.controller;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.entity.Ressource;
import Hend.BackendSpringboot.service.IRessourceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/ressource")
public class RessourceRestController {
    IRessourceService ressourceService;
    // http://localhost:8089/csers/ressource/add-ressource
    @PostMapping("/add-ressource/{userId}")
    public Ressource addRessource(@RequestBody Ressource r, @PathVariable("userId") Integer userId) {
        Ressource ressource = ressourceService.addRessource(r,userId);
        return ressource;
    }
    // http://localhost:8089/csers/ressource/retrieve-all-ressources
    @GetMapping("/retrieve-all-ressources")
    public List<Ressource> getRessources(){

        List<Ressource> listRessources = ressourceService.retrieveAllRessources();
        return listRessources;
    }
    // http://localhost:8089/csers/ressource/retrieve-all-ressources-back
    @GetMapping("/retrieve-all-ressources-back")
    public List<Ressource> getRessourcesBack(){

        List<Ressource> listRessources = ressourceService.retrieveAllRessourcesback();
        return listRessources;
    }

    // http://localhost:8089/csers/ressource/modify-ressource
    @PutMapping("/modify-ressource")
    public Ressource modifyRessource(@RequestBody Ressource ressource) {
        return ressourceService.modifyRessource(ressource);

    }


    // http://localhost:8089/csers/ressource/archive-ressource/8
    @PutMapping ("/archive-ressource")
    public Ressource archiveRessource(@RequestBody Ressource ressource) {
       Ressource res = ressourceService.archiveRessource(ressource.getIdRessource());
        return res;
    }
    @GetMapping("/statistics")
    HashMap<String, Double> TypeRessourceByQuantity(){
        return ressourceService.TypeRessourceByQuantity();
    }

}


