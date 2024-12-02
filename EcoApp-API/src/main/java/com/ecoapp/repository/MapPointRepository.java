package com.ecoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoapp.entities.MapPoint;
import com.ecoapp.entities.TypePoint;

@Repository
public interface MapPointRepository extends JpaRepository<MapPoint, Long> {

	List<MapPoint> findByType(TypePoint type);

}
