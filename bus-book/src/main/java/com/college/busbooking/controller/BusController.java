package com.college.busbooking.controller;

import com.college.busbooking.model.Bus;
import com.college.busbooking.service.BusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buses")
public class BusController {
    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    public List<Bus> getAllBuses() {
        return busService.getAllBuses();
    }

    @PostMapping
    public ResponseEntity<?> addBus(@RequestBody Bus bus) {
        try {
            Bus savedBus = busService.addBus(bus);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bus added successfully!");
            response.put("bus", savedBus);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to add bus: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/reset-seats")
    public ResponseEntity<?> resetSeats(@PathVariable Long id) {
        try {
            Bus updatedBus = busService.resetSeats(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bus seats reset successfully!");
            response.put("bus", updatedBus);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/increase-seats")
    public ResponseEntity<?> increaseSeats(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        try {
            Integer additionalSeats = request.get("additionalSeats");
            if (additionalSeats == null || additionalSeats <= 0) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Additional seats must be greater than 0");
                return ResponseEntity.badRequest().body(response);
            }
            Bus updatedBus = busService.increaseSeats(id, additionalSeats);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bus seats increased successfully!");
            response.put("bus", updatedBus);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBus(@PathVariable Long id) {
        try {
            busService.deleteBus(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bus deleted successfully!");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
