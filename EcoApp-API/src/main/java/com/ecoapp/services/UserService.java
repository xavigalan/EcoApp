package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.dtos.UserWithRoleDTO;
import com.ecoapp.entities.User;
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
		return userRepository.save(user);
	}

	public void deleteUser(Long id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
		} else {
			throw new RuntimeException("User not found with id: " + id);
		}
	}
	
	 public Optional<UserWithRoleDTO> findUserWithRoleById(Long userId) {
	        return userRepository.findUserWithRoleById(userId);
	    }
}
