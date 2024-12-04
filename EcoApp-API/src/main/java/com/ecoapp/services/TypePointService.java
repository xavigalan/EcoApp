package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

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

	public Optional<TypePoint> findTypePointById(Long id) {
		return typepointRepository.findById(id);
	}

	public TypePoint addTypePoint(TypePoint typeppoint) {
		return typepointRepository.save(typeppoint);
	}

	public void deleteTypePoint(Long id) {
		if (typepointRepository.existsById(id)) {
			typepointRepository.deleteById(id);
		} else {
			throw new RuntimeException("Typepoint not found with id: " + id);
		}
	}

}