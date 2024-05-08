package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Membre;
import Hend.BackendSpringboot.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository  extends  JpaRepository<User , Integer>{
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByResetCode(String resetCode);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?2 where u.email = ?1")
    void updatePassword (String email, String password);

    @Query("SELECT u FROM User u WHERE u.id_user = :id_user")
    Optional<User> findById_user(@Param("id_user") Integer id_user);

    @Query("SELECT m FROM Membre m JOIN m.user u WHERE u.role = 'STAFF'")
    List<Membre> findMembresByStaffRole();

    @Query("SELECT u, COUNT(i) AS incidentCount FROM User u JOIN u.incidents i GROUP BY u ORDER BY incidentCount DESC")
    List<Object[]> findTopUsersWithIncidents();

    @Query("SELECT u FROM User u WHERE u.role = 'STAFF'")
    List<User> findStaffUsers();
}
