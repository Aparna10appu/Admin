package com.example.demo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.entity.TripCabInfo;

public interface AssignedCabRepository extends MongoRepository<TripCabInfo ,Long> {

	List<TripCabInfo> findByCabNumber(String cabNumber);

	List<TripCabInfo> findByDestination(String destination);

	
	

	



	
   
	

}
