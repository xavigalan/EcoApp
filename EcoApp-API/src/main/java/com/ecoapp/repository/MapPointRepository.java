package com.ecoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecoapp.dtos.MapPointWithTypeDTO;
import com.ecoapp.entities.MapPoint;

@Repository

public interface MapPointRepository extends JpaRepository<MapPoint, Long> {

	@Query("SELECT new com.ecoapp.dtos.MapPointWithTypeDTO(mp.id, mp.name, mp.description, mp.latitude, mp.longitude, mp.createdAt, tp) "
			+ "FROM MapPoint mp JOIN TypePoint tp ON mp.type.id = tp.id " + "WHERE tp.id = :typeId")
	List<MapPointWithTypeDTO> findMapPointsByTypeId(@Param("typeId") Long typeId);
}
