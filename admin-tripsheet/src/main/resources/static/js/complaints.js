



window.onload=getComplaints;


var xhrCount= new XMLHttpRequest();
document.getElementById("pills-tabContent").addEventListener('click',getComplaints());
	//event.preventDefault();
	function getComplaints(){
	xhrCount.open("GET","http://localhost:8080/api/v1/complaints/complaintsdesp",true);

    	xhrCount.onreadystatechange=processResponseCount;
        xhrCount.send(null);
}
		  var xhrCounts= new XMLHttpRequest();
    function getTotalCount(){
    	xhrCounts.open("GET","http://localhost:8080/api/v1/countComplaints",true);
    	xhrCounts.onreadystatechange=processResponseCount1;
         xhrCounts.send(null);
      };
    var count;
    
    function processResponseCount1(){
    	  if(xhrCounts.readyState == 4 && xhrCounts.status == 200){
    		 count= JSON.parse(xhrCounts.responseText);
    	        
    	  }
    }
 getTotalCount();
    	
   function processResponseCount(){
    	 if(xhrCount.readyState == 4 && xhrCount.status == 200){
	
		$("#table-body").empty();
				
    		  var arr = JSON.parse(xhrCount.responseText);
    
				getAllComplaints(arr);
}

}

function getAllComplaints(arr){
	    		    for(var i=0;i<arr.length; i++){

 	  // creating row and data
        var trow=document.createElement('tr');
        trow.className="row-bg-style";
        trow.id="row"+i;       // addingStyle class
        var divObj = document.createElement('td');
         divObj.className="spacing2";
        divObj.id="empid"+i;
        var divObj1 = document.createElement('td');
        divObj1.className="spacing2";
        divObj1.id="empName"+i;
        var divObj2 = document.createElement('td');
        divObj2.className="spacing2";
        divObj2.id="empNumber"+i;
        var divObj3 = document.createElement('td');
        divObj3.className="spacing2";
         divObj3.id="cabNum"+i;
        var divObj4 = document.createElement('td');
        divObj4.className="spacing2";
         divObj4.id="driverName"+i;
        var divObj5 = document.createElement('td');
        divObj5.className="spacing2";
         divObj5.id="source"+i;
        var divObj6 = document.createElement('td');
        divObj6.className="spacing2";
         divObj6.id="destination"+i;
        var divObj7 = document.createElement('td');
        divObj7.className="spacing2";
         divObj7.id="dateoftravel"+i;
        var divObj8 = document.createElement('td');
        divObj8.className="spacing2";
         divObj8.id="timeslot"+i;
        var divObj9 = document.createElement('td');
        divObj9.className="spacing2";
         divObj9.id="complaints"+i;
        var divObj10 = document.createElement('td');
        divObj10.className="spacing2";
        var divObj11 = document.createElement('td');
        divObj11.className="spacing2";
        divObj11.style.display="none";
       
    
    
          divObj.innerText = arr[i].requests.employeeId;
          divObj1.innerText = arr[i].requests.employeeName;
          divObj2.innerText = arr[i].empNumbers;
           divObj3.innerText = arr[i].cabNumbers;
          divObj4.innerText = arr[i].driverName;
           divObj5.innerText = arr[i].requests.source;
          divObj6.innerText = arr[i].requests.destination;
          var date = arr[i].datesOfTravel;
          var splitDate = date.split("-");
          
         divObj7.innerText = splitDate[2] +"-"+ splitDate[1] +"-"+ splitDate[0];
      	// var timeSlotOption = divObj8.innerText ;
         var slot = arr[i].requests.timeSlot;
            var slotSplitted = slot.split(":");
            slotHour = slotSplitted[0];
            if(slotHour < 12){
                if(slotHour == 00 ){
                    divObj8.innerText ="12" + ":" + slotSplitted[1] +  " AM";
                }else{
                    divObj8.innerText  =slotHour + ":" + slotSplitted[1] +  " AM";
                }
               
            }else{
                slotHour = slotHour - 12 ;
                if(slotHour < 10){
                    divObj8.innerText  = "0" + slotHour + ":" + slotSplitted[1] + " PM";
                   
                }if(slotHour == 0 ){
                    divObj8.innerText  = "12"+ ":" + slotSplitted[1] + " PM";
                }
                else{
                    divObj8.innerText  =   slotHour + ":" + slotSplitted[1] +" PM";
                }
            }
         divObj9.innerText = arr[i].requests.complaintDescription;
         divObj10.innerHTML="<div class='dropdown'><a href='#' title='Remarks' class='align-img' data-toggle='dropdown' aria-expanded='false'><img class='cursor' src='images/remarks.svg' alt='remarks-icon'></a><div class='dropdown-menu m-0 p-3 user-filter' ><div class='container-fluid'><div class='row'><div class='col-md-12 mb-3'><div class='col-md-12 pb-2 border-0 mb-3'><button type='button' class='btn-close float-end close-filter' data-dismiss='user-filter' aria-label='Close'></button></div><h5 class='h-size1 mb-2'>Enter Remarks</h5><input type='text' class='form-control border-filter-style' id='remarks"+i+"'></div><div class='col-md-12'><button type='button' class='save-btn float-end' onclick='saveRemarks(this)'>Save</button><button type='button' class='cancel1-btn float-end '>Cancel</button></div><div></div></div></div>";
          divObj11.innerText = arr[i].requests.bookingId;
            
        trow.appendChild(divObj);
        trow.appendChild(divObj1);
        trow.appendChild(divObj2);
       trow.appendChild(divObj3);
        trow.appendChild(divObj4);
        trow.appendChild(divObj5);
        trow.appendChild(divObj6);
       trow.appendChild(divObj7);
        trow.appendChild(divObj8);
         trow.appendChild(divObj9);
          trow.appendChild(divObj10);
          trow.appendChild(divObj11);
          
         
          
   
        
        document.getElementById("table-body").appendChild(trow);
      var countSpan=document.getElementById("count");
     countSpan.innerHTML="Records  :"+$('#table-body tr').length+" out of "+count;
     document.getElementById("record").appendChild(countSpan);
     
     getSource();
     getDestination();
     
}
}
           
