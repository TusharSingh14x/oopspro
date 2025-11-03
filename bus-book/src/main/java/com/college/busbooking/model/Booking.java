package com.college.busbooking.model;

import jakarta.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passengerName;
    private String contactNumber;

    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;

    public Booking() {
    }

    public Booking(String passengerName, String contactNumber, Bus bus) {
        this.passengerName = passengerName;
        this.contactNumber = contactNumber;
        this.bus = bus;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }
}
