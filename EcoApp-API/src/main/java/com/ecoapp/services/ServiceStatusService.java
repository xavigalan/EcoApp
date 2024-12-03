package com.ecoapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.ServiceStatus;
import com.ecoapp.repository.ServiceStatusRepository;

@Service
public class ServiceStatusService {
	
	@Autowired
	ServiceStatusRepository servicestatusRepository;
	
	public List<ServiceStatus> findAllServiceStatus() {
		return servicestatusRepository.findAll();
	}
	
}
