package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.dtos.MapPointWithTypePointDTO;
import com.ecoapp.entities.MapPoint;
import com.ecoapp.repository.MapPointRepository;

@Service
public class MapPointService {

	@Autowired
	private MapPointRepository mapPointRepository;

	public List<MapPoint> findAllMapPoints() {
		return mapPointRepository.findAll();
	}

	public Optional<MapPoint> findMapPointById(Long id) {
		return mapPointRepository.findById(id);
	}

	public MapPoint addMapPoint(MapPoint mappoint) {
		return mapPointRepository.save(mappoint);
	}

	public void deleteMapPoint(Long id) {
		if (mapPointRepository.existsById(id)) {
			mapPointRepository.deleteById(id);
		} else {
			throw new RuntimeException("MapPoint not found with id: " + id);
		}
	}

	public List<MapPointWithTypePointDTO> getAllMapPointsWithType() {
        return mapPointRepository.findAllMapPointsWithTypePoint();
    }
	
    public MapPointWithTypePointDTO getMapPointWithTypePointById(Long id) {
        return mapPointRepository.findMapPointWithTypePointById(id);
    }

}
