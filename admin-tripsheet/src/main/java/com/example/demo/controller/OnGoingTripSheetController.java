package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.businessLayer.AssignedCabsTripSheetBL;
import com.example.demo.entity.BookingRequest;
import com.example.demo.entity.DriverInfo;
import com.example.demo.entity.TripCabInfo;
import com.example.demo.entity.TripCabInfo_2;

@RestController
@RequestMapping(path="/api/v1/")
@CrossOrigin(origins = "*")
public class OnGoingTripSheetController {
	
	@Autowired
	private AssignedCabsTripSheetBL tripSheetBl;

	
	//get cab details and employee details
		@GetMapping(path = "/ongoingtripsheet/{tripCabId}")
		public ResponseEntity<TripCabInfo_2> gettripCabId(@PathVariable ("tripCabId" ) long tripCabId){
			
			TripCabInfo cab= this.tripSheetBl.gettripCabId(tripCabId);
			
			List<BookingRequest> booking=this.tripSheetBl.getBookingRequests(tripCabId);
			
			DriverInfo driver=this.tripSheetBl.getDriverInfo(cab.getDriverId());
			
			TripCabInfo_2 cab2=new  TripCabInfo_2(tripCabId, cab.getCabNumber() , driver , cab.getSource() , cab.getDestination(), cab.getDateOfTravel(), cab.getTimeSlot() , cab.getTotalSeats(), cab.getAllocatedSeats(), cab.getRemainingSeats(), cab.getStatus(), cab.getStartTime(), cab.getEndTime(), booking);
			
			return ResponseEntity.status(HttpStatus.OK).body(cab2);
		}
		
		
		//startTime	
		//endTime
		@PutMapping(path= "/ongoingtripsheet/endtime/{tripCabId}")
		public ResponseEntity<TripCabInfo> updateEndTime(@PathVariable ("tripCabId" ) long tripCabId)
		{
			TripCabInfo trip = this.tripSheetBl.updateEndTime(tripCabId);
			return ResponseEntity.status(HttpStatus.OK).body(trip);
		}
		
	    @PutMapping(path = "/update/reachedtime/{bookingId}")
		public BookingRequest updateReachedTime(@PathVariable ("bookingId" ) long bookingId) {
	    	
	    	return this.tripSheetBl.updateReachedTime(bookingId);
	    }

	    @PutMapping(path = "/update/time/status/{tripCabId}/{showList}/{noShowList}")
	    public ResponseEntity<Boolean> updateTimeAndStatus(@PathVariable ("tripCabId" ) long tripCabId, @PathVariable ("showList" ) List<String> showList, @PathVariable ("noShowList" ) List<String> noShowList) {
	    	
	    	this.tripSheetBl.updateCabStatus(tripCabId);
	    	this.tripSheetBl.updateEmployeeStatus(tripCabId, showList, noShowList);
			return ResponseEntity.status(HttpStatus.OK).body(true);
	    }
	    
	    
}