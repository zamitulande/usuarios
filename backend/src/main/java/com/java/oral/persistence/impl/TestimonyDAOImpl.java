package com.java.oral.persistence.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.java.oral.entities.Testimony;
import com.java.oral.persistence.ITestimonyDAO;
import com.java.oral.repositories.TestimonyRepository;

@Component
public class TestimonyDAOImpl implements ITestimonyDAO{

    @Autowired
    private TestimonyRepository testimonyRepository;

    @Override
    public List<Testimony> findAll(Long id) {
        return (List<Testimony>) testimonyRepository.findAll();
    }

    @Override
    public Optional<Testimony> findById(Long id) {
        return testimonyRepository.findById(id);
    }

    @Override
    public void save(Testimony testimony) {
        testimonyRepository.save(testimony);
    }

    @Override
    public void deleteById(Long id) {
        testimonyRepository.deleteById(id);
    }

    @Override
    public List<Testimony> findCategory(String category) {
        return testimonyRepository.findCategory(category);
    }
    
}
