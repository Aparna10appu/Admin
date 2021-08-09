//---------------------------------Today's Request Page ------------------------------//

var xmlGetAllRequests=new XMLHttpRequest();
var xmlGetAllSources=new XMLHttpRequest();
var xmlGetAllDestinations=new XMLHttpRequest();
var xmlGetFilteredRequests=new XMLHttpRequest();
var xhrSearch = new XMLHttpRequest();
var xhrCount= new XMLHttpRequest();

var searchApplied=false;
var filterApplied;
var skip;
var limit;
var count;

// To get Count of all the records with status booked


window.onload=loadMethods;
getTotalCount();


function getTotalCount(){
    xhrCount.open("GET","http://localhost:8080/bookingRequest/bookings/count",true);
    xhrCount.onreadystatechange=processResponseCount;
    xhrCount.send(null);
}



function processResponseCount(){
    if(xhrCount.readyState == 4 && xhrCount.status == 200){
        count= JSON.parse(xhrCount.responseText);
    }
}


///





// To set Date of Travel

getDate();

function getDate(){

    const date=new Date();
    const n=date.getDate(); const n1=date.getMonth()+1; const n2=date.getFullYear();
    document.getElementById("todayDate").innerHTML="Date of Travel: "+n+"/"+n1+"/"+n2;

}



// To load Today's Requests while switching tabs

document.getElementById("pills-todaysrequest-tab").addEventListener('click',function()
{
    document.getElementById("Destination").selectedIndex=0;
    document.getElementById("Source").selectedIndex=0;
    document.getElementById("timeslot").selectedIndex=0;
    document.getElementById("droppoint").selectedIndex=0;

    var length1=document.getElementById('timeslot').options.length;
    for (var i = length1 - 1; i > 0; i--) {
        document.getElementById("timeslot").options[i] = null;
    }

    var length2=document.getElementById('droppoint').options.length;
    for (var i = length2 - 1; i > 0; i--) {
        document.getElementById("droppoint").options[i] = null;
    }

    $("#tableBody").empty();
    skip=0;
    filterApplied=false;
    //	scrolled=true;
    getTodaysBookings();
    var filter=document.getElementById("filterbtn");
    filter.setAttribute('src','images/Vector.svg');
    
     getTotalCount();
    document.getElementById("topScrollButton").setAttribute('style','display:show');
    

    document.getElementById("searchTab").value=null;


});



///



function loadMethods()     // To load Today Bookings, source and Destination on Page Load
{


    skip=0;
    limit=10;
    filterApplied=false;
    getTodaysBookings();
    getSourceTr();
    getDestinationTr();
    //scrollDown(); temp comment, function to be removed later


}


// TO remove the Filters when cancel button is clicked in the filters popup

var cancelbtn=document.getElementById("cancelButton");
cancelbtn.addEventListener('click',function(){
    document.getElementById("Destination").selectedIndex=0;
    document.getElementById("Source").selectedIndex=0;
    document.getElementById("timeslot").selectedIndex=0;
    document.getElementById("droppoint").selectedIndex=0;

    var length1=document.getElementById('timeslot').options.length;
    for (var i = length1 - 1; i > 0; i--) {
        document.getElementById("timeslot").options[i] = null;
    }

    var length2=document.getElementById('droppoint').options.length;
    for (var i = length2 - 1; i > 0; i--) {
        document.getElementById("droppoint").options[i] = null;
    }

    $("#tableBody").empty();
    skip=0;filterApplied=false;

    var filter=document.getElementById("filterbtn");
    filter.setAttribute('src','images/Vector.svg');
    getTodaysBookings();
});

///





// Scroll Function
//document.getElementById("scrollTable").addEventListener('scroll',function()
//{
//    if ($("#scrollTable")[0].scrollHeight-$("#scrollTable").scrollTop()==$("#scrollTable").height()) {
//
//        skip = skip + limit;
//        if(searchApplied==true)
//        {
//            getBySearchTr();
//        }
//
//        else if(filterApplied==false){
//            getTodaysBookings();
//        }else if(filterApplied==true){
//            //scrolled=true;
//
//            getfilter();
////scrolled=false;
////filterApplied =true;
//
//
//        }
//    }
//
//});
///

window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight  >= document.documentElement.scrollHeight){
//    skip = skip + limit;alert(skip);
//    getTodaysBookings();
    

 

if($('#tableBody tr').length != count){
                        //skip = skip + limit; 
                        skip=$('#tableBody tr').length;
                        
                        getTotalCount();
                        if(filterApplied==false){
                        getTodaysBookings();
                        }else if(searchApplied==true){
                            
                            getBySearch()
                            }else if(filterApplied==true){
                        
                            getfilter(); 
                         
                        }
                    }
                    else{
                        skip=0;
                    
                    }
    }
})


