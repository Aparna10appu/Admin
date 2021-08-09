package com.example.demo.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="Source")

public class SourceBO {
	@Id
   //private int sourceid;
   private String source;
   private String createdBy;
	private LocalDateTime createdDate;
	private String modifiedBy;
private LocalDateTime modifiedDate;
	int isDeleted;
}
