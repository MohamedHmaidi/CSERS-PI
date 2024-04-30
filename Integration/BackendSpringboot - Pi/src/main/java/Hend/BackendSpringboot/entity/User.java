package Hend.BackendSpringboot.entity;


import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;
import java.util.List;@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "_user")
public class User  {

    @Id
    @GeneratedValue
    private Integer id_user;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String image;
    private String address;
    private Integer phone_number;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Incident> incidents;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Claim> claims;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Inscription> inscriptions;







}


