var xhrCabModel = new XMLHttpRequest();
var xhrDriverInfo = new XMLHttpRequest();
var xhrCabDetails = new XMLHttpRequest();
var xhrSaveCabDetails = new XMLHttpRequest();
var xhrDeleteCabDetails = new XMLHttpRequest();


var savingNewRecord = true; //boolean value to differentiate between saving a new record and editing an existing one
var cabModels;
var date=new Date();
var month = (date.getMonth()+1);
var day = date.getDate();
var driverDetails;
var getDriverId;
var rowCounter;
var ddloption ;
var capitalizedCabModel;
var editId;
var editRow;
var driverId;
var driver;
var delCab;
var delId;
var delrow;




// fetching list of cab model and list out in the CabModel drop down

document.getElementById("pills-managecabs-tab").addEventListener('click',function(){
    event.preventDefault();
    xhrCabModel.open("GET","http://localhost:8080/all/cabModel",true);

    xhrCabModel.onreadystatechange=cabModelProcessResponse;
    xhrCabModel.send(null);

});



function cabModelProcessResponse(){
    if(xhrCabModel.readyState == 4 && xhrCabModel.status == 200){
        var cabModelList= document.getElementById("cab-Model-Dropdown");

        var length = cabModelList.options.length;

        for (i = length-1; i > 0; i--) { 				// To avoid the selected values repeatation
            cabModelList.options[i] = null;
        }

        cabModels = JSON.parse(xhrCabModel.responseText);

        for(var i=0; i<cabModels.length; i++){		// Iterate the list of cab model & add to the drop down

            var opt = document.createElement("option");

            opt.innerHTML = cabModels[i];
            document.getElementById("cab-Model-Dropdown").options.add(opt);

        }

    }

}

// expiry date field
// set expiry date field calender from today's(current) date

if(month<10)
{
    month = "0"+month;
}
if(day<10){
    day = "0"+day;
}
var currentDate=(date.getFullYear())+"-"+month+"-"+day;

document.getElementById("ins-exp-date").setAttribute('min',currentDate);


/* -----------------------------------------------------------------------------------------------------------------------------*/

// driver name autocompleted

document.getElementById("pills-managecabs-tab").addEventListener('click',function(){
    event.preventDefault();
    xhrDriverInfo.open("GET","http://localhost:8080/all/driverInfo",true);

    xhrDriverInfo.onreadystatechange=cabDriverInfoProcessResponse;
    xhrDriverInfo.send(null);

});



function cabDriverInfoProcessResponse(){
    if(xhrDriverInfo.readyState == 4 && xhrDriverInfo.status == 200){


        driverDetails = JSON.parse(xhrDriverInfo.responseText);
    }
}



var drivNameInput = document.getElementById("driv-name");

//function call on entering values
drivNameInput.addEventListener("input", searchForDriverName);

var divElement = document.getElementById("suggestDiv");


function searchForDriverName() {
    getDriverId = undefined;

    var userEntry = drivNameInput.value;

//delete old listtag if any
    let childCount = divElement.childElementCount;
    if(childCount > 0) {
        for(let i=0; i<childCount; i++) {
            divElement.removeChild(divElement.firstChild);
        }
    }


    if(userEntry != "") {
//change user entry to lower case and compare with driver info array
        var suggestionArr = driverDetails.filter(text => text.driverName.toLowerCase().startsWith(userEntry.toLowerCase()));

        var suggLimit = 7;

//creating list tag starts
        for(let i=0; i<suggestionArr.length; i++) {

            divElement.style.display = "block";

            //limit suggestion to 5
            if(i<suggLimit) {
                var listTag = document.createElement("li");
                listTag.id=suggestionArr[i].driverId;

                listTag.className = "suggestList";
                listTag.innerText = suggestionArr[i].driverName + " - " + suggestionArr[i].driverNumber

                divElement.appendChild(listTag);
            }
        }
//
    }

//onclick function for list tags
    var suggestList = document.getElementsByClassName("suggestList");

    for(var i=0; i<suggestList.length; i++) {
        suggestList[i].addEventListener("click", function() {

            let driverDetails = this.innerText.split(" -");

            //append the value clicked to textbox capitalize first letter
            drivNameInput.value = driverDetails[0].charAt(0).toUpperCase() + driverDetails[0].slice(1);

            getDriverId = this.id;
            //hide list
            divElement.style.display = "none";

        })
    }

}
// will not display the driver name list when user click outside of the list
document.addEventListener("click", function(e) {
    divElement.style.display = "none";
})


