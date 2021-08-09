package com.example.demo.entity;



import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;


@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Document(collection = "CabInfo")

public class CabInfo {
	
	@Id
	String  cabNumber;
	
	long driverId;
	String  cabModel;
	int totalSeats;
	String insuranceNumber;
	LocalDate insuranceExpiryDate;
	String  driverName;
	String createdBy;
	LocalDateTime createdDate;
	String modifiedBy;
	LocalDateTime modifiedDate;
	int isDeleted;
	
	
	public CabInfo(String cabModel, int totalSeats, String insuranceNumber, LocalDate insuranceExpiryDate,
			String driverName, String createdBy, LocalDateTime createdDate, String modifiedBy, LocalDateTime modifiedDate,
			int isDeleted) {
		super();
		this.cabModel = cabModel;
		this.totalSeats = totalSeats;
		this.insuranceNumber = insuranceNumber;
		this.insuranceExpiryDate = insuranceExpiryDate;
		this.driverName = driverName;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.modifiedBy = modifiedBy;
		this.modifiedDate = modifiedDate;
		this.isDeleted = isDeleted;
	}
	
//	public CabInfo(String cabModel, int availableSeats, String insuranceNumber,
//			LocalDate insuranceExpiryDate, String driverName, int isDeleted, String createdBy, String modifiedBy,
//			LocalDate createdDate, LocalDate modifiedDate) {
//		super();
//		this.cabModel = cabModel;
//		this.availableSeats = availableSeats;
//		this.insuranceNumber = insuranceNumber;
//		this.insuranceExpiryDate = insuranceExpiryDate;
//		this.driverName = driverName;
//		this.isDeleted = isDeleted;
//		this.createdBy = createdBy;
//		this.modifiedBy = modifiedBy;
//		this.createdDate = createdDate;
//		this.modifiedDate = modifiedDate;
//	}
	
	
	
}

