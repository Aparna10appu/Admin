

window.onload = getTripSheet;
var timeOut = setInterval(function() {
	getTripSheet();
}, 60000);
var xhr = new XMLHttpRequest();
var http = new XMLHttpRequest();
var idSearch = window.location.search;
var tripCabId = idSearch.split("=")[1];
var url2 = "http://localhost:8080/api/v1/tripsheet/droppoints/";

function getTripSheet() {
	var url = "http://localhost:8080/api/v1/tripsheet/" + tripCabId;
	xhr.open("GET", url, true);
	xhr.onreadystatechange = processResponseTripDetails;
	xhr.send(null);

}
function processResponseTripDetails() {

	event.preventDefault();
	if (xhr.readyState == 4 && xhr.status == 200) {

		var data = JSON.parse(this.responseText);
		displayInfo(data);

	}

	if (xhr.readyState == 4 && xhr.status == 232) {

		window.location.href = "ongoingtripsheet.html?tripCabId=" + tripCabId;
	}
	if (xhr.readyState == 4 && xhr.status == 233) {

		window.location.href = "cabadmin.html";
	}
}
var timeSlotToCompare;
var dateOfTravel;
var startTripButton = document.getElementById("startclick");
function displayInfo(obj) {

	document.getElementById("cabnumber").innerHTML = obj.cabNumber;
	document.getElementById("drivername").innerHTML = obj.driver.driverName;
	document.getElementById("drivernumber").innerHTML = obj.driver.driverNumber;
	document.getElementById("source").innerHTML = obj.source;
	document.getElementById("destination").innerHTML = obj.destination;
	//	document.getElementById("date").innerHTML = obj.dateOfTravel;
	var date = obj.dateOfTravel;
	dateOfTravel = obj.dateOfTravel;
	var dateOfTravelValue = date.split("\-");
	document.getElementById("date").innerHTML = dateOfTravelValue[2] + "-" + dateOfTravelValue[1] + "-" + dateOfTravelValue[0];

	//	document.getElementById("timeslot").innerHTML = obj.timeSlot;

	var timeSlotValue = obj.timeSlot;
	
	timeSlotToCompare = obj.timeSlot;
	
	var timeSplit = timeSlotValue.split(":");
	var hour = timeSplit[0];
	if (hour < 12) {
		if (hour == 00) {
			document.getElementById("timeslot").innerHTML = "12" + ":" + timeSplit[1] + " AM";
		}
		else {
			document.getElementById("timeslot").innerHTML = hour + ":" + timeSplit[1] + " AM";
		}

	}
	else {
		hour = hour - 12;
		if (hour < 10) {
			document.getElementById("timeslot").innerHTML = "0" + hour + ":" + timeSplit[1] + " PM";
		}
		else {
			document.getElementById("timeslot").innerHTML = hour + ":" + timeSplit[1] + " PM";
		}

	}

	document.getElementById("totalseats").innerHTML = obj.totalSeats;
	document.getElementById("allocatedseats").innerHTML = obj.allocatedSeats;
	document.getElementById("remainingseats").innerHTML = obj.remainingSeats;
	document.getElementById("status").innerHTML = obj.status;
	document.getElementById("starttime").innerHTML = obj.startTime;

	var counter = 0;
	var tbody = document.getElementById("tablebody");
	var rowLength = obj.bookingId.length;

	$("#tablebody tr").slice(1).remove();
	for (var rows = 0; rows < rowLength; rows++) {

		var trow = document.createElement('tr');
		counter++;
		trow.className = "row-bg-style";
		trow.id = "tr" + counter;

		var td0 = document.createElement('td');
		td0.className = "spacing1";
		td0.innerHTML = rows + 1;
		trow.appendChild(td0);

		var td1 = document.createElement('td');
		td1.className = "spacing1";
		td1.innerHTML = obj.bookingId[rows].employeeId;
		trow.appendChild(td1);

		var td2 = document.createElement('td');
		td2.className = "spacing1";
		td2.innerHTML = obj.bookingId[rows].employeeName;
		trow.appendChild(td2);

		var td3 = document.createElement('td');
		td3.className = "spacing1";
		td3.innerHTML = obj.bookingId[rows].dropPoint;
		trow.appendChild(td3);

		var td4 = document.createElement('td');
		td4.className = "spacing1 text-center";
		td4.id = "td" + counter;
		td4.innerHTML = "<a href='#' title='Edit' class='actions-image'><img src='images/edit.svg' alt='edit-icon' id='edit' onclick = 'editData(this)'/></a><a href='#' title='Delete' class='actions2-image' data-toggle='modal' data-target='#trip-pop'><img src='images/delete.svg' alt='delete-icon'/ id='deletebutton' onclick = 'deleteData(this)'></a>";
		trow.appendChild(td4);

		var td5 = document.createElement('td');
		td5.className = "spacing1";
		td5.innerHTML = "";
		trow.appendChild(td5);

		var td6 = document.createElement('td');
		td6.className = "spacing1";
		td6.innerHTML = "<select  class='form-select style-select1 border-filter-style' id='Droppoint4" + rows + "' aria-label='Default-example' onchange='showUpdate(this)'><option value='1'>Show</option><option value='2' selected>Noshow</option></select>";
		trow.appendChild(td6);

		var td7 = document.createElement('td');
		td7.className = "spacing1";
		td7.innerHTML = obj.bookingId[rows].bookingId;
		td7.style.display = "none";
		trow.appendChild(td7);


		tbody.appendChild(trow);


	}

	// To update status of every employee, an api call is made every one minute
	for (var row = 0; row < rowLength; row++) {

		var dropValue = document.getElementById("Droppoint4" + row);
		var html = document.getElementById("tablename").rows[row].cells[6].value;
		if (obj.bookingId[row].status === "Inprogress") {

			dropValue.children[0].setAttribute("selected", "selected");
//			dropValue.disabled = true;

		}
	}

	var dropPointsDropDown = document.getElementById("droppoints");
	dropDown(obj.destination);

}

