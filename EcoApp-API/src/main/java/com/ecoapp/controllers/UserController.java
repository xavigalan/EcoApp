package com.ecoapp.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecoapp.entities.User;
import com.ecoapp.services.UserService;

@CrossOrigin("*")
@RestController
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    // Obtener todos los usuarios
    @GetMapping("/users")
    public List<User> getUsers() {
        logger.info("Request to /users endpoint (GET)");
        return userService.findAllUsers();
    }

    // Obtener un usuario por ID
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        logger.info("Request to get user with id " + id);
        
        Optional<User> user = userService.findUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Obtener usuarios por rol
    @GetMapping("/users/by-role")
    public List<User> getUsersByRole(@RequestParam String roleName) {
        logger.info("Request to get users with role " + roleName);
        return userService.findUsersByRoleName(roleName);
    }

    // Crear un nuevo usuario
    @PostMapping("/users/add")
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@RequestBody User user) {
        logger.info("Adding user: " + user.getFirstName());
        return userService.addUser(user);
    }

    // Editar un usuario por ID
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        logger.info("Request to update user with id " + id);
        
        Optional<User> existingUser = userService.findUserById(id);
        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            userToUpdate.setFirstName(userDetails.getFirstName());
            userToUpdate.setLastName(userDetails.getLastName());
            userToUpdate.setEmail(userDetails.getEmail());
            userToUpdate.setRole(userDetails.getRole());
            // Actualiza otros campos si es necesario
            
            userService.addUser(userToUpdate); // Puede ser el mismo método de agregar si el usuario se actualiza en la base de datos
            return ResponseEntity.ok(userToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        logger.info("Request to delete user with id " + id);

        Optional<User> existingUser = userService.findUserById(id);
        if (existingUser.isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
