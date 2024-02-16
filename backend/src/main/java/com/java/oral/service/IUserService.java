package com.java.oral.service;

import java.util.List;
import java.util.Optional;

import com.java.oral.entities.User;

public interface IUserService {

    List<User> findAll();
    Optional<User> findById(Long id);
    User save(User user);
    void deleteById(Long id);
    Optional<User> findByIdentification(String identification);
}