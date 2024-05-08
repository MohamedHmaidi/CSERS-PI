/*package Hend.BackendSpringboot.control;

import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.service.IUserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    IUserService userService;

   // http://localhost:8089/csers/admin/allUser
    @GetMapping("/allUser")
    public List<User> getAllUsers() {
        List<User> allUser = userService.retrieveAllUser();
        return allUser ;
    }

    //http://localhost:8089/csers/admin/getUserById
    @GetMapping("/getUserById/{id}")
    public User getUserById(@PathVariable ("id") Integer id_user) {
        return userService.getUserById(id_user);
    }

  //  http://localhost:8089/csers/admin/updateID/{id}
    @PutMapping("/updateID/{id}")
    public User updateUser(@PathVariable ("id") Integer id_user, @RequestBody User user) {
        return userService.updateUser(id_user, user);
    }

   // http://localhost:8089/csers/admin/delete/{id}
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable ("id") Integer id_user) {
        userService.deleteUser(id_user);
    }

    //http://localhost:8089/csers/admin/createUser
    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {
        User users = userService.createUser(user) ;
        return users ;
    }

}*/
