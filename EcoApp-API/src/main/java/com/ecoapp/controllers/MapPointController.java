package com.ecoapp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoapp.dtos.MapPointWithTypeDTO;
import com.ecoapp.entities.MapPoint;
import com.ecoapp.services.MapPointService;

@CrossOrigin("*")
@RequestMapping("/mappoints")
@RestController
public class MapPointController {

	@Autowired
	private MapPointService mapPointService;

	// Obtener todos los MapPoints
	@GetMapping
	public ResponseEntity<List<MapPoint>> getAllMapPoints() {
		List<MapPoint> mapPoints = mapPointService.findAllMapPoints();
		return ResponseEntity.ok(mapPoints);
	}

	// Obtener un MapPoint por ID
	@GetMapping("/{id}")
	public ResponseEntity<MapPoint> getMapPointById(@PathVariable Long id) {
		Optional<MapPoint> mappoint = mapPointService.findMapPointById(id);
		return mappoint.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/type/{typeName}")
	public ResponseEntity<List<MapPointWithTypeDTO>> getMapPointsByTypeId(@PathVariable Long typeId) {
        List<MapPointWithTypeDTO> mapPoints = mapPointService.findMapPointsByTypeId(typeId);
        if (!mapPoints.isEmpty()) {
            return ResponseEntity.ok(mapPoints);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

	// Crear un nuevo MapPoint
	@PutMapping
	public ResponseEntity<MapPoint> createMapPoint(@RequestBody MapPoint mapPoint) {
		try {
			MapPoint createdMapPoint = mapPointService.addMapPoint(mapPoint);
			return ResponseEntity.ok(createdMapPoint);
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

	// Actualizar un MapPoint por ID
	@PatchMapping("/{id}")
	public ResponseEntity<MapPoint> updateMapPoint(@PathVariable Long id, @RequestBody MapPoint mapPointDetails) {
		Optional<MapPoint> existingMapPoint = mapPointService.findMapPointById(id);

		if (existingMapPoint.isPresent()) {
			MapPoint mapPointToUpdate = existingMapPoint.get();
			mapPointToUpdate.setName(mapPointDetails.getName());
			mapPointToUpdate.setLatitude(mapPointDetails.getLatitude());
			mapPointToUpdate.setLongitude(mapPointDetails.getLongitude());
			mapPointToUpdate.setDescription(mapPointDetails.getDescription());
			return ResponseEntity.ok(mapPointService.addMapPoint(mapPointToUpdate));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Eliminar un MapPoint por ID
	@DeleteMapping("/mappoints/{id}")
	public ResponseEntity<Void> deleteMapPoint(@PathVariable Long id) {
		Optional<MapPoint> existingMapPoint = mapPointService.findMapPointById(id);

		if (existingMapPoint.isPresent()) {
			mapPointService.deleteMapPoint(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
