package com.java.oral.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.java.oral.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    @Query("SELECT u FROM User u WHERE CAST(u.identification AS string) LIKE ?1%")
    Page<User> findByPartialIdentification(String identification, Pageable pageable);
}
