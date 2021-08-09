package com.example.demo.controller;

import java.util.Arrays;
import java.util.concurrent.ExecutionException;

import javax.servlet.http.HttpServletRequest;

import com.example.demo.businessLayer.AdminLoginBL;
import com.example.demo.entity.EmployeeBO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Employee;
import com.microsoft.aad.adal4j.AuthenticationException;

@RestController
@CrossOrigin("*")
//@RequestMapping("/admin")
public class AdminLoginController {

	final static Logger logger = 
			LoggerFactory.getLogger(AdminLoginController.class.getName());
	
	@Autowired
	private AdminLoginBL loginBl;
	
	@PostMapping(path = "/authenticate")
	public ResponseEntity<?> validateUser(@RequestBody EmployeeBO employee, HttpServletRequest request) {
		try {
//			return ResponseEntity.ok(loginBl.validateUser(employee));
			
			String jwt = loginBl.validateUser(employee);
			
			request.getSession().setAttribute("Authorization", jwt);
			request.getSession().setAttribute("Admin", employee.getEmployeeMail());
			
			MultiValueMap<String, String> headerMap = new LinkedMultiValueMap<>();
			headerMap.put("Authorization", Arrays.asList(jwt));

			Employee emp = loginBl.getEmployeeDetails(employee.getEmployeeMail());
			
			return new ResponseEntity<>(emp, headerMap, HttpStatus.OK);

		} catch(AccessDeniedException e) {
			
			return ResponseEntity.status(560).body(e.getLocalizedMessage());
			
		} catch(ExecutionException | BadCredentialsException | AuthenticationException e) {
			logger.info("Bad Credentials",e);
			return ResponseEntity.status(560).body("Bad Credentials");
		
		} catch (Exception e) {
			//log
		} 
		
		return ResponseEntity.ok(null);
	}
}
