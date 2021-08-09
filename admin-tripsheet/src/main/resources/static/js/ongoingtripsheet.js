window.onload = getTripSheet;
var reachedCount = 0;
var reachCount = 0;
setInterval('getTripSheet()', 60000);
var xhr = new XMLHttpRequest();
var http = new XMLHttpRequest();
var tripId = window.location.search;
var id = tripId.split("=");
var tripCabId = id[1];
//var url2 = "http://localhost:8080/api/v1//ongoingtripsheet/droppoints/";


           function getTripSheet() {
	
			
			
	        var url = "http://localhost:8080/api/v1/ongoingtripsheet/" + tripCabId;
            xhr.open("GET", url, true);
           
            xhr.onreadystatechange = processResponseTripInfo;
            xhr.send(null);
           }
           
function processResponseTripInfo() {	

            event.preventDefault();
            if(xhr.readyState == 4 && xhr.status == 200) {

              var data = JSON.parse(this.responseText);
              displayTripDetails(data);
            
            }
       }

// To display the data 
function displayTripDetails(obj) {
	
	$("#tablebody").empty();
	document.getElementById("cabnumber").innerHTML = obj.cabNumber;
	document.getElementById("drivername").innerHTML = obj.driver.driverName;
	document.getElementById("drivernumber").innerHTML = obj.driver.driverNumber;
	document.getElementById("source").innerHTML = obj.source;
	document.getElementById("destination").innerHTML = obj.destination;
//	document.getElementById("date").innerHTML = obj.dateOfTravel;
	var date = obj.dateOfTravel;
             var dateOfTravelValue = date.split("\-");
             document.getElementById("date").innerHTML = dateOfTravelValue[2] + "-" + dateOfTravelValue[1] + "-" + dateOfTravelValue[0];
	
//	document.getElementById("timeslot").innerHTML = obj.timeSlot;
	
	var timeSlotValue = obj.timeSlot;
             var timeSplit = timeSlotValue.split(":");
             var hour = timeSplit[0];
             if(hour<12){
					if(hour==00){
						document.getElementById("timeslot").innerHTML = "12" + ":" + timeSplit[1] + " AM";
					}
					else{
						document.getElementById("timeslot").innerHTML = hour + ":" + timeSplit[1] + " AM";
					}
					
				}
				else{
					hour = hour - 12;
					if(hour < 10){
						document.getElementById("timeslot").innerHTML = "0" + hour + ":" + timeSplit[1] + " PM";
					}
					else{
						document.getElementById("timeslot").innerHTML = hour + ":" + timeSplit[1] +" PM";
					}
					
				}
	
	document.getElementById("totalseats").innerHTML = obj.totalSeats;
	document.getElementById("allocatedseats").innerHTML = obj.allocatedSeats;
	document.getElementById("remainingseats").innerHTML = obj.remainingSeats;
	document.getElementById("status").innerHTML = obj.status;
//	document.getElementById("starttime").innerHTML = obj.startTime;
	var timeSlot = obj.startTime;
             var timeSplit = timeSlot.split(":");
             var hour = timeSplit[0];
             if(hour<12){
					if(hour==00){
						document.getElementById("starttime").innerHTML = "12" + ":" + timeSplit[1] + " AM";
					}
					else{
						document.getElementById("starttime").innerHTML = hour + ":" + timeSplit[1] + " AM";
					}
					
				}
				else if(hour == 12) {
					
					document.getElementById("starttime").innerHTML = hour + ":" + timeSplit[1] +" PM";
				}
				else{
					hour = hour - 12;
					if(hour < 10){
						document.getElementById("starttime").innerHTML = "0" + hour + ":" + timeSplit[1] + " PM";
					}
					else{
						document.getElementById("starttime").innerHTML = hour + ":" + timeSplit[1] +" PM";
					}
					
				}
//	document.getElementById("endTime").innerHTML = obj.endTime;
	
	var counter = 0;
    var tbody = document.getElementById("tablebody");
	var rowLength = obj.bookingId.length;
	for(var rows = 0; rows < rowLength; rows++) {
		
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
        td4.className = "spacing1";
        if(obj.bookingId[rows].reachedTime != null){
	
	//        td4.innerHTML = obj.bookingId[rows].reachedTime;
	        var timeSlot = obj.bookingId[rows].reachedTime;
             var timeSplit = timeSlot.split(":");
             var hour = timeSplit[0];
             if(hour<12){
					if(hour==00){
						td4.innerHTML = "12" + ":" + timeSplit[1] + " AM";
					}
					else{
						td4.innerHTML = hour + ":" + timeSplit[1] + " AM";
					}
					
				}
				else if(hour == 12) {
					
					td4.innerHTML = hour + ":" + timeSplit[1] +" PM";
				}

				else{
					hour = hour - 12;
					if(hour < 10){
						td4.innerHTML = "0" + hour + ":" + timeSplit[1] + " PM";
					}
					else{
						td4.innerHTML = hour + ":" + timeSplit[1] +" PM";
					}
					
				}
	//			document.getElementById(trow.id).disabled = true; 
			
         }
         else {
	         td4.innerHTML = "";
        }
 
        
         trow.appendChild(td4); 
         
        var td6 = document.createElement('td');
        td6.className = "spacing1";
 //       td6.innerHTML = "<button type='button' class='reachedbutton' onclick=updateReachedTime(this) id='reached"+ rows +"' style='background-color:green;color:white'>Reached</button>" ;
       if(td4.innerHTML != ""){
	       td6.innerHTML = "<button type='button' class='reachedbutton' onclick=updateReachedTime(this) disabled id='reached"+ rows +"' style='background-color:red;color:white'>Reached</button>" ;
        }
        else{
           td6.innerHTML = "<button type='button' class='reachedbutton' onclick=updateReachedTime(this) id='reached"+ rows +"' style='background-color:green;color:white'>Reached</button>" ;	
        }
        trow.appendChild(td6); 
              
         var td7 = document.createElement('td');
        td7.className = "spacing1";
        td7.innerHTML = obj.bookingId[rows].bookingId;
        td7.style.display = "none";
        trow.appendChild(td7); 
               
         tbody.appendChild(trow);
       
	}
	var tableBody = document.getElementById("tablebody");
			
			for (var i = 0; i < tableBody.rows.length; i++) {

				if (tableBody.rows[i].cells[4].innerHTML != "") {

					reachCount++;
				}

			}
			if(reachCount==tableBody.rows.length){
				checkEndTrip();
			}
	
}

