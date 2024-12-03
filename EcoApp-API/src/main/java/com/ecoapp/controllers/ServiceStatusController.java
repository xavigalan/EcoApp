package com.ecoapp.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoapp.entities.ServiceStatus;
import com.ecoapp.services.ServiceStatusService;

@RestController
public class ServiceStatusController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    ServiceStatusService servicestatusService;
    
    @GetMapping("/servicestatus")
    public List<ServiceStatus> getServiceStatus() {
        logger.info("Request to /servicepoints endpoint (GET)");
        return servicestatusService.findAllServiceStatus();
    }
}