// Load Today Bookings

function getTodaysBookings(){

    xmlGetAllRequests.open("GET","http://localhost:8080/bookingRequest/bookings/todayBookings/"+skip+"/"+limit,true);
    xmlGetAllRequests.onreadystatechange=todayBookingResponse;
    xmlGetAllRequests.send(null);

}


function todayBookingResponse(){



    if(xmlGetAllRequests.readyState==4 && xmlGetAllRequests.status==200)

    {
        if(xmlGetAllRequests.readyState==4 && xmlGetAllRequests.status==200)

        {
            // alert("2");
            var responseRequest=JSON.parse(xmlGetAllRequests.responseText);

            for(var i=0;i<responseRequest.length;i++)
            {
                // alert(responseRequest[i].employeeName);
                var trow=document.createElement('tr');
                trow.className="row-bg-style";
                trow.id="row-id";

                var tdata=document.createElement('td');
                tdata.className="spacing";
                tdata.innerHTML=

                    "<input class='form-check-input check' type='checkbox' value='' name='plan' id='flex-check'>"+
                    " <label class='form-check-label' for='flexCheckChecked'></label>";

                var tdata1=document.createElement('td');
                tdata1.className="spacing";
                tdata1.id="empId";
                tdata1.innerHTML=responseRequest[i].employeeId;

                var tdata2=document.createElement('td');
                tdata2.className="spacing";
                tdata2.id="empName";
                tdata2.innerHTML=responseRequest[i].employeeName;

                var tdata3=document.createElement('td');
                tdata3.className="spacing";
                tdata3.id="src";
                tdata3.innerHTML=responseRequest[i].source;

                var tdata4=document.createElement('td');
                tdata4.className="spacing";
                tdata4.id="dest";
                tdata4.innerHTML=responseRequest[i].destination;

                var tdata5=document.createElement('td');
                tdata5.className="spacing";
                tdata5.id="dpPt";
                tdata5.innerHTML=responseRequest[i].dropPoint;

                var tdata6=document.createElement('td');
                tdata6.className="spacing";
                tdata6.id="bookTime";

                createdDate=responseRequest[i].createdDate;
                //   alert(createdDate);

                var slot1 = responseRequest[i].bookingTime;

                tdata6.innerHTML = timeFormatTo12Hr(slot1,1);


                var tdata7 = document.createElement('td');
                tdata7.className = "spacing";
                tdata7.id = "timeSlot";

                var slot2 = responseRequest[i].timeSlot;
                tdata7.innerHTML = timeFormatTo12Hr(slot2,1);

                var tdata8=document.createElement('td');
                tdata8.style.display = "none";
                tdata8.id="bookingId";
                tdata8.innerHTML=responseRequest[i].bookingId;

                trow.appendChild(tdata);
                trow.appendChild(tdata1);
                trow.appendChild(tdata2);
                trow.appendChild(tdata3);
                trow.appendChild(tdata4);
                trow.appendChild(tdata5);
                trow.appendChild(tdata6);
                trow.appendChild(tdata7);
                trow.appendChild(tdata8);

                document.getElementById("tableBody").appendChild(trow);

            }

        }
        var countSpan=document.getElementById("counter");
        countSpan.innerHTML=$('#tableBody tr').length+" out of "+count;

    }
}


///


// To load Source details for filters


function getSourceTr()
{

    xmlGetAllSources.open("GET","http://localhost:8080/bookingRequest/sources",true);
    xmlGetAllSources.onreadystatechange=fetchSourceList;
    xmlGetAllSources.send(null);


}

function fetchSourceList()
{

    if(xmlGetAllSources.readyState==4 && xmlGetAllSources.status==200)
    {
        // to clear the list of sources
        var length=document.getElementById("Source").options.length;
        for (i = length - 1; i > 0; i--) {
            document.getElementById("Source").options[i] = null;
        }


        var listOfSources=JSON.parse(xmlGetAllSources.responseText);

        // to append the list of sources
        for(var i=0;i<listOfSources.length;i++)
        {

            var opt = document.createElement("option");
            opt.innerHTML = listOfSources[i].source;
            document.getElementById("Source").appendChild(opt);
        }


    }

}

///


// To load Destination Details for filters

function getDestinationTr()
{
    xmlGetAllDestinations.open("GET","http://localhost:8080/bookingRequest/destinations",true);
    xmlGetAllDestinations.onreadystatechange=fetchDestinationList;
    xmlGetAllDestinations.send(null);

}

