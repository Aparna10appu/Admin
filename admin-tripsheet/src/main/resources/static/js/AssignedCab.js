//---------------------------Script Starts Here---------------------------------------------------------------
var isTodaysRequestTabClicked;
//alert(isTodaysRequestTabClicked);
var submitBtn2 = document.getElementById("pills-todaysrequest-tab");  // AssignedCab NavId
submitBtn2.addEventListener('click',function(){
    document.getElementById("drop").style.display=""
    document.getElementById("assign-to-cab-button").style.display=""
    isTodaysRequestTabClicked= true;

});
//script for FindAll request
var xhr = new XMLHttpRequest();
var skip=0;
var limit=10;
var searchApplied= false;
var filterApplied =false;
var submitBtn2 = document.getElementById("pills-assignedcabs-tab");  // AssignedCab NavId
submitBtn2.addEventListener('click',function(){
    document.getElementById("drop").style.display="none"
    document.getElementById("assign-to-cab-button").style.display="none"
    isTodaysRequestTabClicked= false;
    document.getElementById("Destination").selectedIndex=0;  // Clear the filter
    document.getElementById("Source").selectedIndex=0;
    document.getElementById("timeslot").selectedIndex=0;
    filterApplied=false;
    var filter=document.getElementById("filterbtn");
    filter.setAttribute('src','images/Vector.svg');
    $("#cab-body").empty();
    skip=0;
    getAssignedCabs(skip,limit);
    document.getElementById("searchTab").value=null;

});
//filterApplied=true;
var cancel=document.getElementById("cancelButton");  // CancelButton to get All AssignedCab
cancel.addEventListener('click',function(){
    document.getElementById("Destination").selectedIndex=0;  // Clear the filter
    document.getElementById("Source").selectedIndex=0;
    document.getElementById("timeslot").selectedIndex=0;
    filterApplied=false;
    var filter=document.getElementById("filterbtn");
    filter.setAttribute('src','images/Vector.svg');
    $("#cab-body").empty();
    skip=0;
    getAssignedCabs(skip,limit);
});

// getAssignedCab Function -->Starts
function getAssignedCabs(skip,limit){
    //Path get all assignedCabs
    //xhr.open("GET","http://localhost:8080/api/v1/assignedCab/cabs",true);
    // path get all assignedCabs with Scrollevent

    xhr.open("GET","http://localhost:8080/api/v1/scroll/"+skip+"/"+limit,true);
    xhr.onreadystatechange=processResponse2;
    xhr.send(null);

}


// To get total count of records-->                                          // Total Records
var xhrCount= new XMLHttpRequest();
function getTotalCount(){
    xhrCount.open("GET","http://localhost:8080/api/v1/count",true);
    xhrCount.onreadystatechange=processResponseCount;
    xhrCount.send(null);
}
var count;
function processResponseCount(){
    if(xhrCount.readyState == 4 && xhrCount.status == 200){
        count= JSON.parse(xhrCount.responseText);

    }
}
getTotalCount();                                        // Function to Call Total Records


