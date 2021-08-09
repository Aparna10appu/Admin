package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.businessLayer.ManageDriversBL;
import com.example.demo.dataLayer.ManageDriversDL;
import com.example.demo.entity.DriverInfo;
import com.example.demo.repository.ManageDriversRepository;
import com.example.demo.status.ManageDriverResponseStatus;

@RestController
@RequestMapping(path = "/manage/drivers")
public class ManageDriversController {
	
	@Autowired
	private ManageDriversBL manageDriversBL;
	
	@Autowired
	private ManageDriversDL manageDriversDL;
	
	@Autowired
	private ManageDriversRepository repo;
	
	
	// This method is used to get all the driver details//
	@GetMapping(path = "/list")
	public ResponseEntity<List<DriverInfo>> getAllDrivers() {
		
		List<DriverInfo> driverList = this.manageDriversBL.findByIsDeleted(0);
		return ResponseEntity.status(HttpStatus.OK).body(driverList);

	}
	//End of get all driver details method//
	

	
	//This method is used to delete the driver details//
	@PutMapping(path = "/deletedriver/{driverId}")
	public ResponseEntity<DriverInfo> deleteDriver(@PathVariable("driverId") long driverId){
				
		DriverInfo info = this.manageDriversBL.deleteDriverDetails(driverId);
		
		return ResponseEntity.status(HttpStatus.OK).body(info);
		
	}
	//End of delete method//
	

	
	@PostMapping(path = "/add/newdriver")
	public ResponseEntity<DriverInfo> addDriverInfo(@RequestBody DriverInfo driverInfo){
		
		DriverInfo reqDriver = driverInfo;
		reqDriver.setIsDeleted(0);
		
		DriverInfo createdBy = driverInfo;
		createdBy.setCreatedBy("Admin");
		
		DriverInfo createdDate = driverInfo;
		createdDate.setCreatedDate(LocalDateTime.now());
		
		driverInfo.setDriverId(repo.count()+1);
		Long driverId = driverInfo.getDriverId();
		
		Long number = driverInfo.getDriverNumber();
		Optional<DriverInfo> entitynumber = repo.findByDriverNumber(number);
		
		String licNumber = driverInfo.getLicenseNumber();
		Optional<DriverInfo> entitylic = repo.findByLicenseNumber(licNumber);
		
		DriverInfo saveDriverInfo = null;
		
		if(entitynumber.isPresent() && entitynumber.get().getIsDeleted() == 0) {
			
			return  ResponseEntity.status(ManageDriverResponseStatus.DRIVERNUMBEREXIST).body(null);
		}
		
		else if(entitylic.isPresent() && entitylic.get().getIsDeleted() == 0) {
			
			return  ResponseEntity.status(ManageDriverResponseStatus.LICENSENUMBEREXIST).body(null);					
		}
//		else if(entitynumber.isPresent() && entitylic.isPresent()) {
//			
//			return new ResponseEntity<>(null,HttpStatus.CONFLICT);
//			
//		}
		
		else {
			
			saveDriverInfo = this.manageDriversDL.saveDriverDetails(driverInfo);
			
			return ResponseEntity.status(HttpStatus.CREATED).body(saveDriverInfo);
		}
	}
	
	@PutMapping(path = "/edit")
	public ResponseEntity<DriverInfo> editDriverDetails(@RequestBody DriverInfo updateDriverDetails){
		
		
		DriverInfo isDeleted = updateDriverDetails;
		isDeleted.setIsDeleted(0);
		
		DriverInfo modifiedBy = updateDriverDetails;
		modifiedBy.setModifiedBy("Admin");
		
		DriverInfo modifiedDate = updateDriverDetails;
		modifiedDate.setModifiedDate(LocalDateTime.now());
		
		Long id = updateDriverDetails.getDriverId();
		
		Long number = updateDriverDetails.getDriverNumber();
		Optional<DriverInfo> entitynumber = repo.findByDriverNumber(number);
		
		String licNumber = updateDriverDetails.getLicenseNumber();
		Optional<DriverInfo> entitylic = repo.findByLicenseNumber(licNumber);
		
		Optional<DriverInfo> entity = repo.findById(id);
		DriverInfo updateDriverInfo = null;
		
		
		if(entitynumber.isPresent() && !(entitynumber.get().getDriverId() == updateDriverDetails.getDriverId()) && entitynumber.get().getIsDeleted() == 0) {
			
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
			
		}
		
		else if(entitylic.isPresent() && !(entitylic.get().getDriverId() == updateDriverDetails.getDriverId()) && entitylic.get().getIsDeleted() == 0) {
			
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);

		}
		
		else {
				updateDriverInfo = this.manageDriversDL.updateDriverDetails(updateDriverDetails);
				return ResponseEntity.status(HttpStatus.CREATED).body(updateDriverInfo);
		}
	}
}
		
	


	
	
	