function fetchDestinationList()
{
    if(xmlGetAllDestinations.readyState==4 && xmlGetAllDestinations.status==200)
    {
        var length=document.getElementById("Destination").options.length;
        for (i = length - 1; i > 0; i--) {
            document.getElementById("Destination").options[i] = null;
        }

        var listOfDestinations=JSON.parse(xmlGetAllDestinations.responseText);

        for(var i=0;i<listOfDestinations.length;i++)
        {
            var opt=document.createElement("option");
            opt.innerHTML=listOfDestinations[i].destination;
            document.getElementById("Destination").appendChild(opt);
        }
    }

}



document.getElementById("Destination").addEventListener('change',function()
{


    var selectedDestination = document.querySelector('#Destination').value;



    if(xmlGetAllDestinations.readyState==4 && xmlGetAllDestinations.status==200)

    {

        var length1=document.getElementById('timeslot').options.length;
        for (var i = length1 - 1; i > 0; i--) {
            document.getElementById("timeslot").options[i] = null;
        }

        var length2=document.getElementById('droppoint').options.length;
        for (var i = length2 - 1; i > 0; i--) {
            document.getElementById("droppoint").options[i] = null;
        }

        var listOfDestinations=JSON.parse(xmlGetAllDestinations.responseText);

        //alert(listOfDestinations[0].timeSlots[0].timeSlot)

        for(var i=0;i<listOfDestinations.length;i++)
        {
            if(listOfDestinations[i].destination==selectedDestination)
            {

                for(var j=0;j<listOfDestinations[i].timeSlots.length;j++)
                {
                    //alert(listOfDestinations[i].timeSlots.length);
                    var opt=document.createElement("option");
                    //opt.innerHTML=listOfDestinations[i].timeSlots[j].timeSlot;

                    var slot3 = listOfDestinations[i].timeSlots[j].timeSlot;
                    opt.innerHTML = timeFormatTo12Hr(slot3,1);

                    //alert(listOfDestinations[i].timeSlots[1].timeSlot);
                    document.getElementById("timeslot").appendChild(opt);
                }

                for(var j=0;j<listOfDestinations[i].dropPoints.length;j++)
                {
                    //alert(listOfDestinations[i].timeSlots.length);
                    var opt=document.createElement("option");
                    opt.innerHTML=listOfDestinations[i].dropPoints[j].dropPoint;
                    //alert(listOfDestinations[i].timeSlots[1].timeSlot);
                    document.getElementById("droppoint").appendChild(opt);
                }
            }
        }
    }

});

///


// To apply filters

document.getElementById("ApplyButton").addEventListener('click',function()
{
    $("#tableBody").empty();
    skip=0;
    filterApplied=true;

    changeFilter();
    getfilter();
});

function getfilter()
{


    //skip=0;
    //filterApplied=true;
    //$("#tableBody").empty();







    var dest=document.querySelector('#Destination').value;

    if(dest=="Select Destination")
    {
        dest=0;
    }

    var sour=document.querySelector('#Source').value;

    if(sour=="Select Source")
    {
        sour=0;
    }


    var drop=document.querySelector('#droppoint').value;

    if(drop=="Select Drop Point")
    {
        drop=0;
    }

    var time=document.querySelector('#timeslot').value;

    if(time=="Select Time Slot")
    {
        time=0;
    }
    else
    {
//		var splittedTimeSlot = time.split(":");
//if(splittedTimeSlot[1].includes("PM")){
//	minutes = splittedTimeSlot[1].split(" ");
////alert(Number(splittedTimeSlot[1]));
//if(Number(splittedTimeSlot[0])+12==24){
//time= "12"+":"+Number(minutes[0])+":"+"00";
//}
//else{
//splittedTimeSlotHour = Number(splittedTimeSlot[0])+12;
//time= splittedTimeSlotHour +":"+Number(minutes[0])+":"+"00";
//}
//}
//else{
//	minutes = splittedTimeSlot[1].split(" ");
//	if(Number(splittedTimeSlot[0])==12)
//	{
//		time= "00"+":"+Number(minutes[0])+":"+"00";
//	}
//if(Number(splittedTimeSlot[0])<10){
//time= "0"+Number(splittedTimeSlot[0]) +":"+Number(minutes[0])+":"+"00";
//}
//else{
//time= Number(splittedTimeSlot[0]) +":"+Number(minutes[0])+":"+"00";
//}
//}

        const [time1, modifier] = time.split(' ');
        let [hours, minutes] = time1.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        time=hours+":"+minutes+":"+"00";


    }


    xmlGetFilteredRequests.open("GET","http://localhost:8080/bookingRequest/filter/"+sour+"/"+dest+"/"+drop+"/"+time+"/"+skip+"/"+limit,true);
    xmlGetFilteredRequests.onreadystatechange=getFilters;
    xmlGetFilteredRequests.send();
}


