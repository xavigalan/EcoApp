package com.ecoapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoapp.entities.ServiceEntity;
import com.ecoapp.repository.ServiceRepository;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    // MOSTRAR TODOS LOS SERVICIOS
    public List<ServiceEntity> findAllServices() {
        return serviceRepository.findAll();
    }

    // MOSTRAR SOLO 1 SERVICIO
    public Optional<ServiceEntity> findServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    // AÑADIR SERVICIO
    public ServiceEntity addService(ServiceEntity service) {
        return serviceRepository.save(service);
    }

    // ELIMINAR SERVICIO
    public void deleteService(Long id) {
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
        } else {
            throw new RuntimeException("Service not found, can't be deleted with id: " + id);
        }
    }
}
