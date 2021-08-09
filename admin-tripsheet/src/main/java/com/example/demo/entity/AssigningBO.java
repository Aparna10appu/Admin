package com.example.demo.entity;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.example.demo.entity.BookingRequest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class AssigningBO {

	String cabNumber;
	String driverName;
	Long driverNumber;
	String destination;
	LocalTime timeSlot;
	Integer totalSeats;
	Integer remainingSeats;
	Integer allocatedSeats;
	LocalDate dateOfTravel;
	String source;
	List<BookingRequest> empList;
}
