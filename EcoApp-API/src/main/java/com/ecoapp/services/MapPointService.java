package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.MapPoint;
import com.ecoapp.repository.MapPointRepository;

@Service
public class MapPointService {

	@Autowired
	private MapPointRepository mappointRepository;

	public List<MapPoint> findAllMapPoints() {
		return mappointRepository.findAll();
	}

	public Optional<MapPoint> findMapPointById(Long id) {
		return mappointRepository.findById(id);
	}

	public MapPoint addMapPoint(MapPoint mappoint) {
		return mappointRepository.save(mappoint);
	}

	public void deleteMapPoint(Long id) {
		if (mappointRepository.existsById(id)) {
			mappointRepository.deleteById(id);
		} else {
			throw new RuntimeException("MapPoint not found with id: " + id);
		}
	}
}