function saveRemarks(obj){
	//alert(obj.closest("input").id);
	trowId = obj.closest("tr").id;
	bookingId = document.getElementById(trowId).cells[11].innerText;
	replaceId = trowId.replace("row","");
	remarks = document.getElementById("remarks"+replaceId).value;
	
	var xhrRemark = new XMLHttpRequest();
	
	xhrRemark.open("PUT","http://localhost:8080/api/v1/remarks/"+bookingId+"/"+remarks,true);
	xhrRemark.onreadystatechange = function(){
		
		if(xhrRemark.readyState==4 && xhrRemark.status==200){
			window.location.reload();
		}
	};
	xhrRemark.send(null);
}

document.getElementById("cancelButton").addEventListener('click', closePopup);
function closePopup() {
	window.location.reload();
}

//getSource();
//     getDestination();


//Sources

function getSource() {
	var sourceXhr = new XMLHttpRequest();

	sourceXhr.open("GET", "http://localhost:8080/api/v1/source", true);
	sourceXhr.send();
	sourceXhr.onreadystatechange = function(){
		
		if(sourceXhr.readyState==4 && sourceXhr.status==200){
			
			var sources = JSON.parse(this.responseText);
			
			var clearSource = document.getElementById("Source");
			var srcLength = clearSource.options.length;

			for (i = srcLength - 1; i > 0; i--) {
				clearSource.options[i] = null;
			}



			for (var i = 0; i < sources.length; i++) {



				var opt = document.createElement("option");




				opt.innerHTML = sources[i].source;



				document.getElementById("Source").options.add(opt);



			}
		}
	};
}

//Destination
var destinations;
function getDestination() {

	var destXhr = new XMLHttpRequest();

	destXhr.open("GET", "http://localhost:8080/api/v1/destination", true);
	destXhr.send();
	destXhr.onreadystatechange = function() {

		if (destXhr.readyState == 4 && destXhr.status == 200) {

			destinations = JSON.parse(this.responseText);

			var clearDest = document.getElementById("Destination");
			var destLength = clearDest.options.length;

			for (i = destLength - 1; i > 0; i--) {
				clearDest.options[i] = null;
			}
			for (var i = 0; i < destinations.length; i++) {

				var opt = document.createElement("option");

				opt.innerHTML = destinations[i].destination;
				document.getElementById("Destination").options.add(opt);

			}
		}
	};

}

//For Populating TimeSlots based on Destination



