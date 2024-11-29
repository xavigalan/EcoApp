package com.ecoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoapp.entities.Role;
import com.ecoapp.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    List<User> findByRole(Role role);


}