/* -------------------------------------------------------------------------------------------------------------------------------- */

// To autopopulate drop points dropdown based on the destination
function dropDown(dest) {
	http.open("GET", url2 + dest, true);
	http.onreadystatechange = processResponseDestinationDropDown;
	http.send(null);

}
function processResponseDestinationDropDown() {


	event.preventDefault();
	if (http.readyState == 4 && http.status == 200) {


		var dropDown = document.getElementById("droppoints");
		var data = JSON.parse(this.responseText);
		var rowLength = data.dropPoints.length;
		$("#droppoints option").slice(1).remove();
		for (var rows = 0; rows < rowLength; rows++) {
			var optTag = document.createElement('option');
			optTag.innerHTML = data.dropPoints[rows].dropPoint;
			dropDown.appendChild(optTag);
		}

	}

}

/* ------------------------------------------------------------------------------------------------------------------------------ */

// To autofill the employee name using the employee id
var emp = new XMLHttpRequest();
var urlEmp = "http://localhost:8080/api/v1/tripsheet/employee/";
document.getElementById("emp-id").onblur = function() {

	if (document.getElementById("emp-id").value.trim() !== "") {

		employeeNameAutoFill();

	}
}
function employeeNameAutoFill() {
	var empIdBox = document.getElementById("emp-id");
	var empId = document.getElementById("emp-id").value;
	//alert("Check");
	emp.open("GET", urlEmp + empId, true);
	emp.onreadystatechange = processResponseEmpNameAutoFill;
	emp.send(null);

}
function processResponseEmpNameAutoFill() {


	event.preventDefault();
	if (emp.readyState == 4 && emp.status == 200) {

		// alert(emp.status);
		var name = document.getElementById("emp-name");
		var empName = JSON.parse(this.responseText);
		name.value = empName.employeeName;

	}
}

/* --------------------------------------------------------------------------------------------------------------------------------- */

// To autofill the employee name using the employee id
var empIdXML = new XMLHttpRequest();
var urlEmpName = "http://localhost:8080/api/v1/tripsheet/employeeName/";

document.getElementById("emp-name").onblur = function() {

	if (document.getElementById("emp-name").value.trim() !== "") {

		employeeIdAutofill();

	}
}

