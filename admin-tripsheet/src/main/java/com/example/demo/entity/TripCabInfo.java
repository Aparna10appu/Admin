package com.example.demo.entity;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

@Document(collection = "TripCabInfo")

public class TripCabInfo {
	 @Id
	  private  long tripCabId;
	  private String cabNumber;
	  private long driverId;
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
	  private String modifiedBy;
	  private LocalDateTime modifiedDate;
	  private int isDeleted;

	

}
