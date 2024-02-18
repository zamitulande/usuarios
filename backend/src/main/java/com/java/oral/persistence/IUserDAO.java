package com.java.oral.persistence;

import java.util.List;
import java.util.Optional;

import com.java.oral.entities.User;
import com.java.oral.error.UserNotFoundException;

public interface IUserDAO {

    List<User> findAll();

    Optional<User> findById(Long id);

    void save(User user);

    void deleteById(Long id);

    Optional<User> findByIdentification(Integer identification) throws UserNotFoundException;
}
