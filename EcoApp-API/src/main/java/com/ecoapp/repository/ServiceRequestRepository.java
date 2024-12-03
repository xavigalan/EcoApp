package com.ecoapp.repository;

import com.ecoapp.entities.ServiceRequest;
import com.ecoapp.entities.ServiceStatus;
import com.ecoapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    // Buscar solicitudes por cliente
    List<ServiceRequest> findByClient(User client);

    // Buscar solicitudes por estado
    List<ServiceRequest> findByStatus(ServiceStatus status);

    // Buscar solicitudes por cliente y estado
    List<ServiceRequest> findByClientAndStatus(User client, ServiceStatus status);

    // Buscar solicitudes por tipo de servicio
    List<ServiceRequest> findByServiceTypeId(Long serviceTypeId);

    // Buscar solicitudes por dirección o parte de la dirección
    List<ServiceRequest> findByLocationAddressContainingIgnoreCase(String address);
}
