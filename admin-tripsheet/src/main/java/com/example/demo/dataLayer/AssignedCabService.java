package com.example.demo.dataLayer;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Destination;
import com.example.demo.entity.DriverInfo;
import com.example.demo.entity.SourceBO;
import com.example.demo.entity.TripCabInfo;
import com.example.demo.entity.TripDetails;



@Service(value ="AssignedCabService")
public class AssignedCabService {
	@Autowired
	MongoTemplate template;
	@Autowired
    private com.example.demo.repository.AssignedCabRepository repo;
	@Autowired
    com.example.demo.repository.SourceRepository reposrc;
	@Autowired
	com.example.demo.repository.DestinationRepository repos;
	@Autowired
	com.example.demo.repository.DriverInfoRepository repodrv;
	
	public TripCabInfo save(TripCabInfo info) {
		//info.setCabid(repo.count() +1);
		int count = (int) repo.count()+1;
		info.setTripCabId(count);
      return this.repo.save(info);
	}

	public List<TripCabInfo> findAll() {
		System.out.println(repo.count());
		return this.repo.findAll();
	}

	public Long getCount() {
		List<TripCabInfo> tripcount= this.repo.findAll().stream().filter(e-> e.getStatus().equals("Onprogress")|| e.getStatus().equals("Assigned")).collect(Collectors.toList());
		
		return (long) tripcount.size();
	}

	public List<SourceBO> findSource() {
		
		return this.reposrc.findAll();
	}
 
	public List<Destination> findByDestination() {
		
		return this.repos.findAll();
	}
	
	public List<TripDetails> getAssignedCabByScroll(long skip, int limit) {
		Query query = new Query();
		Criteria criteria1 = Criteria.where("status").is("Onprogress");
		Criteria criteria2 = Criteria.where("status").is("Assigned");
		Criteria criteria = new Criteria();
		criteria.orOperator(criteria1,criteria2);
		query.addCriteria(criteria);
		query.limit(limit).skip(skip);

		List<TripCabInfo> cabs = this.template.find(query, TripCabInfo.class, "TripCabInfo");
		List<TripDetails> details= new ArrayList<>();
		for(TripCabInfo eachtrip: cabs) {
			Optional<DriverInfo> driver=this.repodrv.findById(eachtrip.getDriverId());
			DriverInfo drv= driver.get();
			TripDetails trip=new TripDetails(eachtrip.getTripCabId(), eachtrip.getCabNumber(), drv, eachtrip.getSource(), eachtrip.getDestination(), eachtrip.getDateOfTravel(), eachtrip.getTimeSlot(), eachtrip.getTotalSeats(), eachtrip.getAllocatedSeats(), eachtrip.getRemainingSeats(), eachtrip.getStatus(), eachtrip.getStartTime(), eachtrip.getEndTime(), eachtrip.getCreatedBy(), eachtrip.getCreatedDate(), eachtrip.getModifiedDate(), eachtrip.getModifiedBy(), eachtrip.getIsDeleted());
		    details.add(trip);
		}
		return details;
	}

