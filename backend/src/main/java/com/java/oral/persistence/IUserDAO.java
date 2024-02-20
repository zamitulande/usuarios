package com.java.oral.persistence;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.java.oral.entities.User;
import com.java.oral.error.UserNotFoundException;

public interface IUserDAO {

    Page<User> findAll(Pageable pageable);

    Optional<User> findById(Long id);

    void save(User user);

    void deleteById(Long id);

    Page<User> findByPartialIdentification(String identification, Pageable pageable) throws UserNotFoundException;
}
