package Hend.BackendSpringboot.repository;

import Hend.BackendSpringboot.entity.ForgetPassword;
import Hend.BackendSpringboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ForgetPasswordRepository extends JpaRepository<ForgetPassword,Integer> {


    @Query("select fp from ForgetPassword fp where fp.opt = ?1 and fp.user = ?2")
    Optional<ForgetPassword> findByOtpAndUser (Integer otp, User user);
}
