package com.vehiclebooking.controller;

import com.vehiclebooking.model.Booking;
import com.vehiclebooking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> bookVehicle(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String email) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(email));
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Booking> payBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.payForBooking(id));
    }

}
