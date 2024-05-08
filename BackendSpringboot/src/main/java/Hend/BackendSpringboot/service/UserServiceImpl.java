package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.Membre;
import Hend.BackendSpringboot.entity.Role;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.entity.UserNotFoundException;
import Hend.BackendSpringboot.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Service
public class UserServiceImpl implements IUserService{


        private UserRepository userRepository;
        private PasswordEncoder passwordEncoder;
        private  UserRepository membreRepository;

    @Override
    public List<Membre> getMembresByStaffRole() {

        return membreRepository.findMembresByStaffRole();
    }
    @Override
    public List<User> getStaffUsers() {
        return userRepository.findStaffUsers();
    }

    @Override
  //  @Transactional(readOnly = true)
    public List<User> retrieveAllUser() {
        return userRepository.findAll();
    }


    @Override
    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
   // @Transactional(readOnly = true)
    public User getUserById(Integer id_user) {
        return userRepository.findById(id_user).orElse(null);
    }

   /* @Override
    @Transactional
    public User updateUser(Integer id_user, User updatedUser) {
        User existingUser = getUserById(id_user);
        if (existingUser == null) {
            return null;
        }
        existingUser.setFirstname(updatedUser.getFirstname());
        existingUser.setLastname(updatedUser.getLastname());
        existingUser.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        existingUser.setRole(updatedUser.getRole()); // Update the role

        return userRepository.save(existingUser);
    }*/

    @Override
    @Transactional
    public User updateUser(Integer id_user, User updatedUser) {
        User existingUser = getUserById(id_user);
        if (existingUser == null) {
            return null;
        }
        // Update only the fields that are present in the updatedUser object
        if (updatedUser.getFirstname() != null) {
            existingUser.setFirstname(updatedUser.getFirstname());
        }
        if (updatedUser.getLastname() != null) {
            existingUser.setLastname(updatedUser.getLastname());
        }
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        if (updatedUser.getRole() != null) {
            existingUser.setRole(updatedUser.getRole());
        }
        return userRepository.save(existingUser);
    }

    @Override
    @Transactional
    public User changeUserRole(Integer userId, Role newRole) {
        User user = getUserById(userId);
        if (user == null) {
            throw new UserNotFoundException("User not found with ID: " + userId);
        }
        user.setRole(newRole);
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(Integer id_user) {
        userRepository.deleteById(id_user);
    }


    @Override
    public Map<String, Long> findTopUsersWithIncidents() {
        List<Object[]> resultList = userRepository.findTopUsersWithIncidents();

        // Transform the list into a map
        Map<String, Long> topUsersWithIncidents = new LinkedHashMap<>();
        for (Object[] result : resultList) {
            User user = (User) result[0];
            Long incidentCount = (Long) result[1];
            topUsersWithIncidents.put(user.getFirstname(), incidentCount);
        }
        return topUsersWithIncidents;
    }
    }

