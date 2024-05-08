package Hend.BackendSpringboot.service;
import java.util.List;
import java.util.Map;

import Hend.BackendSpringboot.entity.Membre;
import Hend.BackendSpringboot.entity.Role;
import Hend.BackendSpringboot.entity.User;



public interface IUserService {


        List<User> retrieveAllUser();

        User createUser(User user);
        User getUserById(Integer id_user);
        User updateUser(Integer id_user, User user);
        void deleteUser(Integer id_user);
        User changeUserRole(Integer userId, Role newRole);

        Map<String, Long> findTopUsersWithIncidents();

        List<User> getStaffUsers();
        List<Membre> getMembresByStaffRole();

}