  public List<TripDetails> getByFilter(String source, String destination, String timeSlot, long skip, int limit) {
		Query dynamicQuery = new Query();
		if (!(source.equals("0"))) {
			Criteria sourceCriteria = Criteria.where("source").is(source);
			dynamicQuery.addCriteria(sourceCriteria);
		}
		if (!(destination.equals("0"))) {
			Criteria destinationCriteria = Criteria.where("destination").is(destination);
			dynamicQuery.addCriteria(destinationCriteria);

		}
		dynamicQuery.limit(limit).skip(skip);
		Criteria criteria1 = Criteria.where("status").is("Onprogress");
		Criteria criteria2= Criteria.where("status").is("Assigned");
		Criteria criteria3= new Criteria();
		criteria3.orOperator(criteria1,criteria2);
		dynamicQuery.addCriteria(criteria3);
		//dynamicQuery.addCriteria(criteria2);
		List<TripCabInfo> result = template.find(dynamicQuery, TripCabInfo.class, "TripCabInfo");
		List<TripDetails> details= new ArrayList<>();
		for(TripCabInfo eachtrip: result) {
			Optional<DriverInfo> driver=this.repodrv.findById(eachtrip.getDriverId());
			DriverInfo drv= driver.get();
			TripDetails trip=new TripDetails(eachtrip.getTripCabId(), eachtrip.getCabNumber(), drv, eachtrip.getSource(), eachtrip.getDestination(), eachtrip.getDateOfTravel(), eachtrip.getTimeSlot(), eachtrip.getTotalSeats(), eachtrip.getAllocatedSeats(), eachtrip.getRemainingSeats(), eachtrip.getStatus(), eachtrip.getStartTime(), eachtrip.getEndTime(), eachtrip.getCreatedBy(), eachtrip.getCreatedDate(), eachtrip.getModifiedDate(), eachtrip.getModifiedBy(), eachtrip.getIsDeleted());
		    details.add(trip);
		}
		if (!(timeSlot.equals("0"))) {

			LocalTime lt = LocalTime.parse(timeSlot);
			List<TripDetails> timeFilter = details.stream().filter(e -> e.getTimeSlot().equals(lt))
					.collect(Collectors.toList());
			
			return timeFilter;
		}
		return details;
		
	}

//      @GetMapping("/filter/{source}/{destination}/{timeSlot}/{skip}/{limit}")
//	       public List<TripCabInfo> getByFilter(@PathVariable("source") String source,@PathVariable("destination") String destination,@PathVariable("timeSlot") String timeSlot,@PathVariable("skip") long skip,@PathVariable("limit") int limit){
//	           Query dynamicQuery = new Query();
//	           if (!(source.equals("0")))
//	           {
//	              Criteria sourceCriteria = Criteria.where("source").is(source);
//	              dynamicQuery.addCriteria(sourceCriteria);
//	           }
//	           if (!(destination.equals("0")))
//	           {
//	              Criteria destinationCriteria =     Criteria.where("destination").is(destination);
//	              dynamicQuery.addCriteria(destinationCriteria);
//	           }
//	          
//	          
//	           Criteria criteria = Criteria.where("status").is("booked");
//	            dynamicQuery.addCriteria(criteria);
//	          
//	           
//	          
//	        //   List<BookingRequestBO> result1=result.stream().skip(skip).limit(limit).collect(Collectors.toList());
//	          
//	         
//	          
//	          
//	           if (!(timeSlot.equals("0")))
//	           {
////	               LocalTime lt=LocalTime.parse(timeSlot);
////	               List<BookingRequestBO> timeFilter= result.stream().filter(e->e.getTimeSlot().equals(lt)).collect(Collectors.toList());
////	            //   List<BookingRequestBO> timeFilter1=timeFilter.stream().skip(skip).limit(limit).collect(Collectors.toList());
////	               return timeFilter;
//	              
//	               String splittedTimeSlot[] = timeSlot.split(":"); //System.out.println(timeSlot);
//	              // System.out.println(splittedTimeSlot[0]);
//	               Criteria timeSlotCriteria =     Criteria.where("timeSlot").is(LocalTime.of(Integer.parseInt(splittedTimeSlot[0]), Integer.parseInt(splittedTimeSlot[1]), Integer.parseInt(splittedTimeSlot[2])));
//	               
//	                  dynamicQuery.addCriteria(timeSlotCriteria);
//	              
//	           }
//	          
//	           dynamicQuery.limit(limit).skip(skip);
//	          
//	           List<TripCabInfo> result=this.template.find(dynamicQuery, TripCabInfo.class,"TripCabInfo");
//	          
//	          // System.out.println(result.size());
//	          return result;
//	       }
	

