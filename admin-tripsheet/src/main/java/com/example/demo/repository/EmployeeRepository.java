package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Employee;
@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

	@Query("{employeeMail : ?0}")
	Employee findByEmployeeMail(String emailId);
	Employee findByEmployeeName(String empoyeeName);
	
Optional<Employee> findById(String employeeId);
	
	List<Employee> findByIsBlocked(int isBlockedStatus);

}
