package com.ecoapp.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.ecoapp.entities.TypePoint;
import com.ecoapp.services.TypePointService;

@CrossOrigin("*")
@RequestMapping("/typepoints")
@RestController
public class TypeController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	TypePointService typepointService;

	@GetMapping
	public List<TypePoint> getTypePoints() {
		logger.info("Request to /typepoints endpoint (GET)");
		return typepointService.findAllTypePoints();
	}

	@GetMapping("/{id}")
	public ResponseEntity<TypePoint> getTypePointById(@PathVariable Long id) {
		logger.info("Request to get typepoint with id " + id);

		Optional<TypePoint> typepoint = typepointService.findTypePointById(id);
		return typepoint.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping
	public ResponseEntity<?> addTypePoint(@RequestBody TypePoint typeppoint) {
		// Comprobamos si el role_id pasado es válido
		typepointService.addTypePoint(typeppoint);
		return ResponseEntity.ok(typeppoint);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<TypePoint> updateTypePoint(@PathVariable Long id, @RequestBody TypePoint typepointDetails) {
		logger.info("Request to update role with id " + id);

		// Buscar el rol existente por su ID
		Optional<TypePoint> existingTypePoint = typepointService.findTypePointById(id);
		if (existingTypePoint.isPresent()) {
			TypePoint typepointToUpdate = existingTypePoint.get();

			// Actualizar los campos solo si se proporcionan en el cuerpo
			if (typepointDetails.getName() != null) {
				typepointToUpdate.setName(typepointDetails.getName());
			}

			// Guardar los cambios
			TypePoint updatedTypePoint = typepointService.addTypePoint(typepointToUpdate);
			return ResponseEntity.ok(updatedTypePoint);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTypePoint(@PathVariable Long id) {
		logger.info("Request to delete typepoint with id " + id);

		Optional<?> existingTypePoint = typepointService.findTypePointById(id);
		if (existingTypePoint.isPresent()) {
			typepointService.deleteTypePoint(id);
			return ResponseEntity.ok("TypePoint witch " + id + " was deleted!");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
}
