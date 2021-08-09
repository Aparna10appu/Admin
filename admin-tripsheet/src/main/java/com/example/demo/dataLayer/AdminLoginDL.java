package com.example.demo.dataLayer;

import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Employee;

@Component
public class AdminLoginDL {

	@Autowired
	private EmployeeRepository employeeRepo;
	
	public Employee findEmployeeByMail(String email) {
		return this.employeeRepo.findByEmployeeMail(email);
	}
	
}
