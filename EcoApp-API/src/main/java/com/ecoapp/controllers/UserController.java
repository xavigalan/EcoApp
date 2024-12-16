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

import com.ecoapp.dtos.UserWithRoleDTO;
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

	// PARA DEVOLVER UN USUARIO POR ID CON EL OBJETO ROLE ENTERO A TRAVÉS DE LA DTO
	@GetMapping("/{id}/with-role")
	public ResponseEntity<UserWithRoleDTO> getUserWithRole(@PathVariable Long id) {
		logger.info("Request to get user with id " + id + " and its role");

		Optional<UserWithRoleDTO> userWithRoleDTO = userService.findUserWithRoleById(id);
		return userWithRoleDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// PARA DEVOLVER UNA LISTA DE USUARIOS CON ROL ESPECIFÍCO
	@GetMapping("/role/{roleId}")
	public ResponseEntity<List<UserWithRoleDTO>> getUsersByRole(@PathVariable("roleId") Long roleId) {
		logger.info("Request to get users with role id " + roleId);

		List<UserWithRoleDTO> usersWithRole = userService.findUsersByRole(roleId);
		if (usersWithRole.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(usersWithRole);
	}

	// PARA DEVOLVER UNA LISTA DE USUARIOS CON ROLES ESPECIFÍCOS
	@GetMapping("/roles/{roleIds}")
	public ResponseEntity<List<UserWithRoleDTO>> getUsersByRoles(@PathVariable List<Long> roleIds) {
		logger.info("Request to get users with roles: " + roleIds);

		List<UserWithRoleDTO> usersWithRoles = userService.findUsersByRoles(roleIds);
		if (usersWithRoles.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(usersWithRoles);
	}

	// Crear un nuevo usuario
	@PutMapping
	public ResponseEntity<?> addUser(@RequestBody User user) {
		// Comprobamos si el role_id pasado es válido
		boolean defaultRole = roleService.findAllRoles().stream()
				.anyMatch(role -> role.getId().equals(user.getRoleId()));
		if (defaultRole) {
			userService.addUser(user);
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No existe el ROLE con ID: " + user.getRoleId());
	}

	// Editar un usuario por ID
	@PatchMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
		try {
			User updatedUser = userService.updateUser(id, userDetails);
			return ResponseEntity.ok(updatedUser);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El email " +  userDetails.getEmail() + " ya existe"); // Devuelve un error adecuado
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
