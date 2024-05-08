package Hend.BackendSpringboot.controller;


import Hend.BackendSpringboot.DTOs.MembreDTO;
import Hend.BackendSpringboot.config.AuthenticationRequest;
import Hend.BackendSpringboot.config.AuthenticationResponse;
import Hend.BackendSpringboot.config.ChangeUserRoleRequest;
import Hend.BackendSpringboot.config.RegisterRequest;
import Hend.BackendSpringboot.entity.Membre;
import Hend.BackendSpringboot.entity.Role;
import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.UserRepository;
import Hend.BackendSpringboot.service.AuthService;
import Hend.BackendSpringboot.service.IUserService;
import Hend.BackendSpringboot.service.MembreService;
import Hend.BackendSpringboot.service.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200/")

public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IUserService userService;
    private final UserServiceImpl userServiceImpl;

    private final MembreService membreService;

    public AuthController(AuthService authService, UserRepository userRepository, PasswordEncoder passwordEncoder, IUserService userService, UserServiceImpl userServiceImpl, MembreService membreService) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.userServiceImpl = userServiceImpl;
        this.membreService = membreService;
    }


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody @Valid RegisterRequest registerRequest
    ) {
        authService.register(registerRequest);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id_user) {
        User user = userService.getUserById(id_user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/staff")
    public List<Membre> getMembresByStaffRole() {
        return userServiceImpl.getMembresByStaffRole();
    }
    @GetMapping("/staffrole")
    public ResponseEntity<List<MembreDTO>> getAllStaffMembers() {
        List<MembreDTO> staffMembers = membreService.getAllStaffMembers();
        return ResponseEntity.ok(staffMembers);
    }

    @GetMapping("/stafflast")
    public List<MembreDTO> getMembresByStaffRolee() {
        return membreService.getAllStaffMembers();
    }

    @GetMapping("/stafff")
    public ResponseEntity<List<MembreDTO>> getAllStaffMemberss() {
        List<MembreDTO> staffMembers = membreService.getAllStaffMembers();
        return ResponseEntity.ok(staffMembers);
    }
    @GetMapping("/staffUsers")
    public List<User> getStaffUsers() {
        return userService.getStaffUsers();
    }

  /*  @PutMapping("/updateID/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable("id") Integer id_user, @RequestBody User user) {
        User updatedUser = userService.updateUser(id_user, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/

    @PutMapping ("/updateID/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Integer id_user, @RequestBody User user) {
        User updatedUser = userService.updateUser(id_user, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id_user) {
        userService.deleteUser(id_user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/allUser")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<User> getAllUsers() {
        List<User> allUser = userService.retrieveAllUser();
        return allUser ;
    }



    @PutMapping("/changeRole")
    public ResponseEntity<?> changeUserRole(@RequestBody @Valid ChangeUserRoleRequest request) {
        System.out.println("Received change role request. User ID: " + request.getUserId() + ", New Role: " + request.getNewRole());
        User user = userService.getUserById(request.getUserId());
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setRole(request.getNewRole());
        userService.updateUser(user.getId_user(), user);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/stats")
    public Map<String, Long> getTopUsersWithIncidents() {
        return userService.findTopUsersWithIncidents();
    }
}