function getFilters()
{



    if(xmlGetFilteredRequests.readyState==4 && xmlGetFilteredRequests.status==200)
    {






        var filteredRequest=JSON.parse(xmlGetFilteredRequests.responseText);
        //	alert(filteredRequest.length);
        for(var i=0;i<filteredRequest.length;i++)
        {
            var trow=document.createElement('tr');
            trow.className="row-bg-style";

            var tdata=document.createElement('td');
            tdata.className="spacing";
            tdata.innerHTML=

                "<input class='form-check-input check' type='checkbox' value='' name='plan' id='flex-check'>"+
                " <label class='form-check-label' for='flexCheckChecked'></label>";

            var tdata1=document.createElement('td');
            tdata1.className="spacing";
            tdata1.id="empId";
            tdata1.innerHTML=filteredRequest[i].employeeId;

            var tdata2=document.createElement('td');
            tdata2.className="spacing";
            tdata2.id="empName";
            tdata2.innerHTML=filteredRequest[i].employeeName;

            var tdata3=document.createElement('td');
            tdata3.className="spacing";
            tdata3.id="src";
            tdata3.innerHTML=filteredRequest[i].source;

            var tdata4=document.createElement('td');
            tdata4.className="spacing";
            tdata4.id="dest";
            tdata4.innerHTML=filteredRequest[i].destination;

            var tdata5=document.createElement('td');
            tdata5.className="spacing";
            tdata5.id="dpPt";
            tdata5.innerHTML=filteredRequest[i].dropPoint;

            var tdata6=document.createElement('td');
            tdata6.className="spacing";
            tdata6.id="bookTime";

            var slot4 = filteredRequest[i].bookingTime;
            tdata6.innerHTML = timeFormatTo12Hr(slot4,1);



            var tdata7=document.createElement('td');
            tdata7.className="spacing";
            tdata7.id="timeSlot";

            var slot5 = filteredRequest[i].timeSlot;
            tdata7.innerHTML = timeFormatTo12Hr(slot5,1);

            var tdata8=document.createElement('td');
            tdata8.style.display = "none";
            tdata8.id="bookingId";
            tdata8.innerHTML=filteredRequest[i].bookingId;


            trow.appendChild(tdata);
            trow.appendChild(tdata1);
            trow.appendChild(tdata2);
            trow.appendChild(tdata3);
            trow.appendChild(tdata4);
            trow.appendChild(tdata5);
            trow.appendChild(tdata6);
            trow.appendChild(tdata7);
            trow.appendChild(tdata8);
            document.getElementById("tableBody").appendChild(trow);




        }
        var countSpan=document.getElementById("counter");
        countSpan.innerHTML=$('#tableBody tr').length+" out of "+count;

    }

}

///

function changeFilter()
{

//alert("2");
    var filter=document.getElementById("filterbtn");
    if(document.getElementById("Destination").selectedIndex!=0 || document.getElementById("Source").selectedIndex!=0)
    {
        //alert("1");
        filter.setAttribute('src','images/VectorFil1.svg');

    }
    else
    {
        filter.setAttribute('src','images/Vector.svg');
    }


}




document.getElementById("searchTab").addEventListener("keyup", function (event) {

    if (event.keyCode == 13) {

        filterApplied=false;
        searchApplied=true;
        skip=0;
        var filter=document.getElementById("filterbtn");
        filter.setAttribute('src','images/Vector.svg');

        getBySearchTr();

    }
});

document.getElementById("addon-wrapping").addEventListener("click", function() {

    filterApplied=false;
    searchApplied=true;
    skip=0;
    var filter=document.getElementById("filterbtn");
    filter.setAttribute('src','images/Vector.svg');

    getBySearchTr();

});

function getBySearchTr(){


        var searchtxt=document.getElementById("searchTab").value.trim();

        if(searchtxt==null || searchtxt=="" || searchtxt== undefined){

            searchApplied=false;
            skip=0;

            $("#tableBody").empty();
            getTodaysBookings();
        }
        xhrSearch.open("GET","http://localhost:8080/bookingRequest/search/"+searchtxt+"/"+skip+"/"+limit,true);
        xhrSearch.onreadystatechange=processResponseSearch;

        xhrSearch.send(null);



}

