package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.Incident;
import Hend.BackendSpringboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