/* -----------------------------------------------------------------------------------------------------------------------------*/

// Get all CabInfo and append into html page


document.getElementById("pills-managecabs-tab").addEventListener('click',function(){
    event.preventDefault();
    xhrCabDetails.open("GET","http://localhost:8080/all/cabInfo",true);

    xhrCabDetails.onreadystatechange=cabInfoProcessResponse;
    xhrCabDetails.send(null);

});



function cabInfoProcessResponse(){
    if(xhrCabDetails.readyState == 4 && xhrCabDetails.status == 200)
    {
        $("#cab-info").empty();                                  // avoid repeatation - when reload the page
        var arr = JSON.parse(xhrCabDetails.responseText);

        rowCounter = 0;

// Iterate the cabDetails
        for(var i=0;i<arr.length; i++){



// dynamically creating row and column

            var trow=document.createElement('tr');
            trow.className="row-bg-style";                    // addingStyle class
            trow.id = "tr" + rowCounter++;



            var divObj = document.createElement('td');
            divObj.className="spacing";
            divObj.id = "tdmodel" + i;

            var divObj1 = document.createElement('td');
            divObj1.className="spacing";
            divObj1.id = "tdcabnum" + i;

            var divObj2 = document.createElement('td');
            divObj2.className="spacing";
            divObj2.id = "tdseats" + i;

            var divObj3 = document.createElement('td');
            divObj3.className="spacing";
            divObj3.id = "tdinsnum" + i;

            var divObj4 = document.createElement('td');
            divObj4.className="spacing";
            divObj4.id = "tdexpdate" + i;

            var divObj5 = document.createElement('td');
            divObj5.className="spacing";
            divObj5.id = "tddrivename" + i;

            var divObj6 = document.createElement('td');
            divObj6.className="spacing text-center";
            divObj6.id = "tdeditdelete" + i;

            var divObj7 = document.createElement('td');
            divObj7.className="spacing";
            divObj7.id = "tdDid" + i;

// get the values and stored into the columns

            divObj.innerText = arr[i].cabModel;
            divObj1.innerText = arr[i].cabNumber;
            divObj2.innerText = arr[i].totalSeats;

            divObj3.innerText = arr[i].insuranceNumber;
            divObj4.innerText = formatDate(arr[i].insuranceExpiryDate,1);
            divObj5.innerText = arr[i].driverName;
            divObj6.innerHTML="<a href='#' title='Edit' class='actions-image'><img src='images/edit.svg' alt='edit-icon' onclick='editData(this)'/></a><a href='#' title='Delete' class='actions2-image'><img src='images/delete.svg' onclick='deleteData(this)' alt='delete-icon' data-toggle='modal' data-target='#manage-pop' /></a>";
            divObj7.innerText=arr[i].driverId;

            divObj7.style.display="none";


// append each column values into the row

            trow.appendChild(divObj);
            trow.appendChild(divObj1);
            trow.appendChild(divObj2);
            trow.appendChild(divObj3);
            trow.appendChild(divObj4);
            trow.appendChild(divObj5);
            trow.appendChild(divObj6);
            trow.appendChild(divObj7);

            // append row into table
            document.getElementById("cab-info").appendChild(trow);

        }
        //To display the cab count
        var count = document.createElement('div');
        count.class = "header-left py-md-3";
        document.getElementById("displayCount").innerText ='Display : '+ rowCounter+" cabs out of " +rowCounter;
    }


}

/* ------------------------------------------------------------------------------------------------------------------------*/

//Add Cab Model popup