function employeeIdAutofill() {
	var employeeName = document.getElementById("emp-name").value;
	//alert("Check");
	empIdXML.open("GET", urlEmpName + employeeName, true);
	empIdXML.onreadystatechange = processResponseEmployeeIdAutoFill;
	empIdXML.send(null);

}
function processResponseEmployeeIdAutoFill() {


	event.preventDefault();
	if (empIdXML.readyState == 4 && empIdXML.status == 200) {


		var id = document.getElementById("emp-id");
		var eId = JSON.parse(this.responseText);
		id.value = eId.employeeId;
		//   id.disabled = true;


	}
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

// Save button functionality -> Admin books a cab for the employee
var updateFlag = false;
function saveAndUpdateEmployee() {

	if (updateFlag == false) {

		addNewEmployee();
	}
	else {

		updateEmployeedata();
	}
}
var addEmployee = new XMLHttpRequest();
var addEmpURL = "http://localhost:8080/api/v1/tripsheet/addemployee/" + tripCabId;
var tableData = document.getElementById("tablebody");
var matchCount = 0;
var empMatch = false;
var employeeDetails;
function addNewEmployee() {

	var employeeId = document.getElementById("emp-id").value;
	var employeeName = document.getElementById("emp-name").value;
	for (var i = 0; i < employeeDetails.length; i++) {

		if ((employeeName == employeeDetails[i].employeeName) && (employeeId == employeeDetails[i].employeeId)) {

			empMatch = true;
		}
	}

	var dropPoint = document.getElementById("droppoints").value;
	var source = document.getElementById("source").innerHTML;
	var destination = document.getElementById("destination").innerHTML;
	var timeSlotVal = document.getElementById("timeslot").innerHTML;

	if (employeeId == "" || employeeName == "") {

		alert("Employee fields cannot be empty");
		return false;
	}

	var splittedTimeSlot = timeSlotVal.split(":"); //09.30 AM = 09,30 AM
	minute = splittedTimeSlot[1].split(" "); //30,AM
	if (splittedTimeSlot[1].includes("PM")) {
		//       minute = splittedTimeSlot[1].split(" ");

		if (Number(splittedTimeSlot[0]) + 12 == 24) {
			bookingTimeSlot = "12" + ":" + minute[0];
		}
		else {
			splittedTimeSlotHour = Number(splittedTimeSlot[0]) + 12;
			bookingTimeSlot = splittedTimeSlotHour + ":" + minute[0];
		}
	}
	else {
		//        seconds = splittedTimeSlot[2].split(" ");
		if (Number(splittedTimeSlot[0]) == 12) {
			bookingTimeSlot = "00" + ":" + minute;
		}
		else if (Number(splittedTimeSlot[0]) < 10) {
			bookingTimeSlot = "0" + Number(splittedTimeSlot[0]) + ":" + minute[0];
		}
		else {
			bookingTimeSlot = Number(splittedTimeSlot[0]) + ":" + minute[0];
		}
	}
	var status = document.getElementById("status").innerHTML;


	var data = {
		"employeeId": employeeId, "employeeName": employeeName, "dropPoint": dropPoint, "source": source,
		"destination": destination, "timeSlot": bookingTimeSlot, "dateOfTravel": dateOfTravel
	};

	for (var row = 0; row < tableData.rows.length; row++) {

		var id = document.getElementById("tablebody").rows[row].cells[1].innerHTML;
		if (id == document.getElementById("emp-id").value) {

			matchCount++;
		}
	}
	if (document.getElementById("remainingseats").innerHTML != 0) {
		if (matchCount == 0) {

			if (empMatch == true) {

				if (dropPoint != "Select") {
					addEmployee.open("POST", addEmpURL, true);
					addEmployee.setRequestHeader("Content-Type", "application/json");
					addEmployee.send(JSON.stringify(data));
					addEmployee.onreadystatechange = processResponseSaveBooking;
					empMatch = false;
				}
				else {
					alert("Select DropPoint");
				}
			}
			else {

				alert("Invalid Employee details");
				window.location.reload();

			}

		}
		else {
			alert("Employee already exists");
			window.location.reload();
		}
	}

	else {

		alert("Maximum Capacity reached");
		window.location.reload();
	}
}

function processResponseSaveBooking() {

	if (addEmployee.readyState == 4 && addEmployee.status == 200) {

		var response = this.responseText;
		alert("Employee booked a cab successfully");
		funclear();
		window.location.reload();
	}
	if (addEmployee.readyState == 4 && addEmployee.status == 208){
		alert("Employee has already booked a cab");
		window.location.reload();
	}
}

function funclear() {

	document.getElementById("emp-id").value = "";
	document.getElementById("emp-name").value = "";
	document.getElementById("droppoints").value = "";
}

document.getElementById("cancel").onclick = function() {
	updateFlag = false;
	window.location.reload();
};

/* ------------------------------------------------------------------------------------------------------------------------------- */

// To edit the table data
var bookingId;
function editData(row) {

	updateFlag = true;
	//document.getElementById("savebutton").style.display = "none";
	//document.getElementById("updatebutton").style.display = "block";
	var id = row.closest("td").id;
	var rowId = id.replace("td", "");
	var employeeId = document.getElementById("emp-id");
	var employeeName = document.getElementById("emp-name");
	var dropPoint = document.getElementById("Droppoint4" + rowId);

	var editId = document.getElementById("tr" + rowId).getElementsByTagName('td')[1].innerHTML;
	var editName = document.getElementById("tr" + rowId).getElementsByTagName('td')[2].innerHTML;
	var editDrop = document.getElementById("tr" + rowId).getElementsByTagName('td')[3].innerHTML;

	bookingId = document.getElementById("tr" + rowId).getElementsByTagName('td')[7].innerHTML;

	employeeId.value = editId;
	employeeName.value = editName;
	dropPoint.value = editDrop;

	employeeId.disabled = true;
	employeeName.disabled = true;
}

// To update the edited data
var updateXML = new XMLHttpRequest();
function updateEmployeedata() {

	updateFlag = false;
	var dropPoint = document.getElementById("droppoints").value;
	if (dropPoint != "Select") {

		updateXML.open("PUT", "http://localhost:8080/api/v1/tripsheet/update/droppoint", true);
		updateXML.setRequestHeader("Content-Type", "application/json");
		var data = { "bookingId": bookingId, "dropPoint": dropPoint };
		updateXML.onreadystatechange = processResponseUpdateBooking;
		updateXML.send(JSON.stringify(data));
	}
	else {
		alert("Select Droppoint");
	}

}

function processResponseUpdateBooking() {


	if (updateXML.readyState == 4 && updateXML.status == 200) {
		window.location.reload();
	}
}

/* -------------------------------------------------------------------------------------------------------------------------------- */

// To delete a table data
var bookId;
var deleteRow;
function deleteData(row) {

	var id = row.closest("td").id;
	var rowId = id.replace("td", "");
	bookId = document.getElementById("tr" + rowId).getElementsByTagName('td')[7].innerHTML;
	deleteRow = document.getElementById("tr" + rowId);
}

var deleteXML = new XMLHttpRequest();
var yesButton = document.getElementById("yes");
yesButton.onclick = function() {

	deleteXML.open("PUT", "http://localhost:8080/api/v1/tripsheet/delete/booking/" + bookId, true);
	deleteXML.setRequestHeader("Content-Type", "application/json");
	deleteXML.send();
	deleteXML.onreadystatechange = processResponseDeleteBooking;
}

function processResponseDeleteBooking() {

	if (deleteXML.readyState == 4 && deleteXML.status == 200) {

		//		alert("Employee cab booking deleted successfully");
		window.location.reload();

	}

}

/* ------------------------------------------------------------------------------------------------------------------------------- */



var updateEmpStatus = new XMLHttpRequest();
function updateStatusOfEmp() {
	
	var xhrServerTime = new XMLHttpRequest();
	
	xhrServerTime.open("GET","http://localhost:8080/api/v1/serverTime/",true);
	xhrServerTime.send();
	xhrServerTime.onreadystatechange = function(){
		
		if (xhrServerTime.readyState == 4 && xhrServerTime.status == 200) {
			
			var serverTime = JSON.parse(this.responseText);

			if (timeSlotToCompare > serverTime) { //10:30 , 10:15

				serverTimeHour = serverTime.split(":")[0];
				serverTimeMin = serverTime.split(":")[1];

				timeSlotToCompareHour = timeSlotToCompare.split(":")[0];
				timeSlotToCompareMin = timeSlotToCompare.split(":")[1];

				if (timeSlotToCompareMin > serverTimeMin) {
					--serverTimeHour;
					serverTimeMin = Number(serverTimeMin) + 60;

					difference_in_minutes = serverTimeMin - timeSlotToCompareMin;

				}
				if (timeSlotToCompareMin < serverTimeMin) {
					--timeSlotToCompareHour;
					timeSlotToCompareMin = Number(timeSlotToCompareMin) + 60;

					difference_in_minutes = timeSlotToCompareMin - serverTimeMin;
				}

				difference_in_hours = timeSlotToCompareHour - serverTimeHour;
				if (difference_in_hours == 0) {
					if (difference_in_minutes <= 20) {

						var showList = new Array();
						var noShowList = new Array();
						var tableBody = document.getElementById("tablebody");
						var showCount = 0;
						for (var row = 0; row < tableBody.rows.length - 1; row++) {

							var td = tableBody.rows[row + 1].cells[1];

							var selectOption = document.getElementById("Droppoint4" + row);
							if (selectOption.value == 1) {

								showCount++;
								var show = td.innerHTML;
								showList.push(show);
							}
							else {

								var noShow = td.innerHTML;
								noShowList.push(noShow);
							}

						}

						if (showCount > 0) {
							if (noShowList.length > 0) {
								updateEmpStatus.open("PUT", "http://localhost:8080/api/v1/update/time/status/" + tripCabId + "/" + showList + "/" + noShowList, true);
								updateEmpStatus.setRequestHeader("Content-Type", "application/json");
								updateEmpStatus.send();
								updateEmpStatus.onreadystatechange = function() {

									if (updateEmpStatus.readyState == 4 && updateEmpStatus.status == 200) {

										window.location.href = "ongoingtripsheet.html?tripCabId=" + tripCabId;
									}
								}

							}
							else {
								updateEmpStatus.open("PUT", "http://localhost:8080/api/v1/update/time/status/" + tripCabId + "/" + showList + "/" + 0, true);
								updateEmpStatus.setRequestHeader("Content-Type", "application/json");
								updateEmpStatus.send();
								updateEmpStatus.onreadystatechange = function() {

									if (updateEmpStatus.readyState == 4 && updateEmpStatus.status == 200) {

										window.location.href = "ongoingtripsheet.html?tripCabId=" + tripCabId;
									}
								}
							}


						}
						else {

							alert("Cannot start trip");
						}
					}
					else {
						alert("Cannot start trip")
					}
				}
				else {
					alert("Cannot start trip")
				}

			}
			else {
				alert("Cannot start trip")

			}
		}
		
	};

	
}
/*------------------------------------------------------------------------------------------------------------------------*/

//Suggestion employeeName

var empNameSugest = new XMLHttpRequest();
var suggestUrl = "http://localhost:8080/api/v1/tripsheet/getallemployee";

function getAllEmployeeDetails() {


	empNameSugest.open("GET", suggestUrl, true);
	empNameSugest.onreadystatechange = function() {
		if (empNameSugest.readyState == 4 && empNameSugest.status == 200) {
			employeeDetails = JSON.parse(this.responseText);
		}
	};
	empNameSugest.send(null);

}
getAllEmployeeDetails();
employeeNameInput = document.getElementById("emp-name");
employeeNameInput.addEventListener("input", searchForEmployeeName);

var divElement = document.getElementById("suggestDiv");
var getDriverId;

function searchForEmployeeName() {
	// getDriverId = undefined;

	var userEntry = employeeNameInput.value;

	//delete old listtag if any
	let childCount = divElement.childElementCount;
	if (childCount > 0) {
		for (let i = 0; i < childCount; i++) {
			divElement.removeChild(divElement.firstChild);
		}
	}
	//

	if (userEntry != "") {
		//change user entry to lower case and compare with driver info array
		var suggestionArr = employeeDetails.filter(text => text.employeeName.toLowerCase().startsWith(userEntry.toLowerCase()));

		var suggLimit = 7;

		//creating list tag starts
		for (let i = 0; i < suggestionArr.length; i++) {

			divElement.style.display = "block";

			//limit suggestion to 5
			if (i < suggLimit) {
				var listTag = document.createElement("li");
				listTag.id = suggestionArr[i].driverId;

				listTag.className = "suggestList";
				listTag.innerText = suggestionArr[i].employeeName + " - " + suggestionArr[i].employeeId;

				divElement.appendChild(listTag);
			}
		}
		//
	}

	//onclick function for list tags
	var suggestList = document.getElementsByClassName("suggestList");

	for (var i = 0; i < suggestList.length; i++) {
		suggestList[i].addEventListener("click", function() {

			let employeeDetails = this.innerText.split(" - ");

			//append the value clicked to textbox capitalize first letter
			employeeNameInput.value = employeeDetails[0].charAt(0).toUpperCase() + employeeDetails[0].slice(1);

			//getDriverId = this.id;
			var id = document.getElementById("emp-id");
			var eId = employeeDetails[1];
			id.value = eId;
			//hide list
			divElement.style.display = "none";

		})
	}

}

document.addEventListener("click", function(e) {
	divElement.style.display = "none";
})
/*-------------------------------------------------------------------------------------------------------------------------------*/
////show update to update status of the employee on driver's screen when admin update
//var bookingId;
//
//var showXML = new XMLHttpRequest();
//var showUrl = "http://localhost:8080/api/v1/tripsheet/show/";
//function showUpdate(obj) {
//	var trowId = obj.closest("tr").id;
//	var trow = document.getElementById(trowId);
//	var showopt = document.getElementById(obj.id);
//	if (showopt.value == 1) {
//
//		bookingId = trow.cells[7].innerHTML;
//		showXML.open("PUT", showUrl + bookingId, true);
//		showXML.send(null);
//		showXML.onreadystatechange = function() {
//			if (showXML.readyState == 4 && showXML.status == 200) {
//				showopt.disabled = true;
//			}
//		}
//
//
//
//	}
//}
