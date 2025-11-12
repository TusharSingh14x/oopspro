package com.college.busbooking.service;

import com.college.busbooking.model.Bus;
import com.college.busbooking.repository.BookingRepository;
import com.college.busbooking.repository.BusRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BusService {
    private final BusRepository busRepository;
    private final BookingRepository bookingRepository;

    public BusService(BusRepository busRepository, BookingRepository bookingRepository) {
        this.busRepository = busRepository;
        this.bookingRepository = bookingRepository;
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

    public Bus getBusById(Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus not found with id: " + id));
    }

    public Bus resetSeats(Long id) {
        Bus bus = getBusById(id);
        bus.setAvailableSeats(bus.getTotalSeats());
        return busRepository.save(bus);
    }

    public Bus increaseSeats(Long id, int additionalSeats) {
        if (additionalSeats <= 0) {
            throw new RuntimeException("Additional seats must be greater than 0");
        }
        Bus bus = getBusById(id);
        bus.setTotalSeats(bus.getTotalSeats() + additionalSeats);
        bus.setAvailableSeats(bus.getAvailableSeats() + additionalSeats);
        return busRepository.save(bus);
    }

    @Transactional
    public void deleteBus(Long id) {
        if (!busRepository.existsById(id)) {
            throw new RuntimeException("Bus not found with id: " + id);
        }
        // Delete all bookings for this bus first
        bookingRepository.deleteAll(bookingRepository.findByBusId(id));
        // Then delete the bus
        busRepository.deleteById(id);
    }
}
