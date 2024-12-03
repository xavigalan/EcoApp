package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.MapPoint;
import com.ecoapp.entities.TypePoint;
import com.ecoapp.repository.MapPointRepository;
import com.ecoapp.repository.TypePointRepository;

@Service
public class MapPointService {

	@Autowired
	private MapPointRepository mappointRepository;

	@Autowired
	private TypePointRepository typepointRepository;

	public List<MapPoint> findAllMapPoints() {
		return mappointRepository.findAll();
	}

	public Optional<MapPoint> findMapPointById(Long id) {
		return mappointRepository.findById(id);
	}

	public MapPoint addMapPoint(MapPoint mappoint) {
		if (mappoint.getType() == null) {
			TypePoint defaultTypePoint = typepointRepository.findByName("Others");

			if (defaultTypePoint == null) {
				throw new RuntimeException("TypePoint 'Others' not found");
			}
			mappoint.setType(defaultTypePoint);
		}
		return mappointRepository.save(mappoint);
	}

	public List<MapPoint> findByTypeName(String typeName) {
		TypePoint type = typepointRepository.findByName(typeName);
		if (type == null) {
			throw new RuntimeException("TypePoint not found: " + typeName);
		}
		return mappointRepository.findByType(type);
	}

	public void deleteMapPoint(Long id) {
		if (mappointRepository.existsById(id)) {
			mappointRepository.deleteById(id);
		} else {
			throw new RuntimeException("MapPoint not found with id: " + id);
		}
	}
}
