package com.vehiclebooking.controller;

import com.vehiclebooking.model.Vehicle;
import com.vehiclebooking.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleService vehicleService;

    // ✅ Accept multipart/form-data using @RequestPart
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Vehicle> addVehicle(
            @RequestPart("name") String name,
            @RequestPart("type") String type,
            @RequestPart("city") String city,
            @RequestPart("capacity") int capacity,
            @RequestPart("ratePerKm") double ratePerKm,
            @RequestPart("available") boolean available,
            @RequestPart("ownerEmail") String ownerEmail,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            Vehicle vehicle = new Vehicle();
            vehicle.setName(name);
            vehicle.setType(type);
            vehicle.setCity(city);
            vehicle.setCapacity(capacity);
            vehicle.setRatePerKm(ratePerKm);
            vehicle.setAvailable(available);
            vehicle.setOwnerEmail(ownerEmail);

            if (image != null && !image.isEmpty()) {
                String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
                vehicle.setPicture(base64Image);
            }

            Vehicle savedVehicle = vehicleService.addVehicle(vehicle);
            return ResponseEntity.ok(savedVehicle);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Vehicle>> getAvailableVehicles(@PathVariable String city) {
        return ResponseEntity.ok(vehicleService.getAvailableVehiclesByCity(city));
    }
}
