package com.ecoapp.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoapp.entities.ServiceType;
import com.ecoapp.services.ServiceTypeService;

@RestController
public class ServiceTypeController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    ServiceTypeService servicetypeService;
    
    @GetMapping("/servicetype")
    public List<ServiceType> getServiceTypes() {
        logger.info("Request to /servicepoints endpoint (GET)");
        return servicetypeService.findAllServiceTypes();
    }
}
