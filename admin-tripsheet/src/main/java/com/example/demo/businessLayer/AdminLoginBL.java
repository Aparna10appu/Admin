package com.example.demo.businessLayer;

import java.net.MalformedURLException;
import java.util.Base64;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import com.example.demo.dataLayer.AdminLoginDL;
import com.example.demo.entity.EmployeeBO;
import com.example.demo.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Employee;
import com.microsoft.aad.adal4j.AuthenticationContext;
import com.microsoft.aad.adal4j.AuthenticationException;
import com.microsoft.aad.adal4j.AuthenticationResult;

@Component
public class AdminLoginBL {

	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	AdminLoginDL adminDl;
	
	public String validateUser(EmployeeBO employee) throws Exception {
		
		String jwt = null;
		String authorityURL = "https://login.windows.net/avam365test.onmicrosoft.com";
		
		Employee emp = this.adminDl.findEmployeeByMail(employee.getEmployeeMail());
		
		if(emp == null) {
			throw new BadCredentialsException("User Not Found");
		} 
		if(emp.getIsAdmin() == 0) {
			throw new AccessDeniedException("Access Denied");
		}
		
		try {
			//decode the base64 encoded password
			byte[] password = Base64.getDecoder().decode(employee.getPassword());
			employee.setPassword(new String(password));

			AuthenticationContext context = new AuthenticationContext(authorityURL, false, Executors.newFixedThreadPool(2));
			
			Future<AuthenticationResult> result = 
			    		context.acquireToken("https://graph.microsoft.com", 
			    				"cf71fee4-0e23-463e-a862-919c2d6b05da", employee.getEmployeeMail(), employee.getPassword(), null);
	
			if(result.get().getAccessToken() != null) {
		    	jwt = "Bearer " + jwtUtil.generateToken(employee.getEmployeeMail());
		    	
		    	//setting manual authentication
		    	UsernamePasswordAuthenticationToken authenticationToken 
				= new UsernamePasswordAuthenticationToken(employee.getEmployeeMail(), null, null);
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				
				//set session timeout
//				request.getSession().setMaxInactiveInterval(10);
				return jwt;
		    }
			
		} catch (ExecutionException | AuthenticationException e) {
			throw e;
			
		} catch (MalformedURLException | InterruptedException e) {
			//log
			throw e;
		} 
		
		return jwt;
	}
	
	public Employee getEmployeeDetails(String email) {
		return this.adminDl.findEmployeeByMail(email);
	}
}
