package Hend.BackendSpringboot.service;


import Hend.BackendSpringboot.entity.User;

public interface IUserService {
    public User retrieveIncident(Long userId);
}
