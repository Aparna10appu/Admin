package com.example.demo.businessLayer;

import java.util.List;
import java.util.Set;

import com.example.demo.dataLayer.AssigningDL;
import com.example.demo.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.example.demo.entity.AssigningBO;
import com.example.demo.dataLayer.AssigningDL;
import com.example.demo.entity.SourceBO;

@Component
public class AssigningBL {

	@Autowired
	private AssigningDL assigningDL;
	
//-------------------------------------------------Today's request page starts here---------------------------------------------//
	
	public AssigningBL(AssigningDL data) {
		super();
		this.assigningDL = data;
	}
	

	public BookingRequest addRequest(BookingRequest booking) 
	{
		return this. assigningDL.addRequest(booking) ;
	}


	public List<BookingRequest> findAllBooks() 
	{
		return this.assigningDL.findAllBooks();
	}


	public List<BookingRequest> filterRequests(Query dynamicQuery) {
		// TODO Auto-generated method stub
		return this.assigningDL.filterRequests(dynamicQuery);
	}


	public Long deleteRequest(Long bookingID) {
		// TODO Auto-generated method stub
		return this.assigningDL.deleteRequest(bookingID);
	}


	public List<SourceBO> findAllSources() {
		// TODO Auto-generated method stub
		return this.assigningDL.findAllSources();
	}


	public SourceBO addSource(SourceBO source) {
		// TODO Auto-generated method stub
		return this.assigningDL.addSource(source);
	}


	public List<Destination> findAllDestinations() {
		// TODO Auto-generated method stub
		return this.assigningDL.findAllDestinations();
	}


	public Destination addDestination(Destination dest) {
		// TODO Auto-generated method stub
		return this.assigningDL.addDestination(dest);
	}

	public Long getCount() {
		// TODO Auto-generated method stub
		return this.assigningDL.getCount();
	}


	public List<BookingRequest> findAllBooking(Query query) {
		// TODO Auto-generated method stub
		return this.assigningDL.findAllBooking(query);
	}


	public List<BookingRequest> searchByName(Query query) {
		// TODO Auto-generated method stub
		return this.assigningDL.searchByName(query);
	}
	
	
//-------------------------------------------------Today's request page ends here---------------------------------------------//
	
	
//--------------------------------------------------Assign to cab pop up starts here-------------------------------------------//
     // Find all Cab Model as List
		public Set<String> findAllCabModel(int i) {
		
		return this.assigningDL.findAllCabModel(0);
	}
	 
	
	// Find all CabInfo
    public List<CabInfo> findAllCabInfo(){
    	return this.assigningDL.findAllCabInfo();
    }
    
    // Save cabInfo
	public CabInfo save(CabInfo entity) {
		
		return this.assigningDL.save(entity);
	}
	
	// Find Cab Info By CabModel
	public List<CabInfo> findByCabModel(String cabModel){
		
		return this.assigningDL.findByCabModel(cabModel);
	}
	
	// Find All DriverInfo
	public List<DriverInfo> findAllDriverInfo(){
		
		return this.assigningDL.findAllDriverInfo();
	}
	
	// Save DriverInfo
	public DriverInfo save(DriverInfo entity) {
		
		return this.assigningDL.save(entity);
	}
	
	// Find all Employee Details
//	public List<EmployeeInfo> findAllEmployeeInfo(){
//		
//		return this.assigningDL.findAllEmployeeInfo();
//	}
//
//	// Save Employee Info
//	public EmployeeInfo save(EmployeeInfo entity){
//		
//		return this.assigningDL.save(entity);
//	}
	
	// Find all Booking Request
	public List<BookingRequest> findAllBookingReq(){
			
		return this.assigningDL.findAllBookingReq();
	}

	// Save Booking Request
	public BookingRequest save(BookingRequest entity){
			
		return this.assigningDL.save(entity);
	}
	
	// Find all Trip Details
	public List<TripCabInfo> findAllTrips(){
				
		return this.assigningDL.findAllTrips();
	}

	// Save Trip Details
	public TripCabInfo save(TripCabInfo entity){
				
		return this.assigningDL.save(entity);
	}

	// Get Cab number by cab model, destination, timeslot and selected number of employee's
	public List<AssigningBO> getCabNumber(String cabModel, Integer selected, String destination, String timeSlot){
	
       return this.assigningDL.findCabNumber(cabModel, selected, destination, timeSlot);
	}

	// To update and save in the Trip cab info , update in Booking Request table
	public AssigningBO saveTrip(AssigningBO info) {
		//code to only pass non-cancelled requests to next line
		return this.assigningDL.storeTrip(info);
	}
	
	//code to check if status is not cancelled or Assigned already
	public boolean checkEmpStatusBeforeAssignment(AssigningBO empList) {
		return this.assigningDL.checkEmpStatusBeforeAssignment(empList.getEmpList());
	}


//--------------------------------------------------Assign to cab pop up ends here-------------------------------------------//

}
