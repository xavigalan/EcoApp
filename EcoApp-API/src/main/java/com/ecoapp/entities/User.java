package com.ecoapp.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "USERS")
@Data
public class User implements Serializable {
    private static final long serialVersionUID = 4405910147759138768L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String dni;

    private String phone;

    private String email;

    private String password;
    
    // role_id será simplemente un campo Integer en lugar de una relación ManyToOne
    @Column(name = "role_id", nullable = false)
    private Long roleId;  // Aquí almacenamos el ID del rol

    @Column(name = "profile_picture", nullable = true)
    private String profilePicture;
    
    private LocalDateTime creationDate;

    @PrePersist
    public void onCreate() {
        if (this.creationDate == null) {
            this.creationDate = LocalDateTime.now();
        }
    }
}
