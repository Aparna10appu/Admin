package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.businessLayer.AssignedCabBL;
import com.example.demo.entity.Destination;
import com.example.demo.entity.DriverInfo;
import com.example.demo.entity.SourceBO;
import com.example.demo.entity.TripCabInfo;
import com.example.demo.entity.TripDetails;



@RestController
@RequestMapping(path = "/api/v1")

public class AssignedCabController {
	@Autowired
	AssignedCabBL bl;

	@Autowired
	com.example.demo.repository.DriverInfoRepository driverrepo;
//----------------------------------AssignedCab Method Starts--------------------------------------------------	

// FindAll method--->starts

	@GetMapping(path = "/assignedCab/cabs")
	public ResponseEntity<List<TripCabInfo>> findAll() {

		List<TripCabInfo> trip = this.bl.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(trip);
	}
//-------------------------------------------------------------------------------------------	

// To add source to dropDown ---> controller
	@PostMapping(path = "/source")
	public ResponseEntity<SourceBO> addSource(@RequestBody SourceBO source) {
		SourceBO src = this.bl.save(source);
		return ResponseEntity.status(HttpStatus.OK).body(src);
	}

	@GetMapping(path = "/sourcelist")
	public ResponseEntity<List<SourceBO>> getSource() {
		List<SourceBO> source = this.bl.findSource();
		return ResponseEntity.status(HttpStatus.OK).body(source);
	}
	// ----> source ---> end

//---------------------------------------------------------------------------------------  
//-->To add Destination List to dropDown - starts

	@PostMapping(path = "/destination")
	public ResponseEntity<Destination> addDestination(@RequestBody Destination des) {

		Destination desBo = this.bl.save(des);
		return ResponseEntity.status(HttpStatus.OK).body(desBo);
	}

	@GetMapping(path = "/destinationlist")
	public ResponseEntity<List<Destination>> getDestination() {
		List<Destination> dest = this.bl.findDestination();
		return ResponseEntity.status(HttpStatus.OK).body(dest);
	}
// ----- Destination ends  

//---------------------------------------------------------------------------------------   

// Using MongoTemplate for (FilterRequest)  
	@GetMapping("/filter/{source}/{destination}/{timeSlot}/{skip}/{limit}")
	public ResponseEntity<List<TripDetails>> getByFilterRequest(@PathVariable("source") String source,
			@PathVariable("destination") String destination, @PathVariable("timeSlot") String timeSlot,
			@PathVariable("skip") long skip, @PathVariable("limit") int limit) {
	
     List<TripDetails> details= this.bl.getByFilter(source,destination,timeSlot,skip,limit);
     return ResponseEntity.status(HttpStatus.OK).body(details); 
	}

//---------------------------------------------------------------------------------------   
// Scroll method with MongoTemplate to Fetch all AssignedCabs-------FindAll
	@GetMapping(path = "/scroll/{skip}/{limit}")
	public ResponseEntity<List<TripDetails>> getAssignedCabByScroll(@PathVariable("skip") long skip,
			@PathVariable("limit") int limit) {
		//System.out.println("scroll method called");
		List<TripDetails> details= this.bl.getAssignedCabByScroll(skip,limit);
		//System.out.println(details);
		return ResponseEntity.status(HttpStatus.OK).body(details);
	}

//---------------------------------------------------------------------------------------
// To get the data count
	@GetMapping(path = "/count")
	public ResponseEntity<Long> getCount() {
		Long count = this.bl.getCount();
		return ResponseEntity.status(HttpStatus.OK).body(count);
	}

//--------------------------------------------------------------------------------------
//Search Method
	@GetMapping(path = "/{searchValue}/{skip}/{limit}")
	public ResponseEntity<?> getByTextSearch(@PathVariable(name = "searchValue") String text,
			@PathVariable("skip") long skip, @PathVariable("limit") int limit) {

    List<TripDetails> details= this.bl.getByTextSearch(text,skip,limit);
    return ResponseEntity.status(HttpStatus.OK).body(details);
	
	}
// Search----> ends.

//---------------------------------AssignedCab Methods End-------------------------------------------------------	



	@PostMapping(path = "/driver")
	public ResponseEntity<DriverInfo> addDriver(@RequestBody DriverInfo driver) {

		DriverInfo drv = this.bl.save(driver);
		return ResponseEntity.status(HttpStatus.OK).body(drv);
	}
}
