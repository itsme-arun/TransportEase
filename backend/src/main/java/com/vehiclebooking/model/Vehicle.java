package com.vehiclebooking.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "picture")
    private String picture; // stores image path or URL


    private String name;

    private String type;

    private int capacity;

    private double ratePerKm;

    private boolean available;

    private String city;

    private String ownerEmail;

    @Column(name = "picture")
    private String imageUrl; // ✅ Add this field for image support
}
