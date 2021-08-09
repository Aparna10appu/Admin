package com.example.demo.entity;



import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

@Document(collection = "Destination")

public class Destination {
	@Id
	long destinationId;
	String destination;
	List<DropPoint> dropPoints;
	List<TimeSlot> timeSlots;
	String createdBy;
	LocalDateTime createdDate;
	String modifiedBy;
	LocalDateTime modifiedDate;
	int isDeleted;
	
}
