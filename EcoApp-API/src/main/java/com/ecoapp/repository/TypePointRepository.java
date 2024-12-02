package com.ecoapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoapp.entities.TypePoint;

@Repository
public interface TypePointRepository extends JpaRepository<TypePoint, Long> {

	TypePoint findByName(String type);

}
