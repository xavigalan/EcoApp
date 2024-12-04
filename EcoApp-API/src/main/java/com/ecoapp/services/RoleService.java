package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.Role;
import com.ecoapp.repository.RoleRepository;

@Service
public class RoleService {
	@Autowired
	RoleRepository roleRepository;
	
	public List<Role> findAllRoles() {
		return roleRepository.findAll();
	}
	
	public Optional<Role> findRoleById(Long id) {
		return roleRepository.findById(id);
	}
	
	public Role addRole(Role role) {
		return roleRepository.save(role);
	}
	
	public void deleteRole(Long id) {
		if (roleRepository.existsById(id)) {
			roleRepository.deleteById(id);
		} else {
			throw new RuntimeException("Role not found with id: " + id);
		}
	}
	
}
