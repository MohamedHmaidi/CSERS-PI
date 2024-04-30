package Hend.BackendSpringboot.entity;

//import Hend.BackendSpringboot.token.Token;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;
import java.util.List;@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User {

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
    private List<Incident> incidents;



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Inscription> inscriptions;


    public User(Integer userId) {
    }

    public Integer getId() {
        return id_user;
    }
}