var counttr=0;
//Function to display all AssignedCabs -->ProcessResponse2
function processResponse2(){
    event.preventDefault();

    if(xhr.readyState == 4 && xhr.status == 200)
    {
        // $("#cab-body").empty();
        var arr = JSON.parse(xhr.responseText);
        for(var i=0;i<arr.length; i++){

            // creating row and data
            var trow=document.createElement('tr');
            trow.className="row-bg-style";       // addingStyle class
            trow.id=counttr++;
            var divObj = document.createElement('td');
            divObj.className="spacing";
            var divObj1 = document.createElement('td');
            divObj1.className="spacing";
            var divObj2 = document.createElement('td');
            divObj2.className="spacing";
            var divObj3 = document.createElement('td');
            divObj3.className="spacing";
            var divObj4 = document.createElement('td');
            divObj4.className="spacing";
            var divObj5 = document.createElement('td');
            divObj5.className="spacing";
            var divObj6 = document.createElement('td');
            divObj6.className="spacing";
            var divObj7 = document.createElement('td');
            divObj7.className="spacing";
            var divObj8 = document.createElement('td');
            divObj8.className="spacing";
            divObj8.style.display="none";

            divObj.innerText = arr[i].cabNumber ;
            divObj1.innerText = arr[i].driver.driverName;
            divObj2.innerText = arr[i].driver.driverNumber;
            divObj3.innerText = arr[i].source;
            divObj4.innerText = arr[i].destination;
            var date =arr[i].dateOfTravel.split("\-");
            var day=date[2]+"/"+date[1]+"/"+date[0];
            divObj5.innerText  =day;

            slot=arr[i].timeSlot;
            var slotSplitted = slot.split(":"); //[22,30,00]
            slotHour = slotSplitted[0];
            if(slotHour<12){
                if(slotHour==00){
                    divObj6.innerHTML = "12"+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                }
                else{
                    divObj6.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                }
            }
            else{


                slotHour = slotHour-12;
                if(slotHour<10){
                    divObj6.innerHTML = "0"+slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                }else{
                    divObj6.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                }
            }

            divObj7.innerHTML="<a onclick='actionBtn(this)' title='View' class='align-img'  ><img src='images/View.svg' alt='View-icon' /></a>";
            divObj8.innerText= arr[i].tripCabId;

            trow.appendChild(divObj);
            trow.appendChild(divObj1);
            trow.appendChild(divObj2);
            trow.appendChild(divObj3);
            trow.appendChild(divObj4);
            trow.appendChild(divObj5);
            trow.appendChild(divObj6);
            trow.appendChild(divObj7);
            trow.appendChild(divObj8);
            document.getElementById("cab-body").appendChild(trow);
//record--> to get rowcount


            var countSpan=document.getElementById("count");
            countSpan.innerHTML=$('#cab-body tr').length+" out of "+count;
            document.getElementById("record").appendChild(countSpan);

        }

    }

}
//Cancel & AssignedCab---------------------> ends

//------------------------------------------------------------------------------------------------------------

// DropDown  --> Starts
var xhr1 = new XMLHttpRequest();
document.getElementById("pills-assignedcabs-tab").addEventListener('click',function(){
  //alert(getDestination);
    getDestination();
    getSource();

});

//Function To Display the List of Destination in dropDown                         //DestinationList
function getDestination() {
    // var filterbtn = document.getElementById("filterbtn");

    // filterbtn.addEventListener('click',function(){
    event.preventDefault();
    xhr1.open("GET", "http://localhost:8080/api/v1/destinationlist",
        true);
    xhr1.onreadystatechange = processResponsedest;
    xhr1.send(null);
}
var destinations;
function processResponsedest() {

    if (xhr1.readyState == 4 && xhr1.status == 200) {
        var destlist = document.getElementById("Destination");
        var length = destlist.options.length;
        for (i = length - 1; i > 0; i--) {
            destlist.options[i] = null;
        }

        destinations = JSON.parse(xhr1.responseText);

        for (var i = 0; i < destinations.length; i++) {

            var des = document.createElement("option");
            des.innerHTML = destinations[i].destination;
            document.getElementById("Destination").options.add(des);
        }

    }
}

// Function to get the List of Source--->                                // Source List
var xhr2 = new XMLHttpRequest();
function getSource() {
    //var filterbtn = document.getElementById("filterbtn");

    // filterbtn.addEventListener('click',function(){
    event.preventDefault();
    xhr2.open("GET", "http://localhost:8080/api/v1/sourcelist", true);
    xhr2.onreadystatechange = processResponse3;
    xhr2.send(null);
}
function processResponse3() {

    if (xhr2.readyState == 4 && xhr2.status == 200) {

        var sourcelist = document.getElementById("Source");
        var length = sourcelist.options.length;
        for (i = length - 1; i > 0; i--) {
            sourcelist.options[i] = null;
        }

        var arr = JSON.parse(xhr2.responseText);

        for (var i = 0; i < arr.length; i++) {

            var op = document.createElement("option");
            op.innerHTML = arr[i].source;
            document.getElementById("Source").options.add(op);
        }

    }
}
// script to display timeSlot based on destination                              //TimeSlot
document.getElementById("Destination").addEventListener('change',function() {

    // to remove repitation of list
    var clearTimeSlot = document.getElementById("timeslot");
    var timeOptLength = clearTimeSlot.options.length;
    for (i = timeOptLength - 1; i > 0; i--) {
        clearTimeSlot.options[i] = null;
    }
    //selected destination
    var selectedDestination = document.querySelector('#Destination').value;
    //to list the destination
    for (var i = 0; i < destinations.length; i++) {
        // condition to check the destination matches with selected
        if ((destinations[i].destination) == selectedDestination) {

            for (var j = 0; j < destinations[i].timeSlots.length; j++) {
                var timeSlotOption = document.createElement("option");
                var slot=destinations[i].timeSlots[j].timeSlot;
                var slotSplitted = slot.split(":"); //[22,30,00]
                slotHour = slotSplitted[0];
                if(slotHour<12){
                    if(slotHour==00){
                        timeSlotOption.innerHTML = "12"+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                    }
                    else{
                        timeSlotOption.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                    }
                }
                else{


                    slotHour = slotHour-12;
                    if(slotHour<10){
                        timeSlotOption.innerHTML = "0"+slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                    }else{
                        timeSlotOption.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                    }
                }
                //timeSlotOption.innerHTML = destinations[i].slot[j].time;
                document.getElementById("timeslot").options.add(timeSlotOption);
            }
        }
    }
});
//Filter DropDown--------------> ends

