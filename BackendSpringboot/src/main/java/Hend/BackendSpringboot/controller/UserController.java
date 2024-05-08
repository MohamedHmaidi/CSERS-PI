package Hend.BackendSpringboot.controller;

import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@PreAuthorize("hasRole('USER')")
public class UserController {
        IUserService userService;

        //http://localhost:8089/csers/user/createUser
        @PostMapping("/createUser")
        public User createUser(@RequestBody User user) {
            User users = userService.createUser(user) ;
            return users ;
        }




}

