package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
@FieldDefaults(level=AccessLevel.PRIVATE)
@Document(collection  = "ComplaintsList")
public class ComplaintsList {
	
	
	@Id
	String complaintDescription;
	
	  String createdBy;
      LocalDateTime createdDate;
	  String modifiedBy;
	   LocalDateTime modifiedDate;
	  int isDeleted;
}
