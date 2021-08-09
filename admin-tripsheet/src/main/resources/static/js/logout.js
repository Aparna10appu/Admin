/**
 * 
 */

var logoutBtn = document.getElementById("logoutbtn");

logoutBtn.addEventListener("click", performLogout);

function performLogout() {
		
	window.location.href = "/logout"
		
}