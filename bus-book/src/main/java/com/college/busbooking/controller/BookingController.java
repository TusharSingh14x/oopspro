package com.college.busbooking.controller;

import com.college.busbooking.model.Booking;
import com.college.busbooking.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/{busId}")
    public ResponseEntity<?> bookSeat(@PathVariable Long busId, @RequestBody Booking booking) {
        try {
            Booking createdBooking = bookingService.createBooking(busId, booking);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Seat booked successfully!");
            response.put("booking", createdBooking);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
