package com.example.demo.dataLayer;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.DriverInfo;
import com.example.demo.repository.ManageDriversRepository;

@Service
public class ManageDriversDL {
	
	@Autowired
	private ManageDriversRepository repo;
	
	//This method is used to find the driver by driverId//
	public Optional<DriverInfo> findDriverById(Long id){
		
		return this.repo.findById(id);
		
	}
	//End of the finding method//
	
	public Optional<DriverInfo> findByDriverNumber(Long number){
		
		return this.repo.findByDriverNumber(number);
		
	}
	
	public Optional<DriverInfo> findByLicenseNumber(String license){
		
		return this.repo.findByLicenseNumber(license);
		
	}
	
	//This method returns the list of drivers//
	public List<DriverInfo> findAllDrivers(){
		
		return this.repo.findAll();
		
	}
	
	//End of find all drivers//
	
	//This method is used to save the driver details to the list//
	public DriverInfo saveDriverDetails(DriverInfo driverDetails) {
		driverDetails.setPassword(String.valueOf(driverDetails.getDriverNumber()));
		return this.repo.save(driverDetails);
		
	}
	//End of saving the driver details method//
	
	//This method is used to update the driver details in the list//
	public DriverInfo updateDriverDetails(DriverInfo driverDetails) {
		
		return this.repo.save(driverDetails);
		
	}
	//End of updating the driver details//
	
	//This method is used to delete the driver details from the list//
	public DriverInfo deleteDriverDetails(Long driverId) {
		
		Optional<DriverInfo> driver = this.repo.findById(driverId);
		DriverInfo deletedDriver = driver.get();
		
		deletedDriver.setIsDeleted('1');
		deletedDriver.setModifiedBy("Admin");
		deletedDriver.setModifiedDate(LocalDateTime.now());
		
		return this.repo.save(deletedDriver);
				
	}
	//End of delete method//
	
	//This method is used to get the driver details and omits the deleted details// 
	public List<DriverInfo> findByIsDeleted(int i){
		
		return this.repo.findByIsDeleted(i);
		
	}
	//End of the method//
	


}
