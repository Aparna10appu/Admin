package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Destination;
@Repository
public interface DestinationRepository extends MongoRepository<Destination, Integer> {
	
	//Destination  findByDestination(String destination);
	
	Optional<Destination> findByDestination(String destination);


	List<Destination> findByIsDeleted(int isDeleted);

}