function processResponseSearch()
{
    if(xhrSearch.readyState == 4 && xhrSearch.status == 200)
    {
        $("#tableBody").empty();
        var arr = JSON.parse(xhrSearch.responseText);

        for(var i=0;i<arr.length;i++)
        {
            var trow=document.createElement('tr');
            trow.className="row-bg-style";

            var tdata=document.createElement('td');
            tdata.className="spacing";
            tdata.innerHTML=

                "<input class='form-check-input check' type='checkbox' value='' name='plan' id='flex-check'>"+
                " <label class='form-check-label' for='flexCheckChecked'></label>";

            var tdata1=document.createElement('td');
            tdata1.className="spacing";
            tdata1.innerHTML=arr[i].employeeId;

            var tdata2=document.createElement('td');
            tdata2.className="spacing";
            tdata2.innerHTML=arr[i].employeeName;

            var tdata3=document.createElement('td');
            tdata3.className="spacing";
            tdata3.innerHTML=arr[i].source;

            var tdata4=document.createElement('td');
            tdata4.className="spacing";
            tdata4.innerHTML=arr[i].destination;

            var tdata5=document.createElement('td');
            tdata5.className="spacing";
            tdata5.innerHTML=arr[i].dropPoint;

            var tdata6=document.createElement('td');
            tdata6.className="spacing";

            var slot6 = arr[i].bookingTime;
            tdata6.innerHTML = timeFormatTo12Hr(slot6,1);


            var tdata7=document.createElement('td');
            tdata7.className="spacing";

            var slot7 = arr[i].timeSlot;
            tdata7.innerHTML = timeFormatTo12Hr(slot7,1);

            var tdata8=document.createElement('td');
            tdata8.style.display = "none";
            tdata8.id="bookingId";
            tdata8.innerHTML=arr[i].bookingId;

            trow.appendChild(tdata);
            trow.appendChild(tdata1);
            trow.appendChild(tdata2);
            trow.appendChild(tdata3);
            trow.appendChild(tdata4);
            trow.appendChild(tdata5);
            trow.appendChild(tdata6);
            trow.appendChild(tdata7);
            trow.appendChild(tdata8);

            document.getElementById("tableBody").appendChild(trow);




        }
        var countSpan=document.getElementById("counter");
        countSpan.innerHTML=$('#tableBody tr').length+" out of "+count;

    }

}


//---------------------------------Today's Request Page ends here ------------------------------//

//----------------------------Assign To Cab Pop up starts here  ------------------------------------//
// Function  to get all cabmodel and reset the other fields

var xhrCabModel = new XMLHttpRequest();

var selected = 0;
var destination;
var timeSlots;
document.getElementById("assign-to-cab-button").addEventListener('click',function(){
    event.preventDefault();
    xhrCabModel.open("GET","http://localhost:8080/bookingRequest/cabModel",true);

    document.getElementById("cab-number").selectedIndex=0;
    document.getElementById("cab-driver-name").value=null;
    document.getElementById("cab-driver-number").value= null;
    document.getElementById("total-seats").innerText="Available No. Of Seats :";
    document.getElementById("allocated-seats").innerText="Allocated No. Of Seats :";
    document.getElementById("remaining-seats").innerText="Remaining No. Of Seats :";
    xhrCabModel.onreadystatechange=processResponse;
    xhrCabModel.send(null);
    $("#cab-driver-name").prop("readonly",true);
    $("#cab-driver-number").prop("readonly",true);
    $("#total-seats").prop("readonly",true);
});

var cabModels;

function processResponse(){
    if(xhrCabModel.readyState == 4 && xhrCabModel.status == 200){
        var cabModelList= document.getElementById("cab-model");
        var length = cabModelList.options.length;

        for (i = length-1; i > 0; i--) {
            cabModelList.options[i] = null;
        }

        cabModels = JSON.parse(xhrCabModel.responseText);

        for(var i=0; i<cabModels.length; i++){

            var opt = document.createElement("option");

            opt.innerHTML = cabModels[i];
            document.getElementById("cab-model").options.add(opt);

        }

    }
}


// ---------------------------------------------------------------------------------------------------------------//


// Fetch Cab Number
var xhrCabNumber = new XMLHttpRequest();

document.getElementById("cab-model").addEventListener('change',function(){
    event.preventDefault();
    document.getElementById("cab-driver-name").value=null;
    document.getElementById("cab-driver-number").value= null;
    document.getElementById("total-seats").innerText="Available No. Of Seats :";
    document.getElementById("allocated-seats").innerText="Allocated No. Of Seats :";
    document.getElementById("remaining-seats").innerText="Remaining No. Of Seats :";

    var selectedCabModel = document.querySelector('#cab-model').value;

    xhrCabNumber.open("GET","http://localhost:8080/bookingRequest/cabNum/"+selectedCabModel+"/"+selected+"/"+destination+"/"+timeSlots,true);

    xhrCabNumber.onreadystatechange=processResponseChange;
    xhrCabNumber.send(null);

});

var cabNumbers;

