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
}
