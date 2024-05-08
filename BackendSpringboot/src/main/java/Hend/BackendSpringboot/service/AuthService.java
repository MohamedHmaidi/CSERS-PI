package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.config.AuthenticationRequest;
import Hend.BackendSpringboot.config.AuthenticationResponse;
import Hend.BackendSpringboot.config.RegisterRequest;
import Hend.BackendSpringboot.entity.Role;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    //  private final EmailService emailService;


    public void register(RegisterRequest registerRequest) {
        var existingUser = userRepository.findByEmail(registerRequest.getEmail()).orElse(null);

        if (existingUser != null) {
            throw new IllegalStateException("Email already exists");
        }

        var user = User.builder()
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .accountLocked(false)
                .enbaled(false)
                .build();

        userRepository.save(user);
        //  sendValidationEmail(user);
        String jwtToken = jwtService.generateToken(user);
        AuthenticationResponse.builder().accessToken(jwtToken).build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        // Populate user information fields
        Integer userId = user.getId_user();
        String firstName = user.getFirstname();
        String lastName = user.getLastname();
        String email = user.getEmail();
        String role = String.valueOf(user.getRole());

        String jwtToken = jwtService.generateToken(user);

        // Return AuthenticationResponse with additional user information
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .userId(Long.valueOf(userId))
                .firstName(firstName)
                .lastName(lastName)
                .role(role)
                .email(request.getEmail())
                .build();
    }
}


