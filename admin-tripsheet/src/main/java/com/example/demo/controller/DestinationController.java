package com.example.demo.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.entity.Destination;
import com.example.demo.entity.DropPoint;
import com.example.demo.entity.TimeSlot;

import com.example.demo.repository.DestinationRepository;

@RestController
@RequestMapping(path = "/api/v1/")
@CrossOrigin(origins = "*")
public class DestinationController {

	@Autowired
	com.example.demo.dataLayer.DestinationDL dlLayer;
	@Autowired
	com.example.demo.businessLayer.DestinationBL blLayer;
	@Autowired
	DestinationRepository repo;

	
	
	@GetMapping(path = "/managingRoute")
	public ResponseEntity<List<Destination>> getAllRoute() {

		List<Destination> destination = this.blLayer.finfByIsDeleted(0);

		return ResponseEntity.status(HttpStatus.OK).body(destination);
	}


	@PostMapping(path = "/managingRoute/newRoute")
	public ResponseEntity<Destination> addNewRoute(@RequestBody Destination entity) {
		
		Optional<Destination> dest=	repo.findByDestination(entity.getDestination());
		if(dest.isPresent() ) {
			if(dest.get().getIsDeleted()==1){
			//	dest.get().setIsDeleted(0);
				repo.save(entity);
				return ResponseEntity.status(HttpStatus.CREATED).body(entity);
			}
		
			else {
				return ResponseEntity.status( HttpStatus.ALREADY_REPORTED).body(entity);
			}
				
		}
			
	Destination post = blLayer.addDestination(entity);
    	
		return ResponseEntity.status(HttpStatus.CREATED).body(post);
	}

	
	
	
	
	@PutMapping(path="/put/deleteRouteDetails/{destination}")
    public ResponseEntity<Destination> deleteRoute(@PathVariable("destination") String destination)
    {      
           
		Destination RouteInfo=this.dlLayer.deleteRoute(destination);
       
        return ResponseEntity.status(HttpStatus.OK).body(RouteInfo);
    }
	
	

	
	
	@PutMapping(path="/updateRouteInfo/{destination}")
	public ResponseEntity<Destination> editRouteDetails(@PathVariable("destination") String destination,
			@RequestBody Destination updateRouteInfo)
	{
		
		
		Destination dest=repo.findByDestination(destination).get();
		dest.setIsDeleted(0);
		
		dest.setModifiedBy("Admin");
		dest.setModifiedDate(LocalDateTime.now());
		
		Destination saveRouteInfo=null;
		
		dest.setTimeSlots(updateRouteInfo.getTimeSlots());
		dest.setDropPoints(updateRouteInfo.getDropPoints());
		
    	saveRouteInfo = repo.save(dest);
    	
    	
		return ResponseEntity.status(HttpStatus.OK).body(saveRouteInfo);
	}
    
   
	@GetMapping(path = "/editRoute/{destination}")
	public ResponseEntity<Destination> getDestinationDetails(@PathVariable ("destination") String destination){
		Optional<Destination> details = this.repo.findByDestination(destination);
		return ResponseEntity.status(HttpStatus.OK).body(details.get());
	}

	@GetMapping(path = "/managigRoute/all/destName")
	public ResponseEntity<List<String>> getdestName() {
		List<String> destName = this.dlLayer.findAllDestName();

		return ResponseEntity.status(HttpStatus.OK).body(destName);
	}
  

//	@PutMapping(path = "/route/addDropPoint")
//	public ResponseEntity<Destination> addDropPoint(@RequestBody Destination destInfo) {
//
//		Destination isDeleted = destInfo;
//    	isDeleted.setIsDeleted('0');
//    	
//    	Destination modifiedBy=destInfo;
//    	modifiedBy.setModifiedBy("Admin");
//    	
//    	Destination modifiedDate=destInfo;
//    	modifiedDate.setModifiedDate(LocalDate.now());
//		
//		
//		Destination post = dlLayer.addDropPoint(destInfo);
//
//		return ResponseEntity.status(HttpStatus.CREATED).body(post);
//	}
//
//	@PutMapping(path = "/route/addTimeSlot")
//	public ResponseEntity<Destination> addTimeSlot(@RequestBody Destination destInfo) {
//
//		
//
//		Destination isDeleted = destInfo;
//    	isDeleted.setIsDeleted('0');
//    	
//    	Destination modifiedBy=destInfo;
//    	modifiedBy.setModifiedBy("Admin");
//    	
//    	Destination modifiedDate=destInfo;
//    	modifiedDate.setModifiedDate(LocalDate.now());
//		
//		Destination post = dlLayer.addTimeSlot(destInfo);
//
//		return ResponseEntity.status(HttpStatus.CREATED).body(post);
//	}
//	
//	

	

}

