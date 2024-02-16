package com.java.oral.service;

import java.util.List;
import java.util.Optional;

import com.java.oral.entities.Testimony;

public interface ITestimonyService {

    List<Testimony> findAll(Long id);

    Optional<Testimony> findById(Long id);

    List<Testimony> findCategory(String category);

    void save(Testimony testimony);

    void deleteById(Long id);
}
