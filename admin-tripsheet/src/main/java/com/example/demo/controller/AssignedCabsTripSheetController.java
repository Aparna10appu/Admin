package com.example.demo.controller;

import java.time.LocalTime;
import java.util.List;
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

import com.example.demo.businessLayer.AssignedCabsTripSheetBL;
import com.example.demo.entity.BookingRequest;
import com.example.demo.entity.Destination;
import com.example.demo.entity.DriverInfo;
import com.example.demo.entity.Employee;
import com.example.demo.entity.TripCabInfo;
import com.example.demo.entity.TripCabInfo_2;

@RestController
@RequestMapping(path="/api/v1/")
public class AssignedCabsTripSheetController {
	
	@Autowired
	private AssignedCabsTripSheetBL tripSheetBl;	
	
	//get cab details and employee details
	@GetMapping(path = "/tripsheet/{tripCabId}")
	public ResponseEntity<TripCabInfo_2> gettripCabId(@PathVariable ("tripCabId" ) long tripCabId){
		TripCabInfo cab= this.tripSheetBl.gettripCabId(tripCabId);
		
		if(cab.getStatus().equalsIgnoreCase("Cancelled")) {
			return ResponseEntity.status(233).body(null);
		}
		
		List<BookingRequest> booking=this.tripSheetBl.getBookingRequests(tripCabId);
		
		DriverInfo driver=this.tripSheetBl.getDriverInfo(cab.getDriverId());
		
		TripCabInfo_2 cab2=new  TripCabInfo_2(tripCabId, cab.getCabNumber() , driver , cab.getSource() , cab.getDestination(), cab.getDateOfTravel(), cab.getTimeSlot() , cab.getTotalSeats(), cab.getAllocatedSeats(), cab.getRemainingSeats(), cab.getStatus(), cab.getStartTime(), cab.getEndTime(), booking);
		
		if(cab2.getStartTime() != null)
		{
			return ResponseEntity.status(232).body(cab2);
		} 
		return ResponseEntity.status(HttpStatus.OK).body(cab2);
	}
	
	
	//startTime
	@PutMapping(path= "/tripsheet/starttime/{tripCabId}")
	public void updateStartTime(@PathVariable ("tripCabId" ) long tripCabId)
	{
		this.tripSheetBl.updateStartTime(tripCabId);
	}
	

	//get employee name
	
	@GetMapping(path = "/tripsheet/employee/{employeeId}")
	public ResponseEntity<Employee> getEmployeeName(@PathVariable ("employeeId") String employeeId)
	{
		Employee emp=this.tripSheetBl.getEmployeeName(employeeId);
		
		return ResponseEntity.status(HttpStatus.OK).body(emp);
		
	}
	
	@GetMapping(path = "/tripsheet/employeeName/{employeeName}")
	public ResponseEntity<Employee> getEmployeeId(@PathVariable ("employeeName") String employeeName)
	{
		Employee emp=this.tripSheetBl.getEmployeeId(employeeName);
		
		return ResponseEntity.status(HttpStatus.OK).body(emp);
		
	}
	
	
	//add new employee
	@PostMapping(path = "/tripsheet/addemployee/{tripCabId}")
    public ResponseEntity<BookingRequest> addEmployee(@RequestBody BookingRequest request, @PathVariable("tripCabId") long tripCabId)
    {
       
        BookingRequest req=this.tripSheetBl.addEmployee(request, tripCabId);
       
        if(req==null) {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(req);
        }
       
        return ResponseEntity.status(HttpStatus.OK).body(req);
               
    }
	
	
	
	//update drop point
	
	@PutMapping(path = "/tripsheet/update/droppoint")
	public ResponseEntity<Boolean> updateEmployee(@RequestBody BookingRequest request)
	{
		boolean req=this.tripSheetBl.updateEmployee(request);
		
		return ResponseEntity.status(HttpStatus.OK).body(req);
				
	}
	
	//delete employee
	@PutMapping(path= "/tripsheet/delete/booking/{bookingId}")
	public ResponseEntity<Boolean> deleteEmployee(@PathVariable ("bookingId") long bookingId)
	{
		boolean req=this.tripSheetBl.deleteEmployee(bookingId);
		return ResponseEntity.status(HttpStatus.OK).body(req);
	}
	
	//get drop points
	@GetMapping(path = "/tripsheet/droppoints/{destination}")
	public ResponseEntity<Destination> getDestination(@PathVariable ("destination") String destination)
	{
		Destination dest=this.tripSheetBl.getDestination(destination);
		return ResponseEntity.status(HttpStatus.OK).body(dest);
	}
	
	
	
	//get employee details
	@GetMapping(path= "/tripsheet/getallemployee")
	public ResponseEntity<List<Employee>> getAllEmployeeDetails(){
		List<Employee> employees=this.tripSheetBl.getAllEmployeeDetails();
		return ResponseEntity.status(HttpStatus.OK).body(employees);
	}
	
	//update Show Status
	@PutMapping(path="/tripsheet/show/{bookingId}")
	public ResponseEntity<BookingRequest> updateShow(@PathVariable ("bookingId") long bookingId){
		BookingRequest req=this.tripSheetBl.updateShow(bookingId);
		return ResponseEntity.status(HttpStatus.OK).body(req);
	}
	
	
	
	
	//serverTime
	
	@GetMapping(path = "/serverTime")
	public LocalTime getServerTime() {
		return LocalTime.now();
	}
	
	
	
	
}
