package com.example.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.filters.JwtRequestFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	//for db auth
//	@Autowired
//	private MyUserDetailService myUserDetailService;
	
	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	//for db authentication
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//			auth.userDetailsService(myUserDetailService).passwordEncoder(new BCryptPasswordEncoder());
//	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf().disable()
			.authorizeRequests().antMatchers("/authenticate", "/login.html").permitAll()
			.anyRequest().authenticated()
			
			.and()
				.formLogin().loginPage("/login.html")
			
			.and()
				.logout().logoutUrl("/logout")
				//back to login page
				.logoutSuccessUrl("/login.html")
				.invalidateHttpSession(true)
				.clearAuthentication(true);
			
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/css/**", "/js/**", "/images/**", "/Fonts/**", "**.js", "**.css", "**.png");
	}
	
}