document.getElementById("addCabModel").addEventListener('click',function()
{
    event.preventDefault();


    var addCabModel= document.getElementById("model-pop2").value;

    capitalizedCabModel =addCabModel.toUpperCase().trim();       // change given data into uppercase



    if( capitalizedCabModel == "")
    {
        alert("Enter model field cannot be empty");
        return false;
    }


    ddloption =  document.getElementById("cab-Model-Dropdown").options;


// Itearate dropdown list and verify given model already present or not
    for(var i = 0; i < ddloption.length; i++)
    {    if( ddloption[i].value === capitalizedCabModel)
    {
        alert("CabModel already present in the drop down");
        return false;
        l	    }
    }


    var option=document.createElement("option");    // dynamically create dropdown option
    option.innerText=capitalizedCabModel;

    document.getElementById("cab-Model-Dropdown").appendChild(option); 	// append option to the dropdown
    alert("Cab Model added successfully in the drop down");

});


/* -------------------------------------------------------------------------------------------------------------------------*/


// Save Cab Info to the database

// check empty fields

function validateCabDetails(){

    if(document.getElementById('cab-Model-Dropdown').selectedIndex==0)
    {
        alert("Please select the cab model");
        return false;
    }
    if(document.getElementById('cab-num').value == undefined || document.getElementById('cab-num').value =="")
    {
        alert("Cab Number cannot be Empty");
        return false;
    }
    if(document.getElementById('no-seats').value == undefined || document.getElementById('no-seats').value =="")
    {
        alert("Available No.Of Seats cannot be Empty");
        return false;
    }
    if(document.getElementById('insurance-num').value == undefined || document.getElementById('insurance-num').value =="")
    {
        alert("Insurance number cannot be Empty");
        return false;
    }
    if(document.getElementById('ins-exp-date').value == undefined || document.getElementById('ins-exp-date').value =="")
    {
        alert("Expiry date cannot be Empty");
        return false;
    }
    if(document.getElementById('driv-name').value == undefined || document.getElementById('driv-name').value =="")
    {
        alert("Driver name cannot be Empty");
        return false;
    }

    patternValidation();

}


// check matched patterns

function patternValidation(){

    //const cabNumPattern= new RegExp("^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$");
    const cabNumPattern=new RegExp("^[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}$");
    var cabNumTrue=cabNumPattern.test(document.getElementById("cab-num").value);

    if(!cabNumTrue){
        alert("Cab Number pattern mismatch");
        return false;
    }

    if(document.getElementById("no-seats").value>=99 || document.getElementById("no-seats").value<3 ){
        alert("Invalid Available number of seats");
        return false;
    }

    if(document.getElementById("insurance-num").value.length!=20){
        alert("Invalid Insurance Number");
        return false;
    }

    if(document.getElementById("ins-exp-date").value < currentDate){
        alert("Invalid expiry date");
        return false;
    }

    saveCabDetails();
}



function saveCabDetails(){

    var cabModel=document.getElementById("cab-Model-Dropdown").value;
    var cabNumber=document.getElementById("cab-num").value;
    var totalSeats=document.getElementById("no-seats").value;
    var insuranceNum=document.getElementById("insurance-num").value;
    var expDate=document.getElementById("ins-exp-date").value;
    var driverName=document.getElementById("driv-name").value;




    if(savingNewRecord)
    {
        if(getDriverId==undefined)
        {
            alert("select from given list");
            return false;
        }
        var data = {"cabModel":cabModel,"cabNumber":cabNumber,"totalSeats":totalSeats,
            "insuranceNumber":insuranceNum,"insuranceExpiryDate":expDate,"driverName":driverName,"driverId":getDriverId};

        xhrSaveCabDetails.open("POST","http://localhost:8080/addCabInfo",true);

    }

    else{ //for updating existing data

        if(driverName!=driver) // || driverId==driverId && driverName!= driver)
        {
            if(getDriverId==undefined){
                alert("select driver from given list");
                return false;
            }
            else{
                driverId=getDriverId;
            }

        }

        var data = {"cabModel":cabModel,"cabNumber":cabNumber,"totalSeats":totalSeats,
            "insuranceNumber":insuranceNum,"insuranceExpiryDate":expDate,"driverName":driverName,"driverId":driverId};

        xhrSaveCabDetails.open("PUT","http://localhost:8080/updateCabInfo/"+cabNumber,true);

    }

    xhrSaveCabDetails.setRequestHeader("Content-Type","application/json");
    xhrSaveCabDetails.send(JSON.stringify(data));

    if(savingNewRecord)
        xhrSaveCabDetails.onreadystatechange=saveCabInfoProcessResponse;    // call save
    else
        xhrSaveCabDetails.onreadystatechange=updateCabInfoProcessResponse;  // call update

}

