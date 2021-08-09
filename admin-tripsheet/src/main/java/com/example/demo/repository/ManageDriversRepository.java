package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.DriverInfo;

public interface ManageDriversRepository extends MongoRepository<DriverInfo, Long> {

	Optional<DriverInfo> findById(Long id);

	List<DriverInfo> findByIsDeleted(int i);

	Optional<DriverInfo> findByDriverNumber(long number);

	Optional<DriverInfo> findByLicenseNumber(String license);

	//DriverInfo findByIsDelete(char c);
	
	

}
