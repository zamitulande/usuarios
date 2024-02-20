package com.java.oral.persistence.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.java.oral.entities.User;
import com.java.oral.error.UserNotFoundException;
import com.java.oral.persistence.IUserDAO;
import com.java.oral.repositories.UserRepository;


@Component
public class UserDAOImpl implements IUserDAO {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<User> findAll(Pageable pageable) {
        return (Page<User>) userRepository.findAll(pageable);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Page<User> findByPartialIdentification(String identification, Pageable pageable)  throws UserNotFoundException{
       return userRepository.findByPartialIdentification(identification, pageable);
    }

}
