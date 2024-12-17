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

import com.ecoapp.entities.ServiceEntity;
import com.ecoapp.services.ServiceService;

@CrossOrigin("*")
@RequestMapping("/services")
@RestController
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    // DEVUELVE LA LISTA DE TODOS LOS SERVICIOS
	@GetMapping
	public ResponseEntity<List<ServiceEntity>> getAllServices() {
		List<ServiceEntity> services = serviceService.findAllServices();
		return ResponseEntity.ok(services);
	}

    // DEVUELVE 1 SOLO SERVICIO
 	@GetMapping("/{id}")
 	public ResponseEntity<ServiceEntity> getServiceById(@PathVariable Long id) {
 		Optional<ServiceEntity> service = serviceService.findServiceById(id);
 		return service.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
 	}

    // CREAR UN NUEVO SERVICIO
    @PutMapping
    public ResponseEntity<String> createService(@RequestBody ServiceEntity Service) {
        try {
            ServiceEntity createdService = serviceService.addService(Service);
            return ResponseEntity.ok("Service created successfully with ID " + createdService.getId());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to create service: " + e.getMessage());
        }
    }

    // ACTUALIZAR UN SERVICIO POR ID
    @PatchMapping("/{id}")
    public ResponseEntity<String> updateService(@PathVariable Long id, @RequestBody ServiceEntity ServiceDetails) {
        Optional<ServiceEntity> existingService = serviceService.findServiceById(id);

        if (existingService.isPresent()) {
            ServiceEntity ServiceToUpdate = existingService.get();
            ServiceToUpdate.setDescription(ServiceDetails.getDescription());
            serviceService.addService(ServiceToUpdate);
            return ResponseEntity.ok("Service with ID " + id + " updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Service with ID " + id + " not found.");
        }
    }

    // ELIMINAR UN SERVICIO
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {
        Optional<ServiceEntity> existingService = serviceService.findServiceById(id);

        if (existingService.isPresent()) {
            serviceService.deleteService(id);
            return ResponseEntity.ok("Service with ID " + id + " has been successfully deleted.");
        } else {
            return ResponseEntity.status(404).body("Service with ID " + id + " not found.");
        }
    }
}
