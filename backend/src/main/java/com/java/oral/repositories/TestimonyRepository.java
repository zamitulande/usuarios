package com.java.oral.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.java.oral.entities.Testimony;


@Repository
public interface TestimonyRepository  extends JpaRepository<Testimony, Long>{

    @Query("select t from Testimony t where t.category = ?1")
    List<Testimony> findCategory(String category);
}
