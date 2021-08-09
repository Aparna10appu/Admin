package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.BookingRequest;
import com.example.demo.entity.TripCabInfo;

@Repository
public interface BookingRequestRepository extends MongoRepository<BookingRequest,Long> {

	
	
	@Query(value = "{tripCabId:?0,status:{$nin:[Cancelled, Noshow]}}")
	List<BookingRequest> getBookingRequestByTripCabId(long tripCabId);
	
	
	List<BookingRequest> findByTripCabId(long tripCabId);
	
	@Query(value = "{newEmp : ?0, tripCabId : ?1}")
	BookingRequest saveByTripCabId(BookingRequest newEmp, long tripCabId);

	
	


	BookingRequest findByTripCabIdAndEmployeeId(long tripCabId, String employeeId);
	@Query(value = "{employeeId:?0 , status:{$in:[Assigned,Ongoing]}}")
    BookingRequest findByEmployeeId(String employeeId);

	BookingRequest findByBookingId(Long bookingID);

	@Query("{employeeId: ?0, status: Booked}")
	BookingRequest findByEmployeeIdByStatus(String string);

	@Query("{employeeId: ?0}")
	BookingRequest findByEmployeeIdAndStatus(String empId);

	LocalDate findByCreatedDate();


	@Query(value= "{bookingId:?0}",delete=true)
	Long deleteByBookingId(Long bookingID);


	TripCabInfo save(TripCabInfo info);


	@Query("{bookingId: ?0, status: Booked}")
	BookingRequest findByBookingIdAndStatus(long bookingId);
	
	 @Query(value = "{remarks:null,complaintDescription:{$nin:[null]}}")
		List<BookingRequest> findByComplaintDescription();
}