function processResponseChange(){
    if(xhrCabNumber.readyState == 4 && xhrCabNumber.status == 200){


        var cabNumberList= document.getElementById("cab-number");
        var length = cabNumberList.options.length;

        for (i = length-1; i > 0; i--) {
            cabNumberList.options[i] = null;
        }

        cabNumbers = JSON.parse(xhrCabNumber.responseText);


        for(var i=0; i<cabNumbers.length; i++){

//console.log(cabNumbers);


            var cabNumberOption = document.createElement("option");
            cabNumberOption.innerHTML = cabNumbers[i].cabNumber;
            document.getElementById("cab-number").options.add(cabNumberOption);

        }

    }
}

//---------------------------------------------------------------------------------------------------------------//


// To auto fill the driver details and seat details

var xhrDetails = new XMLHttpRequest();
var selectedCabNumber;
document.getElementById("cab-number").addEventListener('change',function(){
    event.preventDefault();

    var selectedCabModel = document.querySelector('#cab-model').value;

    xhrDetails.open("GET","http://localhost:8080/bookingRequest/cabNum/"+selectedCabModel+"/"+selected+"/"+destination+"/"+timeSlots,true);

    xhrDetails.onreadystatechange=processResponseChangeCabNum;
    xhrDetails.send(null);
    selectedCabNumber=document.querySelector('#cab-number').value;
});
function processResponseChangeCabNum(){

    var  cabNumbers1 = JSON.parse(xhrDetails.responseText);

    for(var i=0; i<cabNumbers1.length;i++){

        if((cabNumbers1[i].cabNumber)==selectedCabNumber){



            document.getElementById("cab-driver-name").value= cabNumbers1[i].driverName;
            document.getElementById("cab-driver-number").value= cabNumbers1[i].driverNumber;


            document.getElementById("total-seats").innerText="Available No. Of Seats : "+cabNumbers1[i].totalSeats;
            document.getElementById("allocated-seats").innerText="Allocated No. Of Seats : "+cabNumbers1[i].allocatedSeats;
            document.getElementById("remaining-seats").innerText="Remaining No. Of Seats : "+cabNumbers1[i].remainingSeats;



        }

    }


}



//--------------------------------------------------------------------------------------------------------------------------------------------------//


// To pass the checked value row information
var selectedSrc;
var selectedDest;
var selectedTimeSlot;
var checkedValue;

var date;
var dateOfTravel;
var currentDate;
var xhrChecked = new XMLHttpRequest();
var plans;
var submitBtn = document.getElementById("assign-to-cab-button");