//----------------------------------------------------------------------------------------------------------------------------

//ApplyFilter---------------------> starts                                  -ApplyButtonClicked
var xhrFilter = new XMLHttpRequest();
document.getElementById('ApplyButtonAssignedCabs').addEventListener('click',function(){

	alert("hello");
    skip=0;
    filterApplied=true;
    $("#cab-body").empty();
    changeFilter();
    getApplyFilter();
});



function getApplyFilter(){


    event.preventDefault();

    var des = document.querySelector('#Destination').value;
    var source = document.querySelector('#Source').value;
    // document.querySelector('#Source').value.selected="selected";
    var slot = document.querySelector('#timeslot').value;
    if(slot!=0){
        var splittedTimeSlot = slot.split(":");
        if(splittedTimeSlot[2].includes("PM")){
            seconds = splittedTimeSlot[2].split(" ");
            //alert(Number(splittedTimeSlot[1]));
            if(Number(splittedTimeSlot[0])+12==24){
                slot = "12"+":"+Number(splittedTimeSlot[1])+":"+seconds[0];
            }
            else{
                splittedTimeSlotHour = Number(splittedTimeSlot[0])+12;
                slot = splittedTimeSlotHour +":"+Number(splittedTimeSlot[1])+":"+seconds[0];
            }
        }
        else{


            seconds = splittedTimeSlot[2].split(" ");
            if(Number(splittedTimeSlot[0]==12)){

                slot="00" +":"+"0"+Number(splittedTimeSlot[1])+":"+seconds[0];


            }
            if(Number(splittedTimeSlot[0])<10){
                slot = "0"+Number(splittedTimeSlot[0]) +":"+Number(splittedTimeSlot[1])+":"+seconds[0];
            }
// 					else{
// 						slot = Number(splittedTimeSlot[0]) +":"+Number(splittedTimeSlot[1])+":"+seconds[0];
// 					}
            else if(Number(splittedTimeSlot[0]<=11)){
                slot = Number(splittedTimeSlot[0]) +":"+Number(splittedTimeSlot[1])+":"+seconds[0];
            }
        }
    }
    xhrFilter.open("GET",
        "http://localhost:8080/api/v1/filter/" + source
        + "/" + des + "/" + slot+"/"+skip+"/"+limit, true);
    xhrFilter.onreadystatechange = processResponseFilter;
    //xhrFilter.setRequestHeader("Content-Type", "application/json");
    xhrFilter.send();
}
function processResponseFilter() {

    event.preventDefault();

    if (xhrFilter.readyState == 4 && xhrFilter.status == 200) {


        // if(filterApplied==true){
        //$("#cab-body").empty();
        // }
        var arr = JSON.parse(xhrFilter.responseText);
        //   alert(arr.length);
        for (var i = 0; i < arr.length; i++) {

            // creating row and data
            var trow = document.createElement('tr');
            trow.className = "row-bg-style"; // addingStyle class
            trow.id = counttr++;
            var divObj = document.createElement('td');
            divObj.className = "spacing";
            var divObj1 = document.createElement('td');
            divObj1.className = "spacing";
            var divObj2 = document.createElement('td');
            divObj2.className = "spacing";
            var divObj3 = document.createElement('td');
            divObj3.className = "spacing";
            var divObj4 = document.createElement('td');
            divObj4.className = "spacing";
            var divObj5 = document.createElement('td');
            divObj5.className = "spacing";
            var divObj6 = document.createElement('td');
            divObj6.className = "spacing";
            var divObj7 = document.createElement('td');
            divObj7.className = "spacing";
            var divObj8 = document.createElement('td');
            divObj8.className="spacing";
            divObj8.style.display="none";

            divObj.innerText = arr[i].cabNumber;
            divObj1.innerText = arr[i].driver.driverName;
            divObj2.innerText = arr[i].driver.driverNumber;
            divObj3.innerText = arr[i].source;
            divObj4.innerText = arr[i].destination;
            var date =arr[i].dateOfTravel.split("\-");
            var day=date[2]+"/"+date[1]+"/"+date[0];
            divObj5.innerText  =day;
            slot=arr[i].timeSlot;
            var slotSplitted = slot.split(":"); //[22,30,00]
            slotHour = slotSplitted[0];
            if(slotHour<12){
                if(slotHour==00){
                    divObj6.innerHTML = "12"+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                }
                else{
                    divObj6.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                }
            }
            else{


                slotHour = slotHour-12;
                if(slotHour<10){
                    divObj6.innerHTML = "0"+slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                }else{
                    divObj6.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                }
            }
            divObj7.innerHTML = "<a href='tripsheet.html' title='View' class='align-img'><img src='images/View.svg' alt='View-icon' /></a>";
            divObj8.innerHTML= arr[i].cabid;
            trow.appendChild(divObj);
            trow.appendChild(divObj1);
            trow.appendChild(divObj2);
            trow.appendChild(divObj3);
            trow.appendChild(divObj4);
            trow.appendChild(divObj5);
            trow.appendChild(divObj6);
            trow.appendChild(divObj7);
            trow.appendChild(divObj8);
            document.getElementById("cab-body").appendChild(trow);
            // To Count the data based on Row
            var countSpan = document.getElementById("count");
            countSpan.innerHTML = $('#cab-body tr').length + " out of "+ count;
            document.getElementById("record").appendChild(countSpan);
        }
    }
}
//ApplyFilter ---------------------->ends

