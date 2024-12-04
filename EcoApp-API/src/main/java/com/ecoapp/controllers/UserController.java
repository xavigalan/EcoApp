package com.ecoapp.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.ecoapp.entities.User;
import com.ecoapp.services.RoleService;
import com.ecoapp.services.UserService;

@CrossOrigin("*")
@RequestMapping("/users")
@RestController
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;

	@Autowired
	RoleService roleService;

	// Obtener todos los usuarios
	@GetMapping
	public List<User> getUsers() {
		logger.info("Request to /users endpoint (GET)");
		return userService.findAllUsers();
	}

	// Obtener un usuario por ID
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		logger.info("Request to get user with id " + id);

		Optional<User> user = userService.findUserById(id);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// Crear un nuevo usuario
	@PutMapping
	public ResponseEntity<?> addUser(@RequestBody User user) {
		// Comprobamos si el role_id pasado es válido
		boolean defaultRole = roleService.findAllRoles()
                .stream()
                .anyMatch(role -> role.getId().equals(user.getRoleId()));
		if (defaultRole) {
			userService.addUser(user);
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No existe el ROLE con ID: " + user.getRoleId());
	}

	// Editar un usuario por ID
	@PatchMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
		logger.info("Request to update user with id " + id);

		Optional<User> existingUser = userService.findUserById(id);
		if (existingUser.isPresent()) {
			User userToUpdate = existingUser.get();
			userToUpdate.setFirstName(userDetails.getFirstName());
			userToUpdate.setLastName(userDetails.getLastName());
			userToUpdate.setEmail(userDetails.getEmail());
//            userToUpdate.setRole(userDetails.getRole());
			// Actualiza otros campos si es necesario

			userService.addUser(userToUpdate); // Puede ser el mismo método de agregar si el usuario se actualiza en la
												// base de datos
			return ResponseEntity.ok(userToUpdate);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Eliminar un usuario por ID
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) {
		logger.info("Request to delete user with id " + id);

		Optional<User> existingUser = userService.findUserById(id);
		if (existingUser.isPresent()) {
			userService.deleteUser(id);
			return ResponseEntity.ok("User witch " + id + " was deleted!");
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