submitBtn.addEventListener('click',function(){

    event.preventDefault();

    var table = document.getElementById("tableBody");

    var count1 = table.rows.length;

    plans = new Array();
    var defDest=null;
    var defTimeSlot=null;

    for(var i=0;i<count1;i++){

        checkedValue = table.rows[i].querySelector('input[type=checkbox][name=plan]:checked');


        if(checkedValue){


            var id = table.rows[i].cells.empId.innerText;
            var name = table.rows[i].cells.empName.innerText;
            selectedSrc = table.rows[i].cells.src.innerText;
            selectedDest = table.rows[i].cells.dest.innerText;
            var dropPt = table.rows[i].cells.dpPt.innerText;
            var bookingId = table.rows[i].cells.bookingId.innerText;
            //	var bookTime = table.rows[i].cells.bookTime.innerText;

            var splittedTimeSlot1;
            var slot1=table.rows[i].cells.bookTime.innerText;
            if (slot1 != 0) {
                splittedTimeSlot1 = slot1.split(":");

                //add 0 if mins < 10 -jithendra
                var slotMins;
                if(splittedTimeSlot1[1] < 10) {
                    slotMins = "0" + Number(splittedTimeSlot1[1]);
                } else {
                    slotMins = splittedTimeSlot1[1];
                }

                //in below if-else changed Number(splittedTimeSlot1[1]) to slotMins
                ///////////////////////////////////////////

                if (splittedTimeSlot1[2].includes("PM")) {
                    seconds = splittedTimeSlot1[2].split(" ");
                    //alert(Number(splittedTimeSlot1[1]));
                    if (Number(splittedTimeSlot1[0]) + 12 == 24) {
                        slot1 = "12" + ":" + slotMins + ":" + seconds[0];
                    }
                    else {
                        splittedTimeSlotHour = Number(splittedTimeSlot1[0]) + 12;
                        slot1 = splittedTimeSlotHour + ":" + slotMins + ":" + seconds[0];
                    }
                }
                else {
                    //alert("AM");
                    seconds = splittedTimeSlot1[2].split(" ");
                    if (Number(splittedTimeSlot1[0] == 12)) {
                        //alert(splittedTimeSlot1[0]);
                        slot1 = "00" + ":" + "0" + slotMins + ":" + seconds[0];
                        //alert(slot1);
                    }
                    if (Number(splittedTimeSlot1[0]) < 10) {
                        slot1 = "0" + Number(splittedTimeSlot1[0]) + ":" + slotMins + ":" + seconds[0];
                    }

                    else if (Number(splittedTimeSlot1[0] <= 11)) {
                        slot1 = Number(splittedTimeSlot1[0]) + ":" + slotMins + ":" + seconds[0];
                    }
                }
            }

            bookTime=slot1;

            var slot=table.rows[i].cells.timeSlot.innerText;
            var splittedTimeSlot;
            if (slot != 0) {


                //	  var date = addDays(new Date(),0);
                //    currentDate=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+date.getDate();

                splittedTimeSlot = slot.split(":");
                if (splittedTimeSlot[2].includes("PM")) {
                    seconds = splittedTimeSlot[2].split(" ");
                    //alert(Number(splittedTimeSlot[1]));
                    if (Number(splittedTimeSlot[0]) + 12 == 24) {
                        slot = "12" + ":" + Number(splittedTimeSlot[1]) + ":" + seconds[0];
                    }
                    else {
                        if(splittedTimeSlot[1]<10){

                            splittedTimeSlotHour = Number(splittedTimeSlot[0]) + 12;
                            slot = splittedTimeSlotHour + ":" + "0"+Number(splittedTimeSlot[1]) + ":" + seconds[0];
                        }
                        else{

                            splittedTimeSlotHour = Number(splittedTimeSlot[0]) + 12;
                            slot = splittedTimeSlotHour + ":" +Number(splittedTimeSlot[1]) + ":" + seconds[0];
                        }

                    }
                }
                else {
                    //	alert("AM");
                    // alert(AddDays(date,1));
                    //	var date = addDays(new Date(),1);

                    //  currentDate=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+date.getDate();

                    seconds = splittedTimeSlot[2].split(" ");
                    if (Number(splittedTimeSlot[0] == 12)) {
                        //alert(splittedTimeSlot[0]);
                        if(Number(splittedTimeSlot[1]) < 10){
                            slot =  "00"+ ":" + "0"+Number(splittedTimeSlot[1]) + ":" + seconds[0];


                        }

                        else{

                            slot =  "00" + ":" + Number(splittedTimeSlot[1]) + ":" + seconds[0];

                        }
                        //alert(slot);
                    }
                    if (Number(splittedTimeSlot[0]) < 10) {

                        if(Number(splittedTimeSlot[1]) < 10){
                            slot = "0" + Number(splittedTimeSlot[0]) + ":" + "0"+Number(splittedTimeSlot[1]) + ":" + seconds[0];


                        }

                        else{

                            slot = "0" + Number(splittedTimeSlot[0]) + ":" + Number(splittedTimeSlot[1]) + ":" + seconds[0];

                        }
                    }

                    else if (Number(splittedTimeSlot[0] <= 11)) {
                        slot = Number(splittedTimeSlot[0]) + ":" + Number(splittedTimeSlot[1]) + ":" + seconds[0];

                        if(Number(splittedTimeSlot[1]) < 10){
                            slot =  Number(splittedTimeSlot[0]) + ":" + "0"+Number(splittedTimeSlot[1]) + ":" + seconds[0];


                        }

                        else{

                            slot =  Number(splittedTimeSlot[0]) + ":" + Number(splittedTimeSlot[1]) + ":" + seconds[0];

                        }
                    }
                }


                if(splittedTimeSlot1[2].includes("PM")&&splittedTimeSlot[2].includes("AM")){

                    date=addDays(new Date(),1);


                    if((date.getMonth()+1)<10){
                        if(date.getDate()<10){
                            dateOfTravel=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+date.getDate();
                            //alert(dateOfTravel);
                        }

                        else{
                            dateOfTravel=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+date.getDate();
                            //alert(dateOfTravel);
                        }
                    }
                    else{
                        if(date.getDate()<10){
                            dateOfTravel=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+"0"+date.getDate();
                            //alert(dateOfTravel);
                        }

                        else{
                            dateOfTravel=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                            // alert(dateOfTravel);
                        }
                    }

                }

                else{

                    date=addDays(new Date(),0);

                    if((date.getMonth()+1)<10){
                        if(date.getDate()<10){
                            dateOfTravel=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+"0"+date.getDate();
                            // alert(dateOfTravel);
                        }

                        else{
                            dateOfTravel=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+date.getDate();
                            //alert(dateOfTravel);
                        }
                    }
                    else{
                        if(date.getDate()<10){
                            dateOfTravel=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+"0"+date.getDate();
                            //alert(dateOfTravel);
                        }

                        else{
                            dateOfTravel=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                            // alert(dateOfTravel);
                        }
                    }

                }

            }
            selectedTimeSlot=slot;


            if(defDest!=null && defTimeSlot!=null){

                if(defDest!=selectedDest || defTimeSlot!=selectedTimeSlot){
                    alert("Not valid - select same destination and time slot");
                    document.getElementById("assign-to-cab-button").setAttribute("data-target","none");
                    return false;
                }
                else{
                    document.getElementById("assign-to-cab-button").setAttribute("data-target","#assign-to-cab");
                }
            }

            defDest=selectedDest;
            defTimeSlot=selectedTimeSlot;
            var plan = {"employeeId":id,"employeeName":name,"source":selectedSrc,"destination":selectedDest,
                "dropPoint":dropPt,"bookingTime":bookTime,"timeSlot":selectedTimeSlot, "bookingId":bookingId};
            plans.push(plan);

            selected=selected+1;
            destination=selectedDest;
            timeSlots=selectedTimeSlot;
        }
        else{
            continue;
        }
        //alert("Selected "+selected);

    }
    if(plans.length==0){

        alert("Check atleast one Employee");
        document.getElementById("assign-to-cab-button").setAttribute("data-target","none");
        return false;
    }

    else{
        document.getElementById("assign-to-cab-button").setAttribute("data-target","#assign-to-cab");
    }
    //alert(plans);

});