function saveCabInfoProcessResponse()
{

//created

    if (xhrSaveCabDetails.readyState == 4 &&  xhrSaveCabDetails.status == 201) {

        var response = this.responseText;
        alert("Cab Details saved successfully");
        getDriverId = undefined;
        funclear();
    }

//Cab number exit

    if(xhrSaveCabDetails.readyState == 4 &&  xhrSaveCabDetails.status == 777){
        alert("Cab number already exist");
    }

//Insurance number exist

    if(xhrSaveCabDetails.readyState == 4 &&  xhrSaveCabDetails.status == 888){
        alert("Insurance number already exist");
    }

//Driver exist

    if(xhrSaveCabDetails.readyState == 4 &&  xhrSaveCabDetails.status == 666){
        alert("Driver already assigned to a cab");
    }


}


/* -----------------------------------------------------------------------------------------------------------------------*/


function editData(row){

    savingNewRecord = false;


    editId = row.closest("td").id;       // get column id (example:tdeditdelete0)

// replace the id tdeditdelete0-tdeditdelete, remainig zero stored in counterEdit

    var counterEdit=editId.replace("tdeditdelete","");
    editRow =document.getElementById("tr"+counterEdit);

// get the values from edit row
    var model = editRow.getElementsByTagName("td")[0].innerHTML;
    var numberCab = editRow.getElementsByTagName("td")[1].innerHTML;
    var seatsAvailable = editRow.getElementsByTagName("td")[2].innerHTML;
    var ins = editRow.getElementsByTagName("td")[3].innerHTML;
    var exp = editRow.getElementsByTagName("td")[4].innerHTML;
    driver = editRow.getElementsByTagName("td")[5].innerHTML;
    driverId=document.getElementById("tdDid"+counterEdit).innerHTML;

// set values to the text box
    document.getElementById("cab-Model-Dropdown").value = model;
    document.getElementById("cab-num").value = numberCab;
    document.getElementById("cab-num").disabled = "true";
    document.getElementById("no-seats").value = seatsAvailable;
    document.getElementById("insurance-num").value = ins;
    document.getElementById("ins-exp-date").value = formatDate(exp,1);
    document.getElementById("driv-name").value = driver;

}




function updateCabInfoProcessResponse()
{

// ACCEPTED

    if (xhrSaveCabDetails.readyState == 4 &&  xhrSaveCabDetails.status == 202) {

        var response = this.responseText;

        alert("Cab Details updated successfully");
        getDriverId = undefined;
//location.reload();
        funclear();
    }

//Driver exist

    if (xhrSaveCabDetails.readyState == 4 &&  xhrSaveCabDetails.status == 666) {

        alert("Driver already exist");
        location.reload();

    }

//Insurance number exist

    if(xhrSaveCabDetails.readyState == 4 &&  xhrSaveCabDetails.status == 888){
        alert("Insurance number already exist");
    }


}


/* ------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Cancel button -> clear the data which was entered by the admin


function funclear()
{
    savingNewRecord = true;
    document.getElementById("cab-Model-Dropdown").value="";
    Reset();
    document.getElementById("cab-num").value="";
    document.getElementById("cab-num").disabled="";
    document.getElementById("no-seats").value="";
    document.getElementById("insurance-num").value="";
    document.getElementById("ins-exp-date").value=true;
    document.getElementById("driv-name").value="";

}

function Reset() {
    var dropDown = document.getElementById("cab-Model-Dropdown");
    dropDown.selectedIndex = 0;
}



/* --------------------------------------------------------------------------------------------------------*/


// Delete cab Details


