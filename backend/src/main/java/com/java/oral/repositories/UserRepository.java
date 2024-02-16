package com.java.oral.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.java.oral.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    @Query("select u from User u where u.identification = ?1")
    Optional<User> findByIdentification(String identification);
}
