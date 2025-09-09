package com.vehiclebooking.service;

import com.vehiclebooking.model.Booking;
import com.vehiclebooking.model.Vehicle;
import com.vehiclebooking.repository.BookingRepository;
import com.vehiclebooking.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;

    public Booking createBooking(Booking booking) {
        Vehicle vehicle = vehicleRepository.findById(booking.getVehicleId()).orElseThrow();
        double totalCost = booking.getDistanceInKm() * vehicle.getRatePerKm();
        booking.setTotalCost(totalCost);
        booking.setConfirmed(true);
        return bookingRepository.save(booking);
    }
    // BookingService.java (add this method)
    public Booking payForBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setPaid(true);
        return bookingRepository.save(booking);
    }


    public List<Booking> getBookingsByUser(String email) {
        return bookingRepository.findByUserEmail(email);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
