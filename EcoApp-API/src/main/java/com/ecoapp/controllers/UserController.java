package com.ecoapp.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecoapp.entities.User;
import com.ecoapp.repository.UserRepository;
import com.ecoapp.services.UserService;

@RestController
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;

	@GetMapping("/users")
	public List<User> getUsers() {
		logger.info("Request to /users endpoint (GET)");
		return userService.findAllUsers();
	}

	@GetMapping("/users/{id}")
	public User getUserById(@PathVariable Long id) {
		logger.info("Request to get user with id " + id);

		Optional<User> user = userService.findUserById(id);
		if (user.isPresent()) {
			return user.get();
		} else {
			throw new RuntimeException("User not found with id: " + id);
		}
	}

    @GetMapping("/users/by-role")
    public List<User> getUsersByRole(@RequestParam String roleName) {
        return userService.findUsersByRoleName(roleName);
    }

	@PostMapping("/users/add")
	@ResponseStatus(HttpStatus.CREATED)
	public User addUser(@RequestBody User user) {
		logger.info("Adding user: " + user.getFirstName());
		return userService.addUser(user);
	}
}
