package com.ecoapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecoapp.dtos.MapPointWithTypePointDTO;
import com.ecoapp.entities.MapPoint;

@Repository
public interface MapPointRepository extends JpaRepository<MapPoint, Long> {

	@Query("""
			    SELECT new com.ecoapp.dtos.MapPointWithTypePointDTO(
			        mp.id,
			        mp.name,
			        mp.description,
			        mp.latitude,
			        mp.longitude,
			        mp.createdAt,
			        tp
			    )
			    FROM MapPoint mp
			    JOIN TypePoint tp ON mp.typeId = tp.id
			    ORDER BY mp.id
			""")
	List<MapPointWithTypePointDTO> findAllMapPointsWithTypePoint();

	@Query("""
			    SELECT new com.ecoapp.dtos.MapPointWithTypePointDTO(
			        mp.id,
			        mp.name,
			        mp.description,
			        mp.latitude,
			        mp.longitude,
			        mp.createdAt,
			        tp
			    )
			    FROM MapPoint mp
			    JOIN TypePoint tp ON mp.typeId = tp.id
			    WHERE mp.id = :id
			    ORDER BY mp.id
			""")
	MapPointWithTypePointDTO findMapPointWithTypePointById(@Param("id") Long id);
}
