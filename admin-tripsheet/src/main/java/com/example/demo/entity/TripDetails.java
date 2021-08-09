package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TripDetails {
	
	private  long tripCabId;
	private String cabNumber;
	DriverInfo driver;
	private String source;
	private String destination;
	private LocalDate dateOfTravel;
	private LocalTime timeSlot;
	private int totalSeats;
	private int allocatedSeats;
    private int remainingSeats;
	private String status;
	private LocalTime startTime;
	private LocalTime endTime;
	private String createdBy;
	private LocalDateTime createdDate;
	private LocalDateTime modifyDate;
	private String modifyBy;
	private int isDeleted;
	    
}
