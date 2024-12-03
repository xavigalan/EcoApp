package com.ecoapp.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoapp.entities.TypePoint;
import com.ecoapp.services.TypePointService;

@RestController
public class TypeController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    TypePointService typepointService;
    
    @GetMapping("/typepoints")
    public List<TypePoint> getTypePoints() {
        logger.info("Request to /typepoints endpoint (GET)");
        return typepointService.findAllTypePoints();
    }
}
