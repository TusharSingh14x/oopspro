package com.college.busbooking.service;

import com.college.busbooking.model.Bus;
import com.college.busbooking.repository.BusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusService {
    private final BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus addBus(Bus bus) {
        // Initialize availableSeats if not set
        if (bus.getAvailableSeats() == 0 && bus.getTotalSeats() > 0) {
            bus.setAvailableSeats(bus.getTotalSeats());
        }
        return busRepository.save(bus);
    }
}
