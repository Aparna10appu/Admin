package com.example.demo.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.utils.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;

/**
 * This filter works before each api call and validate jwt token
 **/

@Component
public class JwtRequestFilter extends OncePerRequestFilter{

	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeader = (String) request.getSession().getAttribute("Authorization");
		
		String jwt = null;
		String userName = null;
		
		if(request.getRequestURI().startsWith("/admin")) {
			try {

				if(authHeader != null && authHeader.startsWith("Bearer ")) {
					jwt = authHeader.substring(7);
					userName = jwtUtil.extractUserName(jwt);
				} else {
					request.getSession().invalidate();
//					response.setStatus(CustomStatus.SESSIONEXPIRED);
					return;
				}

				//add api keys to check the request coming from mobile 
				if(userName != null && jwtUtil.validateToken(jwt, userName)) {

					//In spring security this will happen by default
					UsernamePasswordAuthenticationToken authenticationToken 
											= new UsernamePasswordAuthenticationToken(userName, null, null);
						
					authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);						
					
				} 
				

			} catch (ExpiredJwtException e) {
				//returned to login page
				String admin = (String) request.getSession().getAttribute("Admin");
				String newToken = jwtUtil.generateToken(admin);
				request.getSession().setAttribute("Authorization", "Bearer " + newToken);
				return;
			}
		}
		
		filterChain.doFilter(request, response);
	}
	
	
}