document.getElementById("Destination").addEventListener('change', function() {



	//Clearing the options of TimeSlot drop down

	var clearTimeSlot = document.getElementById("Timeslot");
	var timeOptLength = clearTimeSlot.options.length;

	for (i = timeOptLength - 1; i > 0; i--) {
		clearTimeSlot.options[i] = null;
	}


	var selectedDestination = document.querySelector('#Destination').value;


	for  (var i=0; i<destinations.length; i++){


		if ((destinations[i].destination) == selectedDestination) {

			var curDate = new Date();
			var curHour = curDate.getHours();
			var curMin = curDate.getMinutes();
			var curSec = curDate.getSeconds();
			//alert(curHour);
			
			for(var k=0; k<destinations[i].timeSlots.length;k++){
				
				var timeSlotOption = document.createElement("option");

				var slot = destinations[i].timeSlots[k].timeSlot; //22:30:00
				
				var timeSlot = timeFormatTo12Hr(slot,0);
				
				timeSlotOption.innerHTML = timeSlot;
				
				document.getElementById("Timeslot").options.add(timeSlotOption);
			}
			
		}
	}
});



//Filter

function filterApplied(){
	var des = document.querySelector('#Destination').value;
	var source = document.querySelector('#Source').value;

	var slot = document.querySelector('#Timeslot').value;
	if (slot != 0) {
		var splittedTimeSlot = slot.split(":");
		if (splittedTimeSlot[1].includes("PM")) {
			seconds = splittedTimeSlot[1].split(" ");
			//alert(Number(splittedTimeSlot[1]));
			if (Number(splittedTimeSlot[0]) + 12 == 24) {
				slot = "12" + ":"  + seconds[0];
			}
			else {
				splittedTimeSlotHour = Number(splittedTimeSlot[0]) + 12;
				slot = splittedTimeSlotHour + ":"   + seconds[0];
			}
		}
		else {


			seconds = splittedTimeSlot[1].split(" ");
			if (Number(splittedTimeSlot[0] == 12)) {

				slot = "00" + ":"  + seconds[0];


			}
			if (Number(splittedTimeSlot[0]) < 10) {
				slot = "0" + Number(splittedTimeSlot[0])  + ":" + seconds[0];
			}
			// 					else{
			// 						slot = Number(splittedTimeSlot[0]) +":"+Number(splittedTimeSlot[1])+":"+seconds[0];
			// 					}
			else if (Number(splittedTimeSlot[0] <= 11)) {
				slot = Number(splittedTimeSlot[0]) + ":" + seconds[0];
			}
		}
	}
	var xhrFilter = new XMLHttpRequest();
	
	xhrFilter.open("GET","http://localhost:8080/api/v1/filterComplaints/"+source+"/"+des+"/"+slot);
	xhrFilter.send();
	xhrFilter.onreadystatechange = function(){
		
		if(xhrFilter.readyState==4 && xhrFilter.status==200){
			//$("#filterModal").modal('toggle');
			document.getElementById("filterModal").style.display="none";
			$("#table-body").empty();
			getAllComplaints(JSON.parse(this.responseText));
		}
		
		
	};
}

function getFilterTab(){
	document.getElementById("filterModal").style.display="block";
}
 //----------****--------------//
 //search starts here

document.getElementById("searchtab").addEventListener("keyup", function(event) {

	if (event.keyCode == 13) {
		//            	 var filter=document.getElementById("filterbtn");
		//                 filter.setAttribute('src','images/Vector.svg');
		//                 filterApplied= false;
		//                 searchApplied = true;
		//                 skip=0;
		getBySearch();
	}
});

function getBySearch(){
	
	var xhrSearch = new XMLHttpRequest();
	
	var searchtxt=document.getElementById("searchtab").value.trim();
    	 
    	 if(searchtxt==null || searchtxt=="" || searchtxt== undefined){
    		window.location.reload();
    	 }
	
	xhrSearch.open("GET","http://localhost:8080/api/v1/searchComplaint/"+searchtxt+"/0/10",true);
	xhrSearch.send();
	xhrSearch.onreadystatechange = function(){
		
		if(xhrSearch.readyState==4 && xhrSearch.status==200){
			var arr = JSON.parse(this.responseText);
			$("#table-body").empty();
			getAllComplaints(arr);
		}
	};
}
