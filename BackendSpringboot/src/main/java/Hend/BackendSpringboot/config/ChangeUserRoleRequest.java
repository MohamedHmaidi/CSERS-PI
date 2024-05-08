package Hend.BackendSpringboot.config;

import Hend.BackendSpringboot.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeUserRoleRequest {
    private Integer userId;
    private Role newRole;
}
