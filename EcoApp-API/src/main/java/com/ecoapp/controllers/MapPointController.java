package com.ecoapp.controllers;

import com.ecoapp.entities.MapPoint;
import com.ecoapp.entities.TypePoint;
import com.ecoapp.services.MapPointService;
import com.ecoapp.services.TypePointService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.System.Logger;
import java.util.List;
import java.util.Optional;

@RestController
public class MapPointController {

	@Autowired
	private MapPointService mapPointService;

	@Autowired
	private TypePointService typePointService;

	// Obtener todos los MapPoints
	@GetMapping("/mappoints")
	public ResponseEntity<List<MapPoint>> getAllMapPoints() {
		List<MapPoint> mapPoints = mapPointService.findAllMapPoints();
		return ResponseEntity.ok(mapPoints);
	}

	// Obtener un MapPoint por ID
	@GetMapping("/mappoints/{id}")
	public ResponseEntity<MapPoint> getMapPointById(@PathVariable Long id) {
		Optional<MapPoint> mappoint = mapPointService.findMapPointById(id);
		return mappoint.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// Crear un nuevo MapPoint
	@PostMapping("/mappoints/add")
	public ResponseEntity<MapPoint> createMapPoint(@RequestBody MapPoint mapPoint) {
		try {
			MapPoint createdMapPoint = mapPointService.addMapPoint(mapPoint);
			return ResponseEntity.ok(createdMapPoint);
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(null);
		}
	}

	// Actualizar un MapPoint por ID
	@PutMapping("/mappoints/{id}")
	public ResponseEntity<MapPoint> updateMapPoint(@PathVariable Long id, @RequestBody MapPoint mapPointDetails) {
		Optional<MapPoint> existingMapPoint = mapPointService.findMapPointById(id);

		if (existingMapPoint.isPresent()) {
			MapPoint mapPointToUpdate = existingMapPoint.get();
			mapPointToUpdate.setName(mapPointDetails.getName());
			mapPointToUpdate.setLatitude(mapPointDetails.getLatitude());
			mapPointToUpdate.setLongitude(mapPointDetails.getLongitude());
			mapPointToUpdate.setDescription(mapPointDetails.getDescription());
			mapPointToUpdate.setType(mapPointDetails.getType());
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

	// Obtener MapPoints por tipo
	@GetMapping("/mappoints/type/{typeName}")
	public ResponseEntity<List<MapPoint>> getMapPointsByTypeName(@PathVariable String typeName) {
		try {
			List<MapPoint> mapPoints = mapPointService.findByTypeName(typeName);
			return ResponseEntity.ok(mapPoints);
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
