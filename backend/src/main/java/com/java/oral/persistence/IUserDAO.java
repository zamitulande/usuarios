package com.java.oral.persistence;

import java.util.List;
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

    List<User> findByPartialIdentification(String identification) throws UserNotFoundException;
}
