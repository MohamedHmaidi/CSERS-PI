package Hend.BackendSpringboot.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ForgetPassword {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idfp;

    @Column(nullable = false)
    private Integer opt ;

    @Column(nullable = false)
    private Date expirationTime;

    @OneToOne
    private User user ;
}
