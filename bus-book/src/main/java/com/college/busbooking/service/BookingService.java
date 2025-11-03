package com.college.busbooking.service;

import com.college.busbooking.model.Booking;
import com.college.busbooking.model.Bus;
import com.college.busbooking.repository.BookingRepository;
import com.college.busbooking.repository.BusRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final BusRepository busRepository;

    public BookingService(BookingRepository bookingRepository, BusRepository busRepository) {
        this.bookingRepository = bookingRepository;
        this.busRepository = busRepository;
    }

    public Booking createBooking(Long busId, Booking booking) {
        Optional<Bus> busOpt = busRepository.findById(busId);
        if (busOpt.isPresent()) {
            Bus bus = busOpt.get();
            if (bus.getAvailableSeats() > 0) {
                bus.setAvailableSeats(bus.getAvailableSeats() - 1);
                busRepository.save(bus);
                booking.setBus(bus);
                return bookingRepository.save(booking);
            } else {
                throw new RuntimeException("No seats available for this bus!");
            }
        } else {
            throw new RuntimeException("Bus not found!");
        }
    }
}
