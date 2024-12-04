package com.ecoapp.dtos;

import java.time.LocalDateTime;

import com.ecoapp.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserWithRoleDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String dni;
    private String phone;
    private String email;
    private LocalDateTime creationDate;
    private Role role; // Información del rol
}