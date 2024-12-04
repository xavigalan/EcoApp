package com.ecoapp.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.ecoapp.entities.TypePoint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapPointsWithTypePointsDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private LocalDateTime creationDate;
    private TypePoint typepoint;
}
