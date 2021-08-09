/**
 * 
 */
package com.example.demo.businessLayer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dataLayer.BlockedUsersDL;
import com.example.demo.entity.Employee;



/**
 * @author Markanto.v
 *
 */
@Component
public class BlockedUsersBL {

	@Autowired
	private BlockedUsersDL blockedUsersDL;
	
	//This method is used to get the blocked users details//
	public List<Employee> getAllBlockedUsersDetails(){			
	
		return this.blockedUsersDL.findAllBlockedUsersDetails();		
	}	
	//End of get all blocked users details//
	
	//This method is used to get users whose blocked status is true
	public List<Employee> findByIsBlocked(int isBlockedStatus) {

		return this.blockedUsersDL.findByIsBlocked(isBlockedStatus);
	}
	//End of isBlocked method
	
	//This method is used to unblock user of the given employee id
	public Employee unblockUser(String employeeId) {

		return this.blockedUsersDL.unBlockUser(employeeId);
	}
	//End of unblock user method
}
