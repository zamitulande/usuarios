package com.java.oral.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.oral.entities.Testimony;
import com.java.oral.persistence.ITestimonyDAO;
import com.java.oral.service.ITestimonyService;

@Service
public class TestimonyServideImpl  implements ITestimonyService{

    @Autowired
    private ITestimonyDAO iTestimonyDAO;
    @Override
    public List<Testimony> findAll(Long id) {
        return iTestimonyDAO.findAll(id);
    }

    @Override
    public Optional<Testimony> findById(Long id) {
        return iTestimonyDAO.findById(id);
    }

    @Override
    public List<Testimony> findCategory(String category) {
        return iTestimonyDAO.findCategory(category);
    }

    @Override
    public void save(Testimony testimony) {
      iTestimonyDAO.save(testimony);
    }

    @Override
    public void deleteById(Long id) {
       iTestimonyDAO.deleteById(id);
    }

}
