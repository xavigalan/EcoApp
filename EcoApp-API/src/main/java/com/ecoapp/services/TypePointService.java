package com.ecoapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.TypePoint;
import com.ecoapp.repository.TypePointRepository;

@Service
public class TypePointService {
	@Autowired
	TypePointRepository typepointRepository;

	public List<TypePoint> findAllTypePoints() {
		return typepointRepository.findAll();
	}

}