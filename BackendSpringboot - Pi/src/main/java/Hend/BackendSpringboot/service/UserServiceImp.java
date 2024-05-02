package Hend.BackendSpringboot.service;

import Hend.BackendSpringboot.entity.User;
import Hend.BackendSpringboot.repository.UserRepository;

public class UserServiceImp implements IUserService{
    UserRepository userRepository;
    @Override
    public User retrieveIncident(Long userId) {
       return userRepository.findById(userId).get();
    }
}