/*------------------------------------------------------------------------------------------------------------------------------- */

//   To update employee's reached time
    var updateTime = new XMLHttpRequest();
	function updateReachedTime(row) {
		
		
		
		var trow = row.closest("tr").id;
		var bookId = document.getElementById(trow).getElementsByTagName("td")[6].innerHTML;
		updateTime.open("PUT", "http://localhost:8080/api/v1/update/reachedtime/" + bookId, true);
		updateTime.setRequestHeader("Content-Type","application/json");
		updateTime.send();
		updateTime.onreadystatechange = function() {
			
			if (updateTime.readyState == 4 &&  updateTime.status == 200){
				var response = JSON.parse(this.responseText);
				var timeSlot = response.reachedTime;
             var timeSplit = timeSlot.split(":");
             var hour = timeSplit[0];
             if(hour<12){
					if(hour==00){
						document.getElementById(trow).getElementsByTagName("td")[4].innerHTML = "12" + ":" + timeSplit[1] + " AM";
					}
					else{
						document.getElementById(trow).getElementsByTagName("td")[4].innerHTML = hour + ":" + timeSplit[1] + " AM";
					}
					
				}
				else{
					hour = hour - 12;
					if(hour < 10){
						document.getElementById(trow).getElementsByTagName("td")[4].innerHTML = "0" + hour + ":" + timeSplit[1] + " PM";
					}
					else{
						document.getElementById(trow).getElementsByTagName("td")[4].innerHTML = hour + ":" + timeSplit[1] +" PM";
					}
					
				}
//				document.getElementById(trow).getElementsByTagName("td")[4].innerHTML = response.reachedTime;
				document.getElementById(row.id).disabled = true;
				 document.getElementById(row.id).style.background ="red";
				 
			}
			var tableBody = document.getElementById("tablebody");
			
			for (var i = 0; i < tableBody.rows.length; i++) {

				if (tableBody.rows[i].cells[4].innerHTML != "") {

					reachedCount++;
				}

			}
			if(reachedCount==tableBody.rows.length){
				checkEndTrip();
			}
			
		};
		
	
}

/*------------------------------------------------------------------------------------------------------------------------------------- */checkEndTrip

// To check every employee has reached and update reached time of cab
var endTrip = new XMLHttpRequest();
function checkEndTrip() {
	
	var tableBody = document.getElementById("tablebody");
	var reachedCount = 0;
	for(var row = 0; row < tableBody.rows.length; row++) {
		
		if(tableBody.rows[row].cells[4].innerHTML != ""){
			
			reachedCount++;
		}
		
	}
	if(tableBody.rows.length != reachedCount) {
		
		alert("Cannot end trip");
	}
	
	if(reachedCount == tableBody.rows.length) {
		
		endTrip.open("PUT", "http://localhost:8080/api/v1/ongoingtripsheet/endtime/" + tripCabId);
		endTrip.setRequestHeader("Content-Type","application/json");
		endTrip.send();
		endTrip.onreadystatechange = function() {
			
			if (endTrip.readyState == 4 &&  endTrip.status == 200) {
				
				var response = JSON.parse(endTrip.responseText);
				var endTripTime = document.getElementById("endtime");
	//			endTripTime.innerHTML = response.endTime; 
				
				var endTimeValue = response.endTime;
             var timeSplit = endTimeValue.split(":");
             var hour = timeSplit[0];
             if(hour<12){
					if(hour==00){
						endTripTime.innerHTML = "12" + ":" + timeSplit[1] + " AM";
					}
					else{
						endTripTime.innerHTML = hour + ":" + timeSplit[1] + " AM";
					}
					
				}
				else if(hour == 12) {
					
					endTripTime.innerHTML = hour + ":" + timeSplit[1] +" PM";
				}

				else{
					hour = hour - 12;
					if(hour < 10){
						endTripTime.innerHTML = "0" + hour + ":" + timeSplit[1] + " PM";
					}
					else{
						endTripTime.innerHTML = hour + ":" + timeSplit[1] +" PM";
					}
					
				}
			}
			
			window.location.href = "cabadmin.html";
		};
		
	}
} 
