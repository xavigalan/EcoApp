package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.Role;
import com.ecoapp.entities.User;
import com.ecoapp.repository.RoleRepository;
import com.ecoapp.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

	public Optional<User> findUserById(Long id) {
		return userRepository.findById(id);
	}

	public User addUser(User user) {
		if (user.getRole() == null) {
			Role defaultRole = roleRepository.findByName("Customer");

			if (defaultRole == null) {
				throw new RuntimeException("Role 'Customer' not found");
			}

			user.setRole(defaultRole);
		}

		return userRepository.save(user);
	}

	@Autowired
	private RoleRepository roleRepository;

	public List<User> findUsersByRoleName(String roleName) {

		Role role = roleRepository.findByName(roleName);

		if (role == null) {
			throw new RuntimeException("Role not found: " + roleName);
		}

		return userRepository.findByRole(role);
	}

	public List<User> findUsersByRole(Role role) {
		return userRepository.findByRole(role);
	}
}
