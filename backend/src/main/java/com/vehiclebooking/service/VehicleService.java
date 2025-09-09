package com.vehiclebooking.service;

import com.vehiclebooking.model.Vehicle;
import com.vehiclebooking.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public List<Vehicle> getAvailableVehiclesByCity(String city) {
        return vehicleRepository.findByCityAndAvailableTrue(city);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    // ------------------- HELPER METHODS ------------------------

public Vehicle getVehicleById(Long id) {
    return vehicleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
}


    // ------------------- OWNER-SPECIFIC METHODS ------------------------

    // Get vehicles belonging to a particular owner
    public List<Vehicle> getVehiclesByOwner(String ownerEmail) {
        return vehicleRepository.findByOwnerEmail(ownerEmail);
    }

    // Update vehicle details (owner only)
    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        existing.setName(vehicle.getName());
        existing.setType(vehicle.getType());
        existing.setCapacity(vehicle.getCapacity());
        existing.setRatePerKm(vehicle.getRatePerKm());
        existing.setAvailable(vehicle.isAvailable());
        // Do NOT allow changing ownerEmail here for security
        return vehicleRepository.save(existing);
    }

    // Delete vehicle (only if owner matches)
    public void deleteVehicleByOwner(Long id, String ownerEmail) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        if (!vehicle.getOwnerEmail().equals(ownerEmail)) {
            throw new RuntimeException("Not authorized to delete this vehicle");
        }
        vehicleRepository.delete(vehicle);
    }
}