//----------------------------------------------------------------------------------------------------------//
//  To save the trip info

var xhrAssign = new XMLHttpRequest();

    var sel;
var assignBtn = document.getElementById("assign-btn");

assignBtn.addEventListener('click',function(){

    if(document.getElementById("cab-model").selectedIndex == 0){
        alert("Select Cab Model");
        document.getElementById("assign-btn").setAttribute("data-dismiss","none");
        return false;
    }

    else if(document.getElementById("cab-number").selectedIndex == 0){
        alert("Select Cab Number");
        document.getElementById("assign-btn").setAttribute("data-dismiss","none");

        return false;
    }

    else{
        document.getElementById("assign-btn").setAttribute("data-dismiss","modal");
    }

    event.preventDefault();
    var cabNum= document.querySelector('#cab-number').value;

    var driverName=  document.querySelector("#cab-driver-name").value;
    var driverNumber= document.querySelector("#cab-driver-number").value;

    var ts= parseInt(document.querySelector("#total-seats").innerText.split(": ")[1]);
    var as= parseInt(document.querySelector("#allocated-seats").innerText.split(": ")[1]);
    var rs= parseInt( document.querySelector("#remaining-seats").innerText.split(": ")[1]);

    //alert(selected);

    var trip = {"cabNumber":cabNum,"driverNumber":driverNumber,"source":selectedSrc,"destination":selectedDest,
        "dateOfTravel":dateOfTravel,"timeSlot":selectedTimeSlot,"totalSeats":ts,"allocatedSeats":selected, "empList":plans};

  sel=selected;

    //alert(trip);
    var url = "http://localhost:8080/bookingRequest/save/tripInfo";

    xhrAssign.open("POST",url,true);

    xhrAssign.onreadystatechange=processResponseAssigned;

    xhrAssign.setRequestHeader("Content-Type", "application/json");

    xhrAssign.send(JSON.stringify(trip));

});

function processResponseAssigned(){

    //alert(xhrAssign.readyState);
    //alert(xhrAssign.status);
    if(xhrAssign.readyState == 4 && xhrAssign.status == 302)
    {
        var response = xhrAssign.responseText;

        alert("Trip added successfully");
        deleteRow();
        selected=0;
	         getTotalCount();
	         count=count-sel;
	         var countSpan=document.getElementById("counter");
			countSpan.innerHTML=$('#tableBody tr').length+" out of "+count;
       
    }
    if(xhrAssign.readyState == 4 && xhrAssign.status == 303)
    {
        var response = xhrAssign.responseText;

       alert(response);
        // deleteRow();
        window.location.reload();
        selected=0;
    }
    selected=0;
}

function deleteRow()  {

    // alert("delete");

    $('input:checked').each(function() {
        $(this).closest('tr').remove();
    });
}

//--------------------------------------------------------------------------------------------------------------------------------------------//

// Function to set selected=0 in the close and cancel

function cancel(){

    selected=0;

}

//-------------------------------------------------------------------------------------------------------------------------------------------//

//    // Function to check atleast one employee is selected
//
//    		function check(){
//				if(document.getElementById("flex-check").checked==false){
//
//				 alert("Check atleast one employee");
//				 return false;
//				}
//
//          }


//----------------------------------------------------------------------------------------
// Function to assign date of travel

function addDays(date, days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}





//$("#ScrollUp").click( function() {
//   $(window).scrollTop(0);
// });
// 
 document.getElementById("ScrollUp").addEventListener("click",function()
 {
	$(window).scrollTop(0);
});

//----------------------------Assign To Cab Pop up ends here  ------------------------------------//
