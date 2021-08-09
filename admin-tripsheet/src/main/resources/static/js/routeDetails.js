

/*----------------------Dynamic table-------------------------------------------------------------------------------*/

window.sessionStorage;
var countPerPage = sessionStorage.getItem("countPerPage");
var xhrRouteDetails = new XMLHttpRequest();
var destinations;
window.onload = function() {
	event.preventDefault();
	xhrRouteDetails.open("GET", "http://localhost:8080/api/v1/managingRoute", true);

	xhrRouteDetails.onreadystatechange = routeProcessResponse;
	xhrRouteDetails.send(null);

};
function routeProcessResponse() {
	if (xhrRouteDetails.readyState == 4 && xhrRouteDetails.status == 200) {


		$("#route-info").empty();
		var arr = JSON.parse(xhrRouteDetails.responseText);
		sessionStorage.setItem("routeCount", arr.length);
		var rowCounter = 0;

		//var len = arr.dropPoints.length;

		for (var i = arr.length-1; i >= 0; i--) {

			if (arr[i].isDeleted != 1) {


				// creating row and data  

				var trow = document.createElement('tr');
				// display-shadow       // addingStyle class
				trow.id = "tr" + i;

				var divObj = document.createElement('td');
				divObj.id = "tddestination" + i;
				var divObj1 = document.createElement('td');
				divObj1.id = "tddropPoints" + i;
				var list = document.createElement('ul');
				for (j = 0; j < arr[i].dropPoints.length; j++) {
					//alert("hi");

					var listItem = document.createElement('li');
					listItem.innerText = arr[i].dropPoints[j].dropPoint;
					list.appendChild(listItem);
				}
				divObj1.appendChild(list);





				var divObj2 = document.createElement('td');
				divObj2.id = "tdtimeSlots" + i;


				var list1 = document.createElement('ul');
				for (k = 0; k < arr[i].timeSlots.length; k++) {
					//alert("hi");

					var listItem = document.createElement('li');

					var slot = arr[i].timeSlots[k].timeSlot;


					var slotSplitted = slot.split(":");
					slotHour = slotSplitted[0];
					if (slotHour < 12) {
						if (slotHour == 00 ) {
							listItem.innerHTML = "12" + ":" + slotSplitted[1] + " AM";

						}if(slotHour == 0){
							listItem.innerHTML= "12" + ":" + slotSplitted[1] + " AM";
						}
						else {
							listItem.innerHTML = slotHour + ":" + slotSplitted[1] + " AM";

						}
					} else {
						slotHour = slotHour - 12;
						if(slotHour == 0){
							listItem.innerHTML= "12" + ":" + slotSplitted[1] + " PM";
						}
						else if (slotHour < 10) {
							listItem.innerHTML = "0" + slotHour + ":" + slotSplitted[1] + " PM";

						}
						else {
							listItem.innerHTML = slotHour + ":" + slotSplitted[1] + " PM";
						}}
						
						

				


					list1.appendChild(listItem);



				}
				divObj2.appendChild(list1);


				var divObj3 = document.createElement('td');
				divObj3.id = "tdeditdelete" + i;




				divObj.innerText = arr[i].destination;




				divObj3.innerHTML = "<a href='#' title='Edit' onclick='editData(this)' class='actions-image'><img src='images/edit.svg' alt='edit-icon'/></a><a href='#' title='Delete'  class='actions2-image'><img src='images/delete.svg'   alt='delete-icon'  data-toggle='modal' data-target='#route-pop' onclick='delRow(this)'/></a>"



				trow.appendChild(divObj);
				trow.appendChild(divObj1);
				trow.appendChild(divObj2);
				trow.appendChild(divObj3);



				document.getElementById("route-info").appendChild(trow);

			}

		}
		pager.showPage(1);
		}
	
}



var xhrRouteDetails = new XMLHttpRequest();
var delRoute;

var delId;
var delrow;
function deleteRouteDetails() {



	xhrRouteDetails.open("PUT", "http://localhost:8080/api/v1/put/deleteRouteDetails/" + delRoute, true);


	//xhrRouteDetails.setRequestHeader("Content-Type","application/json");
	xhrRouteDetails.send(null);

	xhrRouteDetails.onreadystatechange =  deleteRouteInfoProcessResponse;

}

function deleteRouteInfoProcessResponse() {
	if (xhrRouteDetails.readyState == 4 && xhrRouteDetails.status == 200) {

		var response = this.responseText;
		//alert(delrow);
		delrow.remove(); //tr0
		alert("Route  Details deleted successfully");
		location.reload();

	}
}
var counter;
function delRow(row) {

	delId = row.closest("td").id;
	//alert(delId); tdeditdelete0
	counter = delId.replace("tdeditdelete", "");
}



function deleteData() {

	//alert(counter);
	delrow = document.getElementById("tr" + counter);  //tr0

	delRoute = delrow.getElementsByTagName("td")[0].innerHTML;
	//  alert(delRoute);
	deleteRouteDetails();

}



var editId;
var editRow;

function editData(row) {

	editId = row.closest("td").id;
	//alert(editId);
	var counterEdit = editId.replace("tdeditdelete", "");
	editRow = document.getElementById("tr" + counterEdit);

	var editDestination = editRow.getElementsByTagName("td")[0].innerHTML;

	var dropPointsTd = document.getElementById("tddropPoints" + counterEdit);
	var editDropPoints = dropPointsTd.getElementsByTagName("li");

	var dropPointsArr = new Array();
	for (var i = 0; i < editDropPoints.length; i++) {
		dropPointsArr.push(editDropPoints[i])
	}

	var timeSlotsId = document.getElementById("tdtimeSlots" + counterEdit);
	var editTimeSlots = timeSlotsId.getElementsByTagName("li");

	var timeSlotsArr = new Array();
	for (var i = 0; i < editTimeSlots.length; i++) {
		timeSlotsArr.push(editTimeSlots[i])
	}

	window.location.href = "/newRoute.html?destination=" + editDestination;

}





/* ---------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------Dynamic table ends-------------------------------------------------------------------------------*/
