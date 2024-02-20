package com.java.oral.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.java.oral.entities.User;
import com.java.oral.error.UserNotFoundException;
import com.java.oral.persistence.IUserDAO;
import com.java.oral.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired 
    private IUserDAO iUserDAO;

    @Override
    public Page<User> findAll(Pageable pageable) {
        return iUserDAO.findAll(pageable);
    }

    @Override
    public Optional<User> findById(Long id) {
        return iUserDAO.findById(id);
    }

    @Override
    public User save(User user) {
        iUserDAO.save(user);
        return user;
    }

    @Override
    public void deleteById(Long id) {
        iUserDAO.deleteById(id);
    }

    @Override
    public Page<User>  findByPartialIdentification(String identification, Pageable pageable) throws UserNotFoundException {
        return iUserDAO.findByPartialIdentification(identification, pageable);
    }
    

}
