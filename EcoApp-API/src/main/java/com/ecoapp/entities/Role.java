package com.ecoapp.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "ROLES")
@Data
public class Role implements Serializable {
    private static final long serialVersionUID = -4722993759908160884L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    //@OneToMany(mappedBy = "role")
    //private List<User> users;
}
