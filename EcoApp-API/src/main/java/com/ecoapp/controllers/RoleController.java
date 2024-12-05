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

import com.ecoapp.entities.Role;
import com.ecoapp.services.RoleService;

@CrossOrigin("*")
@RequestMapping("/roles")
@RestController
public class RoleController {
	private static final Logger logger = LoggerFactory.getLogger(RoleController.class);

	@Autowired
	RoleService roleService;

	@GetMapping
	public List<Role> getRoles() {
		logger.info("Request to /roles endpoint (GET)");
		return roleService.findAllRoles();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
		logger.info("Request to get role with id " + id);

		Optional<Role> role = roleService.findRoleById(id);
		return role.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping
	public ResponseEntity<?> addRole(@RequestBody Role role) {
		// Comprobamos si el role_id pasado es válido
		roleService.addRole(role);
		return ResponseEntity.ok(role);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<Role> updateRole(@PathVariable Long id, @RequestBody Role roleDetails) {
		logger.info("Request to update role with id " + id);

		// Buscar el rol existente por su ID
		Optional<Role> existingRole = roleService.findRoleById(id);
		if (existingRole.isPresent()) {
			Role roleToUpdate = existingRole.get();

			// Actualizar los campos solo si se proporcionan en el cuerpo
			if (roleDetails.getName() != null) {
				roleToUpdate.setName(roleDetails.getName());
			}
			if (roleDetails.getDescription() != null) {
				roleToUpdate.setDescription(roleDetails.getDescription());
			}

			// Guardar los cambios
			Role updatedRole = roleService.addRole(roleToUpdate);
			return ResponseEntity.ok(updatedRole);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Eliminar un rol por ID
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteRole(@PathVariable Long id) {
		logger.info("Request to delete role with id " + id);

		Optional<Role> existingRole = roleService.findRoleById(id);
		if (existingRole.isPresent()) {
			roleService.deleteRole(id);
			return ResponseEntity.ok("Role witch " + id + " was deleted!");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
