package com.ecoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoapp.entities.ServiceStatus;

@Repository
public interface ServiceStatusRepository extends JpaRepository<ServiceStatus, Long> {

	ServiceStatus findByStatus(String status);
}
