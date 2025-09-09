package com.vehiclebooking.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private boolean paid = false;


    private Long vehicleId;

    private String pickupLocation;

    private String dropLocation;

    private double distanceInKm;

    private double totalCost;

    private boolean confirmed;
}