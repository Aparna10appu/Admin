package com.example.demo.dataLayer;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Destination;
import com.example.demo.entity.DropPoint;
import com.example.demo.entity.TimeSlot;
import com.example.demo.repository.DestinationRepository;
import com.mongodb.client.DistinctIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

@Service
public class DestinationDL {

	@Autowired
	DestinationRepository repo;
	@Autowired
	MongoTemplate mongoTemplate;



//	public List<Destination> getAllRoute() {
//		// TODO Auto-generated method stub
//		 
//			List<Destination>	optObj =  this.repo.findByIsDeleted('0');
//			
//			return optObj;
//	}

	public List<Destination> findAll() {
		return repo.findAll();
	}

	public Optional<Destination> findById(Integer id) {
		return repo.findById(id);
	}

//	public Optional<Destination> deleteByDestination(Destination deleteInfo) {
//		return repo.findByDestination(deleteInfo);
//		
//	}

	public List<String> findAllDestName() {

		List<String> destNameList = new ArrayList<>();

		MongoCollection mongoCollection = mongoTemplate.getCollection("destination");

		DistinctIterable distinctIterable = mongoCollection.distinct("destName", String.class);

		MongoCursor cursor = distinctIterable.iterator();

		while (cursor.hasNext()) {
			String destName = (String) cursor.next();
			destNameList.add(destName);
		}
		return destNameList;
	}

	public Destination addDestination(Destination entity) {
		// TODO Auto-generated method stub
		//Destination reqRoute = entity;
		
		
		
		entity.setDestinationId(repo.count()+1);
		
		
		entity.setIsDeleted(0);
    	
    	//Destination createdBy=entity;
		entity.setCreatedBy("Admin");
    	
    	//Destination createdDate=entity;
		entity.setCreatedDate(LocalDateTime.now());
    	
		Destination dest=this.repo.save(entity);
		
		
		return dest;
	}

	public Destination addDropPoint(Destination destInfo) {
		// TODO Auto-generated method stub
		return this.repo.save(destInfo);
	}

	public Destination addTimeSlot(Destination destInfo) {
		// TODO Auto-generated method stub
		return this.repo.save(destInfo);
	}

//	public List<Destination> findByDestination(String destination) {
//		// TODO Auto-generated method stub
//		return this.repo.findByDestination(destination);
//	}

public Destination deleteRoute(String destination) {
        
    Optional< Destination> route = this.repo.findByDestination(destination);
       Destination deletedRoute = route.get();
  //   int deleteToken = route.getIsDeleted();
    // Destination del = null;
     
     
       deletedRoute.setIsDeleted(1);
       deletedRoute.setModifiedBy("Admin");
 
       deletedRoute.setModifiedDate(LocalDateTime.now());
        return this.repo.save(deletedRoute);
    }

public List<Destination> findByIsDeleted(int c) {
	// TODO Auto-generated method stub
	return this.repo.findByIsDeleted(c);
}
}

//	private DestinationRepo repo;
//
//	public DestinationDL(DestinationService service) {
//		super();
//		this.service = service;
//	}
//
//	public Destination save(Destination entity) {
//		return service.save(entity);
//	}
//
//	public List<Destination> findAll() {
//		return service.findAll();
//	}
//
//	public List<Destination> findByDestName(String destName) {
//		return service.findByDestName(destName);
//	}
//
//	public Optional<Destination> findById(Integer id) {
//		return service.findById(id);
//	}
//
//	public void deleteById(Integer id) {
//		service.deleteById(id);
//	}
//	
//	
//	//public boolean checkIfDropPointExists(destId,entity) {
////		Optional<Destination> optDestObj = this.service.findById(destId);
////		boolean result = false;
////		
////		Destination destObj = null;
////		DropPoint dropPointObj = null;
////		if (optDestObj.isPresent()) {
////			destObj = optDestObj.get();
////			
////			
////			if(dropPointObj==entity) {
////				System.out.println("drop point already exists");}
////			else {
////				if(!result && destObj.addDropPointToList(entity)) {
////					dropPointObj = entity;
////					return	ResponseEntity.status(HttpStatus.OK).body(dropPointObj);
////
////				}
////				    else {
////				    	throw new RuntimeException("DropPoint didn't added");
////				    }
////				
////			}
//				
//			
//			//call BL to check if drop point already exists -- beg
//			  // boolean result = checkIfDropPointExists(destinationID,entity);
//			//call BL to check if drop point already exists -- end
//			
//			
//		
//	//	return	ResponseEntity.status(HttpStatus.OK).body(dropPointObj);
//		
//	//}
//
//	//call BL to check if drop point already exists -- beg
//	  // boolean result = checkIfDropPointExists(destinationID,entity);
//	//call BL to check if drop point already exists -- end

//
////}
//
//	public ResponseEntity<List<DropPoint>> addDestinationByDropPoint(int destId,List<DropPoint> dropPoint) {
//		
//		Optional<Destination> optDestObj = this.service.findById(destId);
//		boolean result = false;
//		
//		Destination destObj = null;
//		List<DropPoint> dropPointObj = null;
//		if (optDestObj.isPresent()) {
//			destObj = optDestObj.get();
//			
//			
//			if(dropPointObj==dropPoint) {
//				System.out.println("drop point already exists");}
//			else {
//				if(!result && destObj.addDropPointToList(dropPoint)) {
//					dropPointObj = dropPoint;
//					return	ResponseEntity.status(HttpStatus.OK).body(dropPointObj);
//
//				}
//				    else {
//				    	throw new RuntimeException("DropPoint didn't added");
//				    }
//				
//			}
//		
//	}
//		return service.addDestinationByDropPoint(dropPoint);
// }}