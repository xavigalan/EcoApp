package com.ecoapp.services;

import java.util.List;

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
}
