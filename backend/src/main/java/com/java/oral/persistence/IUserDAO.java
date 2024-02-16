package com.java.oral.persistence;

import java.util.List;
import java.util.Optional;

import com.java.oral.entities.User;

public interface IUserDAO {

    List<User> findAll();

    Optional<User> findById(Long id);

    void save(User user);

    void deleteById(Long id);

    Optional<User> findByIdentification(String identification);
}