function deleteCabDetails(){



    xhrDeleteCabDetails.open("PUT","http://localhost:8080/deleteCabInfo/"+delCab,true);


    xhrDeleteCabDetails.setRequestHeader("Content-Type","application/json");
    xhrDeleteCabDetails.send(null);

    xhrDeleteCabDetails.onreadystatechange=deleteCabInfoProcessResponse;

}

function deleteCabInfoProcessResponse()
{
    if (xhrDeleteCabDetails.readyState == 4 &&  xhrDeleteCabDetails.status == 200) {

        var response = this.responseText;

        delrow.remove(); //tr0
        alert("Cab Details deleted successfully");
    }

}

function deleteData(row){

    delId = row.closest("td").id;     // get closest id

    var counter=delId.replace("tdeditdelete","");   // replace the id

    delrow =document.getElementById("tr"+counter);  //tr0

    delCab = delrow.getElementsByTagName("td")[1].innerHTML;


}



/* --------------------------------------------------------------------------------------------------------*/


// date formate change

function formatDate(date, option){
    var arr = date.split("-");

    if(option ==1)   // yy-dd-mm
        var formatedDate = arr[2] + "-" + arr[1] + "-" + arr[0];
    else if(option==2) //dd-mm-yyyy
        var formatedDate = arr[1] + "-" + arr[0] + "-" + arr[2];
    return formatedDate;

}


/* -------------------------------------------------------------------------------------------------------------------*/
// Enter Key Press Event for CAB NUMBER
// when click the enter button control go to the next field
// also check the empty field and pattern validations aslo
function enterEventCabNum(event){

    if(!(document.getElementById("cab-num").value == undefined || document.getElementById("cab-num").value =="") && event.keyCode == 13){

        //const cabNumPattern= new RegExp("^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$");
        const cabNumPattern=new RegExp("^[A-Z]{2}[ ][0-9]{2}[ ][A-Z]{2}[ ][0-9]{4}$");
        var cabNumTrue=cabNumPattern.test(document.getElementById("cab-num").value);

        if(!cabNumTrue){
            alert("Cab Number pattern mismatch");
            return false;
        }
        document.getElementById("no-seats").focus();
    }

    else{

        if(event.keyCode != 13){
            document.getElementById("cab-num").focus();
        }
        else{

            alert("cab model field cannot be empty");
            return false;
        }
    }
}

// Enter Key Press Event for Available Number Of Seats

function enterEventAvailableSeats(event){

    if(!(document.getElementById("no-seats").value == undefined || document.getElementById("no-seats").value =="") && event.keyCode == 13){

        if(document.getElementById("no-seats").value>=99 || document.getElementById("no-seats").value<3 ){
            alert("Invalid Available number of seats");
            return false;
        }
        document.getElementById("insurance-num").focus();
    }

    else{

        if(event.keyCode != 13){
            document.getElementById("no-seats").focus();
        }
        else{

            alert("Available No.Of Seats field cannot be empty");
            return false;
        }
    }
}


// Enter Key Press Event for Insurance Number

function enterEventInsNum(event){

    if(!(document.getElementById("insurance-num").value == undefined || document.getElementById("insurance-num").value =="") && event.keyCode == 13){

        if(document.getElementById("insurance-num").value.length!=20){
            alert("Invalid Insurance Number");
            return false;
        }

        document.getElementById("ins-exp-date").focus();
    }

    else{

        if(event.keyCode != 13){
            document.getElementById("insurance-num").focus();
        }
        else{

            alert("Insurance number  field cannot be empty");
            return false;
        }
    }
}



//Enter Key Press Event for Driver Name

function enterEventDriverName(event){

    if(!(document.getElementById("driv-name").value == undefined || document.getElementById("driv-name").value =="") && event.keyCode == 13){

        if(getDriverId==undefined)
        {
            alert("select from given list");
            return false;
        }

        if(driverName!=driver)
        {
            if(getDriverId==undefined){
                alert("select from given list");
                return false;
            }
            driverId=getDriverId;
        }

        document.getElementById("saveCab").focus();
    }

    else{

        if(event.keyCode != 13){
            document.getElementById("driv-name").focus();
        }
        else{

            alert("Driver Name field cannot be empty");
            return false;
        }
    }
}

