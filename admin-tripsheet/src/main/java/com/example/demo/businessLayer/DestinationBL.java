package com.example.demo.businessLayer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;


import com.example.demo.entity.Destination;
import com.example.demo.entity.DropPoint;


@Component
public class DestinationBL {

	@Autowired
	private com.example.demo.dataLayer.DestinationDL dlLayer;
	

	public List<Destination> findAll() {
		return dlLayer.findAll();
	}
	
	

//	public List<DropPoint> addDestinationByDropPoint(int destId, List<DropPoint> dropPoint) {
//		return dlLayer.addDestinationByDropPoint(destId, dropPoint);
//	}

	public Optional<Destination> findById(Integer id) {
		return dlLayer.findById(id);
	}

//	public Optional<Destination> deleteByDestination(Destination deleteInfo) {
//		return dlLayer.deleteByDestination(deleteInfo);
//	}

	public int hashCode() {
		return dlLayer.hashCode();
	}

	public boolean equals(Object obj) {
		return dlLayer.equals(obj);
	}

	public String toString() {
		return dlLayer.toString();
	}

	public Destination addDestination(Destination entity) {
		// TODO Auto-generated method stub
		return this.dlLayer.addDestination(entity);
	}

//	public List<Destination> getAllRoute() {
//		// TODO Auto-generated method stub
//		return this.dlLayer.getAllRoute();
//	}



	public List<Destination> finfByIsDeleted(int c) {
		// TODO Auto-generated method stub
		return this.dlLayer.findByIsDeleted(c);
	}

}
