package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserComplaintsBO {

	BookingRequest requests;
	Long empNumbers;
	String driverName;
	String cabNumbers;
	LocalDate datesOfTravel;
	
	
}