//---------------------------------------------------------------------------------------------------------------------------

// Scroll Function ------------------>Starts
// 		document.getElementById("scroll").addEventListener(
// 				'scroll',
// 				function() {


// // 				   ($("#scroll").scrollTop() + $("#scroll").height() > $(
// // 					"#cab-body").height())
// //                 ($("#scroll")[0].scrollHeight-$("#scroll").scrollTop()==$("#scroll").height())
// 					if ($("#scroll")[0].scrollHeight-$("#scroll").scrollTop()==$("#scroll").height())   {
// 						if($('#cab-body tr').length != count){
// 						skip = skip + limit;
// 						if(filterApplied==false){
// 						getAssignedCabs(skip, limit);
// 						}else if(searchApplied==true){

// 						    getBySearch()
// 							}else{

// 							getApplyFilter();

// 							//filterApplied =false;
// 						}
// 					}
// 					else{
// 						skip=0;

// 					}
// 					}
// 				});
window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight-50){
//    skip = skip + limit;alert(skip);
//    getTodaysBookings();



// if ($("#scroll")[0].scrollHeight-$("#scroll").scrollTop()==$("#scroll").height())   {
        if($('#cab-body tr').length != count){
            skip = skip + limit;
            if(filterApplied==false){
                getAssignedCabs(skip, limit);
            }else if(searchApplied==true){

                getBySearch()
            }else{

                getApplyFilter();

                //filterApplied =false;
            }
        }
        else{
            skip=0;

        }
//}
    }
})
//-----> scroll ends

//-------------------------------------------------------------------------------------------------------------

//---> Search


