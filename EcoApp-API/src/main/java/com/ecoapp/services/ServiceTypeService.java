package com.ecoapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.ServiceType;
import com.ecoapp.repository.ServiceTypeRepository;

@Service
public class ServiceTypeService {
	
	@Autowired
	ServiceTypeRepository servicetypeRepository;
	
	public List<ServiceType> findAllServiceTypes() {
		return servicetypeRepository.findAll();
	}
	
}