	public List<TripDetails> getBySearch(String text, long skip, int limit) {
		
		Query query = new Query();
		Query driverquery = new Query();
		Query statusquery=new Query();
		
		Criteria c = Criteria.where("driverName").regex(text, "i");
		driverquery.addCriteria(c);
		List<DriverInfo> drvinfo= template.find(driverquery, DriverInfo.class);
		Criteria criteria1 = Criteria.where("status").is("Onprogress");
		Criteria criteria2 = Criteria.where("status").is("Assigned");
		Criteria criteria = new Criteria();
		criteria.orOperator(criteria1,criteria2);
		statusquery.addCriteria(criteria);
		List<TripCabInfo> tripcabs= template.find(statusquery, TripCabInfo.class);
		if(!drvinfo.isEmpty() ) {
			List<TripCabInfo> trips= new ArrayList<>();
			for(DriverInfo d: drvinfo) {
				 trips = tripcabs.stream().filter(e-> e.getDriverId()==(d.getDriverId())).collect(Collectors.toList());
			}
			List<TripDetails> details= new ArrayList<>();
			for(TripCabInfo eachtrip: trips) {
				Optional<DriverInfo> driver=this.repodrv.findById(eachtrip.getDriverId());
				DriverInfo drv= driver.get();
				TripDetails trip=new TripDetails(eachtrip.getTripCabId(), eachtrip.getCabNumber(), drv, eachtrip.getSource(), eachtrip.getDestination(), eachtrip.getDateOfTravel(), eachtrip.getTimeSlot(), eachtrip.getTotalSeats(), eachtrip.getAllocatedSeats(), eachtrip.getRemainingSeats(), eachtrip.getStatus(), eachtrip.getStartTime(), eachtrip.getEndTime(), eachtrip.getCreatedBy(), eachtrip.getCreatedDate(), eachtrip.getModifiedDate(), eachtrip.getModifiedBy(), eachtrip.getIsDeleted());
			    details.add(trip);
			}
			
			return details;
	
		}else {
			//Criteria c1 = Criteria.where("driverName").regex(text, "i");
			Criteria c2 = Criteria.where("cabNumber").regex(text, "i");
			Criteria c3 = Criteria.where("status").is("Onprogress");
			Criteria c4 = Criteria.where("status").is("Assigned");
			Criteria c1 = new Criteria();
		     c1.orOperator( c3,c4);
			query.addCriteria(c2);
			query.addCriteria(c1);
			
			query.skip(skip).limit(limit);
			List<TripCabInfo> search = template.find(query, TripCabInfo.class);
			List<TripDetails> details= new ArrayList<>();
			for(TripCabInfo eachtrip: search) {
				Optional<DriverInfo> driver=this.repodrv.findById(eachtrip.getDriverId());
				DriverInfo drv= driver.get();
				TripDetails trip=new TripDetails(eachtrip.getTripCabId(), eachtrip.getCabNumber(), drv, eachtrip.getSource(), eachtrip.getDestination(), eachtrip.getDateOfTravel(), eachtrip.getTimeSlot(), eachtrip.getTotalSeats(), eachtrip.getAllocatedSeats(), eachtrip.getRemainingSeats(), eachtrip.getStatus(), eachtrip.getStartTime(), eachtrip.getEndTime(), eachtrip.getCreatedBy(), eachtrip.getCreatedDate(), eachtrip.getModifiedDate(), eachtrip.getModifiedBy(), eachtrip.getIsDeleted());
			    details.add(trip);
			}
			
			return details;
			
		}
	}
//------------------------------------------Testing Purpose-------------------------------------------------
	public SourceBO save(SourceBO source) {
		
		return this.reposrc.save(source);
	}

	public Destination save(Destination des) {
		des.setDestinationId(repos.count() +1);
		return this.repos.save(des);
	}

	public List<TripCabInfo> findByCabNumber(String cabNumber) {
		return this.repo.findByCabNumber(cabNumber);
	}

	public List<TripCabInfo> findByDestination(String destination) {
		return this.repo.findByDestination(destination);
	}

//	public List<TripCabInfo> findByDriverName(String driverName) {
//	
//		return this.repo.findByDriverName(driverName);
//	}

	public List<TripCabInfo> findByFilter(TripCabInfo book1) {
		
		return this.repo.findAll(Example.of(book1));
	}

	public Page<TripCabInfo> findAll(PageRequest paging) {
		
		return this.repo.findAll(paging);
	}

	public DriverInfo save(DriverInfo driver) {
		
		return this.save(driver);
	}

}
