package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Ressource;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.entity.etatRessource;
import Hend.BackendSpringboot.repository.RessourceRepository;
import Hend.BackendSpringboot.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class RessourceServiceImp implements IRessourceService {
    @Autowired
    RessourceRepository ressourceRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SendEmailRessourceService sendEmailRessourceService;
    @Override
  // @Scheduled(cron = "*/60 * * * * *")
    public List<Ressource> retrieveAllRessources() {
        List<Ressource> allRessources = ressourceRepository.findAll();
        List<Ressource> validRessource = new ArrayList<>();
        //return ressourceRepository.findAll();
        for (Ressource re: allRessources) {
            if((re.getTotalQuantite()!=0) && (re.getEtatRessource()!= etatRessource.HORS_SERVICE ) && (re.getEtatRessource()!= etatRessource.NON_DISPONIBLE)
            && (!re.isArchive())

            ){
                validRessource.add(re);

            } if (re.getTotalQuantite()<2) {
                sendEmailRessourceService.sendEmail(re.getUser().getEmail(),"RESSOURCE" + re.getNomRessource()+" WILL BE OVER SOON ",
                        "Dear "+re.getUser().getFirstname()+" "+re.getUser().getLastname()+"\n"+"WE NEED TO UPDATE THE QUANTITY  << "+re.getTotalQuantite()+" >> OF RESSOURCE \n");

            }

        }
        return validRessource;

    }


    @Override
    public List<Ressource> retrieveAllRessourcesback() {
        return ressourceRepository.findAll();
    }

    @Override
    public Ressource retrieveRessource(Long ressourceId) {
        return ressourceRepository.findById(ressourceId).get();
    }

    @Override
    public Ressource addRessource(Ressource r,Long userId) {
        User user=userRepository.findById(userId).get();

        List<Ressource> allRessources= ressourceRepository.findAll();
        for (Ressource re : allRessources) {
            if (re.getNomRessource().equals(r.getNomRessource()))
            {
                System.out.println("nom existant");
                throw new RuntimeException("nom existant") ;
            }


        }
        if (r.getTotalQuantite()==0){
            throw new RuntimeException("quantite ne doit pas etre negative") ;
        }
        r.setArchive(false);
        r.setUser(user);
        r.setEtatRessource(etatRessource.DISPONIBLE);
      return  ressourceRepository.save(r);
    }

    @Override
    public Ressource archiveRessource(Long ressourceId) {
        Ressource r = ressourceRepository.findById(ressourceId).get();
        r.setArchive(!r.isArchive());

        return ressourceRepository.save(r);
    }

    @Override
    public Ressource modifyRessource(Ressource r) {
        return ressourceRepository.save(r);
    }
    @Override
    public HashMap<String, Double> TypeRessourceByQuantity() {

        HashMap<String, Float> map=new HashMap<>();
        List<Ressource> listRessources=ressourceRepository.findAll();
        Integer nbp=listRessources.size();
        for (Ressource r:listRessources) {
            String ressouceType=r.getTypeRessource().toString();
            map.put(ressouceType,map.getOrDefault(ressouceType,0F)+1);

        }
        HashMap<String, Double> mapPourcentages=new HashMap<>();
        for(Map.Entry<String,Float> entry:map.entrySet()){
            String ressource=entry.getKey();
            Float count=entry.getValue();
            double per=count*100.0/nbp;
            mapPourcentages.put(ressource,per);
        }
        return mapPourcentages;
    }
}
