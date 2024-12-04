package com.ecoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoapp.entities.MapPoint;

@Repository
public interface MapPointRepository extends JpaRepository<MapPoint, Long> {


}
