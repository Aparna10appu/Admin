package com.example.demo.businessLayer;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dataLayer.ComplaintsService;
import com.example.demo.entity.BookingRequest;
import com.example.demo.entity.Destination;
import com.example.demo.entity.SourceBO;
import com.example.demo.entity.TripCabInfo;
import com.example.demo.entity.UserComplaintsBO;
@Component
public class BusinessLayer {

	@Autowired
	ComplaintsService service;
	public TripCabInfo save(TripCabInfo info) {

		return this.service.save(info);
	}

	public List<UserComplaintsBO>  getComplaintsScreen() {

		return this.service.getComplaintsScreen();
	}

	

	public BookingRequest updateRemark(long bookingId, String remark) {
		// TODO Auto-generated method stub
		return this.service.updateRemarks(bookingId,remark);
	}

	public Long getCount() {
		
		return this.service.getcount();
	}

	public List<SourceBO> getSource() {
		// TODO Auto-generated method stub
		return this.service.getSource();
	}

	public List<Destination> getDestination() {
		// TODO Auto-generated method stub
		return this.service.getDestination();
	}

public List<UserComplaintsBO> getBySearch(String text, long skip, int limit) {
		
		return this.service.getBySearch(text,skip,limit);
	}


}
