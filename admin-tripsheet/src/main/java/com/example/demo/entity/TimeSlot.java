package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TimeSlot {

	//int timeSlotId;
	LocalTime timeSlot;
	
	String createdBy;
	LocalDateTime createdDate;
	String modifiedBy;
	LocalDateTime modifiedDate;
	int isDeleted;
}
