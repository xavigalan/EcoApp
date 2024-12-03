package com.ecoapp.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "MAP_POINTS")
@Data
public class MapPoint implements Serializable {
	private static final long serialVersionUID = 854986022165574953L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@ManyToOne
	@JoinColumn(name = "type_id")
	private TypePoint type;

	@Column(nullable = false, precision = 10, scale = 8)
	private BigDecimal latitude;

	@Column(nullable = false, precision = 11, scale = 8)
	private BigDecimal longitude;

    @Column(name = "description")
    private String description;
    
	private LocalDateTime createdAt;

	@PrePersist
	public void onCreate() {
		if (this.createdAt == null) {
			this.createdAt = LocalDateTime.now();
		}
	}
}
