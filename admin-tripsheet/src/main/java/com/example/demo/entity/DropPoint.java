package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DropPoint {
	
	//int dropPointId;
	String dropPoint;
	String createdBy;
	LocalDateTime createdDate;
	String modifiedBy;
	LocalDateTime modifiedDate;
	int isDeleted;

}