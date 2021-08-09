package com.example.demo.businessLayer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dataLayer.AssignedCabsTripsheetDL;
import com.example.demo.entity.BookingRequest;
import com.example.demo.entity.Destination;
import com.example.demo.entity.DriverInfo;
import com.example.demo.entity.Employee;
import com.example.demo.entity.TripCabInfo;

@Component

public class AssignedCabsTripSheetBL {

	@Autowired
	private AssignedCabsTripsheetDL tripSheetDl;
	
	// For getting Booking request
	public List<BookingRequest> getBookingRequests() {
		return this.tripSheetDl.getBookingRequests();
	}
	
//	public TripCabInfo getCabDetailsByCabNumber() {
//		
//		return this.tripSheetDl.getCabDetailsByCabNumber();
//		
//	}

	

	public TripCabInfo gettripCabId(long tripCabId) {
		// TODO Auto-generated method stub
		return this.tripSheetDl.gettripCabId(tripCabId);
	}

	public List<BookingRequest> getBookingRequests(long tripCabId) {
		
		return this.tripSheetDl.getBookingRequests(tripCabId);
	}

    

	public DriverInfo getDriverInfo(long driverId) {
		// TODO Auto-generated method stub
		return this.tripSheetDl.getDriverInfo(driverId);
	}

	public void updateStartTime(long tripCabId) {
		this.tripSheetDl.updateStartTime(tripCabId);
		
	}

	public Employee getEmployeeName(String employeeId) {
		
		return this.tripSheetDl.getEmployeeName(employeeId);
	}

	public BookingRequest addEmployee(BookingRequest request, long tripCabId) {
		
		return this.tripSheetDl.addEmployee(request, tripCabId);
	}

	public boolean updateEmployee(BookingRequest request) {
		
		return this.tripSheetDl.updateEmployee(request);
	}

	public boolean deleteEmployee(long bookingId) {
		return this.tripSheetDl.deleteEmployee(bookingId);
	}

	public Destination getDestination(String destination) {
		
		return this.tripSheetDl.getDestination(destination);
	}

	public Employee getEmployeeId(String employeeName) {
		// TODO Auto-generated method stub
		return this.tripSheetDl.getEmployeeId(employeeName);
	}
	
	public TripCabInfo updateEndTime(long tripCabId) {
       return this.tripSheetDl.updateEndTime(tripCabId);
       
    }

	public BookingRequest updateReachedTime(long bookingId) {
		
		return this.tripSheetDl.updateReachedTime(bookingId);
	}

	public void updateCabStatus(long tripCabId) {
		
		this.tripSheetDl.updateCabStatus(tripCabId);
	}

	public void updateEmployeeStatus(long tripCabId, List<String> showList, List<String> noShowList) {
		
		this.tripSheetDl.updateEmployeeStatus(tripCabId, showList, noShowList);
	}

	public List<Employee> getAllEmployeeDetails() {
		
		return this.tripSheetDl.getAllEmployeeDetails();
	}

	public BookingRequest updateShow(long bookingId) {
		return this.tripSheetDl.updateShow(bookingId);
	}
	
}
