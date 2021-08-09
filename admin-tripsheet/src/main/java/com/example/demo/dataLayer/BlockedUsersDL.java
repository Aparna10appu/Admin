/**
 * 
 */
package com.example.demo.dataLayer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;

/**
 * @author Markanto.v
 *
 */
@Service
public class BlockedUsersDL {

	@Autowired
	private EmployeeRepository repo;
	
	public List<Employee> findAllBlockedUsersDetails() {

		return this.repo.findAll();
	}
	
	public List<Employee> findByIsBlocked(int isBlockedStatus) {

		return this.repo.findByIsBlocked(isBlockedStatus);
	}

	//This method is used to unblock the user from the list
	public Employee unBlockUser(String employeeId) {
			
		Optional<Employee> user = this.repo.findById(employeeId);
		Employee unblockedUser = user.get();
		unblockedUser.setIsBlocked(0);
		
		return this.repo.save(unblockedUser);		
	}
	//End of unblock method
	
//	public List<BlockedUsers> searchByName(String keyword){
//		return repo.searchByName(keyword);
//	}
	
}
