var LOGIN_API = "http://localhost:8080/authenticate";
var EMP_DETAILS_API = "http://localhost:8080/empDetails"

//if gateway added
//var LOGIN_API = "http://localhost:8082/admin/authenticate";
//var EMP_DETAILS_API = "http://localhost:8082/admin/empDetails"

//load cookies if exist
window.onload = loadCookies;

function loadCookies() {
	
	//reduce the cookies from array to name and values
	var cookies = document.cookie
							.split(';')
							.map(cookie => cookie.split('='))
							.reduce((total, [key, value]) => ({...total, [key.trim()]: value}), {});
	
	//if cookies not present
	if(cookies.email  == undefined || cookies.pass == undefined) {
	    return false;
    }

	document.getElementById("email").value = cookies.email;
									//password stored in cookie is base64 encoded
    document.getElementById("password").value = window.atob(cookies.pass);    
	
	document.getElementById('rememberCheck').checked = true;
}

//*********************************************************//

var loginBut = document.getElementById("loginBut");

var emailId;
var password;

var isPasswordHidden = true;

loginBut.addEventListener('click', checkEmptyFields);

//check empty fields
function checkEmptyFields() {
	
	emailId = document.getElementById("email").value;
				//encode password before sending and before saving cookie
	password = window.btoa(document.getElementById("password").value);

	if(emailId == "" || emailId == undefined) {
		alert("Kindly enter your email Id");
		document.getElementById("email").focus();
		return false;
	}
	
	if(password == "" || password == undefined) {
		alert("Kindly enter the password");
		document.getElementById("password").focus();
		return false;
	}
	
	checkEmailFormat();
}
//*********************************************************//

//check email format
function checkEmailFormat() {
	
	var domain = emailId.split("@");
	
	if(domain[1] != "avasoft.com"){
//		alert("Email Id entered is invalid");
//		document.getElementById("email").focus();
//		return false;
	}
	
	validateUser();	
}
//*********************************************************//

//validate user credentials
function validateUser() {
	
	//loading anime starts
	var loadingAnime = document.getElementById("loadingAnime");
	loadingAnime.style.visibility = "visible";
	loginBut.disabled = true;
	loginBut.style.backgroundColor = "darkgrey";
	//ends
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", LOGIN_API, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	
	//email should be case sensitive?
	var employee = {
					"employeeMail" : emailId.toLowerCase(), 
					"password" : password
					};
					
	xhr.send(JSON.stringify(employee));
	
	xhr.onreadystatechange = function() {
				
		loadingAnime.style.visibility = "hidden";
		loginBut.disabled = false;
		loginBut.style.backgroundColor = "#F8BB10";
		
		//for invalid credentials
		if(xhr.readyState == 4 && xhr.status == 560) {		
			var invUserDiv = document.getElementById("invalidUser");
			invUserDiv.style.float = "left";    
			invUserDiv.style.color = "red";
			invUserDiv.style.width = "100%";
			invUserDiv.style.fontWeight = "bolder";

			invUserDiv.innerHTML = xhr.responseText;
			
			return false;
		}
		
		//if user blocked status 560 will be returned - show popup
		if(xhr.readyState == 4 && xhr.status == 560) {		
			var invUserDiv = document.getElementById("invalidUser");
			invUserDiv.style.float = "left";    
			invUserDiv.style.color = "red";
			invUserDiv.style.width = "100%";
			invUserDiv.style.fontWeight = "bolder";

			invUserDiv.innerHTML = xhr.responseText;
			
			return false;
		}
		
		if(xhr.readyState == 4 && xhr.status == 200) {
			
			//jwt token will be returned in response header		
			jwtToken = xhr.getResponseHeader("Authorization");	
			
//			var emp = JSON.parse(xhr.responseText);

			//save cookie only if user is valid
			saveCookie(emailId, password);
			
			window.location.href = "/cabadmin.html";
						
		}
	}
}
//*********************************************************//

//get employee details
function getEmployeeDetails() {
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", EMP_DETAILS_API, true);
	
	//not needed since we are storing token in server
//	//setting token at request header
//	xhr.setRequestHeader("AUTHORIZATION", getToken());

	xhr.send(null);
	
	xhr.onreadystatechange = function() {
				
		if(xhr.readyState == 4 && xhr.status == 200){
			var employee = JSON.parse(xhr.responseText);
			console.log(employee);
			console.log(employee.employeeId);
		}
	}
}
//*********************************************************//

//save cookies
function saveCookie(emailId, password) {
	
    //save cookies
	if(document.getElementById('rememberCheck').checked == true) {
        
        var d = new Date();
        d.setTime(d.getTime() + 24*60*60*1000);
        d.toUTCString();

        document.cookie = "email="+emailId +";"+ "expires="+d + ";path=/";
        document.cookie = "pass="+password +";"+ "expires="+d + ";path=/";

    }

	//delete cookies if remember me not checked
	else {
		document.cookie = "email=" +";"+ "expires="+ (new Date() - 24*60)  + ";path=/";
        document.cookie = "pass="+";"+ "expires="+(new Date() - 24*60) + ";path=/";
	}
	
}
//*********************************************************//

//display password
var showPassBut = document.getElementById("showPassword");
showPassBut.addEventListener("click", displayPassword);

function displayPassword() {
	if(isPasswordHidden) {
		isPasswordHidden = false;
		document.getElementById("password").setAttribute("type", "text");
		showPassBut.innerText = "Hide Password";
	} else {
		isPasswordHidden = true;
		document.getElementById("password").setAttribute("type", "password");
		showPassBut.innerText = "Show Password";
	}
}
//*********************************************************//
//on press of enter key perform login
var email = document.getElementById("email");
var password = document.getElementById("password");

 

email.addEventListener("keyup", function() {
    if(event.keyCode == 13) {
        enterButtonClicked();
    }
});

 

password.addEventListener("keyup", function() {
    if(event.keyCode == 13) {
        enterButtonClicked();
    }
});

 

//enter button function
function enterButtonClicked() {
    event.preventDefault();
    checkEmptyFields();
}
//*********************************************************//