var xhrSearch = new XMLHttpRequest();
// enter button search--starts
document.getElementById("searchTab").addEventListener("keyup", function (event) {

    if (event.keyCode == 13) {
        var filter=document.getElementById("filterbtn");
        filter.setAttribute('src','images/Vector.svg');
        filterApplied= false;
        searchApplied = true;
        skip=0;
        getBySearch();
    }
});
// enter button ---ends
function getBySearch(){
    filterApplied= false;
    searchApplied = true;
    skip=0;
    var filter=document.getElementById("filterbtn");
    filter.setAttribute('src','images/Vector.svg');
    var searchtxt=document.getElementById("searchTab").value.trim();

    if(searchtxt==null || searchtxt=="" || searchtxt== undefined){
        searchApplied = false;
        skip=0;
        $("#cab-body").empty();
        getAssignedCabs(skip,limit);
    }
    xhrSearch.open("GET","http://localhost:8080/api/v1/"+searchtxt+"/"+skip+"/"+limit,true);
    xhrSearch.onreadystatechange=processResponseSearch;

    xhrSearch.send(null);
}

function processResponseSearch(){

    event.preventDefault();

    if(xhrSearch.readyState == 4 && xhrSearch.status == 200)
    {
        $("#cab-body").empty();
        var arr = JSON.parse(xhrSearch.responseText);
        for(var i=0;i<arr.length; i++){

            // creating row and data
            var trow=document.createElement('tr');
            trow.className="row-bg-style";       // addingStyle class
            trow.id = counttr++;
            var divObj = document.createElement('td');
            divObj.className="spacing";
            var divObj1 = document.createElement('td');
            divObj1.className="spacing";
            var divObj2 = document.createElement('td');
            divObj2.className="spacing";
            var divObj3 = document.createElement('td');
            divObj3.className="spacing";
            var divObj4 = document.createElement('td');
            divObj4.className="spacing";
            var divObj5 = document.createElement('td');
            divObj5.className="spacing";
            var divObj6 = document.createElement('td');
            divObj6.className="spacing";
            var divObj7 = document.createElement('td');
            divObj7.className="spacing";
            var divObj8 = document.createElement('td');
            divObj8.className="spacing";
            divObj8.style.display="none";


            divObj.innerText = arr[i].cabNumber ;
            divObj1.innerText = arr[i].driver.driverName;
            divObj2.innerText = arr[i].driver.driverNumber;
            divObj3.innerText = arr[i].source;
            divObj4.innerText = arr[i].destination;
            var date =arr[i].dateOfTravel.split("\-");
            var day=date[2]+"/"+date[1]+"/"+date[0];
            divObj5.innerText  =day;

            slot=arr[i].timeSlot;
            var slotSplitted = slot.split(":");
            slotHour = slotSplitted[0];
            if(slotHour<12){
                if(slotHour==00){
                    divObj6.innerHTML = "12"+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                }
                else{
                    divObj6.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" AM";
                }
            }
            else{


                slotHour = slotHour-12;
                if(slotHour<10){
                    divObj6.innerHTML = "0"+slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                }else{
                    divObj6.innerHTML = slotHour+":"+slotSplitted[1]+":"+slotSplitted[2]+" PM";
                }
            }

            divObj7.innerHTML="<a onclick='actionBtn(this)' title='View' class='align-img'><img src='images/View.svg' alt='View-icon' /></a>";
            divObj8.innerText=arr[i].cabid;

            trow.appendChild(divObj);
            trow.appendChild(divObj1);
            trow.appendChild(divObj2);
            trow.appendChild(divObj3);
            trow.appendChild(divObj4);
            trow.appendChild(divObj5);
            trow.appendChild(divObj6);
            trow.appendChild(divObj7);
            trow.appendChild(divObj8);
            document.getElementById("cab-body").appendChild(trow);
            //record--> to get rowcount


            var countSpan=document.getElementById("count");
            countSpan.innerHTML=$('#cab-body tr').length+" out of "+count;
            document.getElementById("record").appendChild(countSpan);

        }

    }

//search---------------------------------->ends

}
//--> Filter icon
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
//-->actionbtn clickedd
function actionBtn(obj){

    var tr= obj.closest("tr").id;

    var action=  document.getElementById(tr).cells[8].innerText;

    window.location.href="tripsheet.html?tripcabId="+action;
}
document.getElementById("ScrollUp").click( function() {
    $(window).scrollTop(0);
});
//--->actionbtn ends