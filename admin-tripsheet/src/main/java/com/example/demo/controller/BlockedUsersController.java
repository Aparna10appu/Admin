/**
 * 
 */
package com.example.demo.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.businessLayer.BlockedUsersBL;
import com.example.demo.dataLayer.BlockedUsersDL;
import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;



/**
 * @author Markanto.v
 *
 */
@RestController
@RequestMapping(path="/api/v1/")
public class BlockedUsersController {

	@Autowired
	private BlockedUsersBL blockedUsersBL;
	
	@Autowired
	private BlockedUsersDL blockedUsersDL;
	
	@Autowired
	private EmployeeRepository repo;
	
	@Autowired
	MongoTemplate template;
	
	@GetMapping(path = "/list")
	public ResponseEntity<List<Employee>> getAllBlockedUsersDetails() {
		
		List<Employee> blockedList = this.blockedUsersBL.findByIsBlocked(1);
		return ResponseEntity.status(HttpStatus.OK).body(blockedList);
	}
	
	@PutMapping(path = "/action/unblock/yes/{employeeId}")
	public ResponseEntity<Employee> unBlockUser(@PathVariable("employeeId") String employeeId){
					
		Employee details = this.blockedUsersBL.unblockUser(employeeId);
		return ResponseEntity.status(HttpStatus.OK).body(details);		
	}
	
	//Filter method
	@GetMapping(path = "/filter/{domainName}/{from}/{to}")
	public List<Employee> getByFilter(@PathVariable("domainName") String domainName,@PathVariable("from") String from,@PathVariable("to") String to) {
		
		Query dynamicQuery = new Query();
		List<Employee> users = new ArrayList<Employee>();
		if (!(domainName.equals("null"))) {
	         Criteria domainCriteria = Criteria.where("domainName").is(domainName);
	         dynamicQuery.addCriteria(domainCriteria);
	         users = this.template.find(dynamicQuery, Employee.class);
	    }
		
		if ((domainName.equals("null"))){
			users = this.blockedUsersBL.findByIsBlocked(1);
		}
		
		if (!(from.equals("null")) && !(to.equals("null"))) 
		{
	         LocalDate fromDate = LocalDate.parse(from);
	         System.out.println(fromDate);
	         LocalDate toDate = LocalDate.parse(to);
	         List<LocalDate> dateFilter = fromDate.datesUntil(toDate).collect(Collectors.toList());
	         List<Employee> usersBlocked = new ArrayList<Employee>();
	         
	         for(Employee eachUser: users) 
	         {	 
	        	 for(LocalDate date: dateFilter)
	        	 {	 
	        		 if(eachUser.getBlockedDate().equals(date)) 
	        		 {
	        			 usersBlocked.add(eachUser);
	        		 }
	        	 }
	         }
	         return usersBlocked;
	      }
		return users;
	}	
	//End of Filter method
	
	//Search method
	@GetMapping(path="/search/{employeeName}")
	public List<Employee> getBySearch(@PathVariable("employeeName") String employeeName) {
		//System.out.println("Employee Name:"+employeeName);
		Query searchQuery=new Query();
		List<Employee> searchedUser=new ArrayList<Employee>();
		if (!(employeeName.equals("null"))) {
	         Criteria searchCriteria = Criteria.where("employeeName").is(employeeName);
	         searchQuery.addCriteria(searchCriteria);
	         searchedUser=this.template.find(searchQuery, Employee.class);
	    }
		if ((employeeName.equals("null"))){
			searchedUser = this.blockedUsersBL.findByIsBlocked(1);
		}
		return searchedUser;
	}
	
}
