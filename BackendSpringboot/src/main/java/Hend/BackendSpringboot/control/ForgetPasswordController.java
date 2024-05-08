package Hend.BackendSpringboot.control;

import Hend.BackendSpringboot.entity.ChangePassword;
import Hend.BackendSpringboot.entity.ForgetPassword;
import Hend.BackendSpringboot.entity.MailBody;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.ForgetPasswordRepository;
import Hend.BackendSpringboot.repository.UserRepository;
import Hend.BackendSpringboot.service.EmailService;
import Hend.BackendSpringboot.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/forgetpassword")
public class ForgetPasswordController {

    private  final UserRepository userRepository;
    private final EmailService emailService;

    private final ForgetPasswordRepository forgetPasswordRepository;

    private final PasswordEncoder passwordEncoder;


    public ForgetPasswordController(UserRepository userRepository, EmailService emailService, IUserService userService, ForgetPasswordRepository forgetPasswordRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.forgetPasswordRepository = forgetPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }



    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide an valid email!"));


        int otp = otpGenerator();
        MailBody mailBody =  MailBody.builder()
                .to(email)
                .text("This is the OTP for your Forgot Password request :" + otp)
                .subject("OTP for Forgot Password request")
                .build();

        ForgetPassword fp = ForgetPassword.builder()
                .opt(otp)
                .expirationTime (new Date(System.currentTimeMillis() + 70 * 1000))
                .user(user)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgetPasswordRepository.save(fp);
        return ResponseEntity.ok("Email sent for verification!");
    }

    @PostMapping("/verify0tp/{otp}/{email}")
    public ResponseEntity<Map<String, String>> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {

        // 1. Retrieve User and OTP Record (or equivalent mechanism)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Replace with your OTP storage and retrieval logic
        ForgetPassword otpRecord = forgetPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        // 2. OTP Validity Check
        if (otpRecord.getExpirationTime().before(Date.from(Instant.now()))) {
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("message", "OTP expired");
            return new ResponseEntity<>(responseMap, HttpStatus.BAD_REQUEST);
        }

        // 3. Successful Verification - Adjust as needed
        forgetPasswordRepository.delete(otpRecord); // Optionally delete OTP record
        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "OTP verified!");
        return ResponseEntity.ok(responseMap);
    }



    @PostMapping("/changePassword/{email}/{changePassword}")
    public ResponseEntity<String> changePasswordHandler (@PathVariable String changePassword,
                                                          @PathVariable String email) {
        /*System.out.println(changePassword);
        if (!Objects.equals(changePassword.password (), changePassword.repeatpassword())) {
            return new ResponseEntity<>("Please enter the password again!", HttpStatus.EXPECTATION_FAILED);
        }*/
        String encodedPassword = passwordEncoder.encode(changePassword);
        userRepository.updatePassword(email, encodedPassword);
        return ResponseEntity.ok( "Password has been changed!");
    }


        private Integer otpGenerator() {
            Random random = new Random();
            return random.nextInt(100_000, 999_999) ;
    }
}
