var xhrDriverDetails = new XMLHttpRequest();

//Fetches the driver details from the database//

document.getElementById("pills-managedrivers-tab").addEventListener('click',function(){
    event.preventDefault();

    xhrDriverDetails.open("GET","http://localhost:8080/manage/drivers/list",true);
    xhrDriverDetails.onreadystatechange = driverInfoProcessResponse;
    xhrDriverDetails.send(null);

});

var rowCounter;

function driverInfoProcessResponse(){

    if(xhrDriverDetails.readyState == 4 && xhrDriverDetails.status == 200){

        rowCounter = 0;
        $("#driver-info").empty();
        var arr = JSON.parse(xhrDriverDetails.responseText);


        for(var i = 0;i<arr.length; i++){

            //Dynamic creation of rows and datas//

            var trow=document.createElement('tr');
            trow.className="row-bg-style";       // addingStyle class
            trow.id = "trDriver" + rowCounter++;

            var divObj = document.createElement('td');
            divObj.className="spacing";
            divObj.id = "tdname" + i;

            var divObj1 = document.createElement('td');
            divObj1.className="spacing";
            divObj1.id = "tdnumber" + i;

            var divObj2 = document.createElement('td');
            divObj2.className="spacing";
            divObj2.id = "tdlicense" + i;

            var divObj3 = document.createElement('td');
            divObj3.className="spacing";
            divObj3.id = "tdexpiry" + i;

            var divObj4 = document.createElement('td');
            divObj4.className="spacing text-center";
            divObj4.id = "tdeditdelete" + i;

            var divObj5 = document.createElement('td');
            divObj5.className="spacing";
            divObj5.id = "tdid" + i;

            divObj.innerText = arr[i].driverName;
            divObj1.innerText = arr[i].driverNumber;
            divObj2.innerText = arr[i].licenseNumber;
            divObj3.innerText = formatDate(arr[i].licenseExpiryDate,1);
            divObj4.innerHTML ="<a href='#' title='Edit' class='actions-image'><img src='images/edit.svg' alt='edit-icon' onclick='editDriverData(this)'/></a><a href='#' title='Delete' class='actions2-image'><img src='images/delete.svg' onclick='deleteDriverData(this)' alt='delete-icon' data-toggle='modal' data-target='#manage-pop' /></a>";
            divObj5.innerText = arr[i].driverId;

            divObj5.style.display="none";

            trow.appendChild(divObj);
            trow.appendChild(divObj1);
            trow.appendChild(divObj2);
            trow.appendChild(divObj3);
            trow.appendChild(divObj4);
            trow.appendChild(divObj5);

            document.getElementById("driver-info").appendChild(trow);

        }

        //alert(rowCounter);
        var count = document.createElement('div');
        count.class = "header-left py-md-3";
        //count.id = 'displayCount';
        document.getElementById("driverDisplayCount").innerText ='Display : '+ rowCounter+" out of " +rowCounter;

    }

}
//This is used to disable the dates in the expiry date field//
var date=new Date();
var month = (date.getMonth()+1);
var day = date.getDate();
if(month<10)
{
    month = "0"+month;
}
if(day<10){
    day = "0"+day;
}
var currentDate=(date.getFullYear())+"-"+month+"-"+day;

document.getElementById("lic-exp-date").setAttribute('min',currentDate);


/*var display = document.createElement('span');
display.class = "font-records";
display.innerHTML = 'Display : ';
var records = document.createElement('span');
records.class = "regular";
records.innerHTML = rowCounter+"out of" +rowCounter;*/
//-------------------------------------------------------------------------------

//Onfocus on enter methods//

function validateAndMoveName(event){

    if(!(document.getElementById('dri-name').value == undefined || document.getElementById('dri-name').value =="") && event.keyCode == 13){

        document.getElementById("dri-num").focus();

    }

    else{
        //continue;
        if(event.keyCode != 13){
            document.getElementById("dri-name").focus();
        }
        else{

            alert("Driver Name field cannot be empty");
            return false;
        }


    }

}


function validateAndMoveNum(event){

    if(!(document.getElementById('dri-num').value == undefined || document.getElementById('dri-num').value =="") && event.keyCode == 13){

        var driverNumber = document.getElementById('dri-num').value;
        //var number = "/^[0-9]+$/";
        if(driverNumber.length != 10){
            alert("Number Pattern does not match");
            return false;
        }

        const phNumPattern = new RegExp("^[0-9]+$");
        var numPatternTrue = phNumPattern.test(driverNumber);

        if(!numPatternTrue){
            alert("Number pattern does not match");
            return false;
        }

        document.getElementById("lic-num").focus();

    }

    else{
        if(event.keyCode != 13){

            document.getElementById("dri-num").focus();
        }

        else{

            alert("Driver Number field cannot be empty");
            return false;

        }

    }
}

function validateAndMoveLic(event){

    if(!(document.getElementById('lic-num').value == undefined || document.getElementById('lic-num').value == "") && event.keyCode == 13){


        const licenseNumberPattern = new RegExp("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$");
        var licenseNumTrue = licenseNumberPattern.test(document.getElementById('lic-num').value);

        if(!licenseNumTrue){

            alert("License Number Pattern does not match");
            return false;

        }
        document.getElementById("lic-exp-date").focus();

    }

    else{

        if(event.keyCode != 13){

            document.getElementById("lic-num").focus();

        }

        else{

            alert("License Number field cannot be empty");
            return false;
        }

    }
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Save Driver details to the database//

var xhrSaveDriverDetails = new XMLHttpRequest();

var savingNewRecord = true;

function validateDriverDetails(){

    if(document.getElementById('dri-name').value == undefined || document.getElementById('dri-name').value.trim() ==""){

        alert("Driver Name field cannot be empty");
        return false;

    }

    if(document.getElementById('dri-num').value == undefined || document.getElementById('dri-num').value ==""){

        alert("Driver Number field cannot be empty");
        return false;

    }

    if(document.getElementById('lic-num').value == undefined || document.getElementById('lic-num').value == ""){

        alert("License Number field cannot be empty");
        return false;

    }

    if(document.getElementById('lic-exp-date').value == undefined || document.getElementById('lic-exp-date').value == ""){

        alert("Expiry Date field cannot be empty");
        return false;

    }

    formatValidation();
}

function formatValidation(){



    var driverNumber = document.getElementById('dri-num').value;
    //var number = "/^[0-9]+$/";
    if(driverNumber.length != 10){
        alert("Number Pattern does not match");
        return false;
    }

    const phNumPattern = new RegExp("^[0-9]+$");
    var numPatternTrue = phNumPattern.test(driverNumber);

    if(!numPatternTrue){
        alert("Number pattern does not match");
        return false;
    }



    const licenseNumberPattern = new RegExp("^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$");
    var licenseNumTrue = licenseNumberPattern.test(document.getElementById('lic-num').value);

    if(!licenseNumTrue){

        alert("License Number Pattern does not match");
        return false;

    }

    if(document.getElementById('lic-exp-date').value < currentDate){

        alert("Expiry date format is invalid");
        return false;
    }


    saveDriverDetails();
}

function saveDriverDetails(){

    var driverName = document.getElementById('dri-name').value.trim();
    var driverNumber = document.getElementById('dri-num').value;
    var licenseNumber = document.getElementById('lic-num').value;
    var licenseExpiryDate = document.getElementById('lic-exp-date').value;

    if(savingNewRecord){

        xhrSaveDriverDetails.open("POST","http://localhost:8080/manage/drivers/add/newdriver",true);


        var data = {"driverName":driverName,"driverNumber":driverNumber,
            "licenseNumber":licenseNumber,"licenseExpiryDate":licenseExpiryDate};

    }

    else{

        xhrSaveDriverDetails.open("PUT","http://localhost:8080/manage/drivers/edit",true);

        var data = {"driverId":driverId,"driverName":driverName,"driverNumber":driverNumber,
            "licenseNumber":licenseNumber,"licenseExpiryDate":licenseExpiryDate};

    }



    xhrSaveDriverDetails.setRequestHeader("Content-Type","application/json");
    xhrSaveDriverDetails.send(JSON.stringify(data));

    if(savingNewRecord){

        xhrSaveDriverDetails.onreadystatechange=saveDriverInfoProcessResponse;

    }

    else{

        xhrSaveDriverDetails.onreadystatechange=updateDriverInfoProcessResponse;

    }

}

function saveDriverInfoProcessResponse(){

    if(xhrSaveDriverDetails.readyState == 4 && xhrSaveDriverDetails.status == 201){

        var response = this.responseText;
        alert("Driver Details saved successfully");
        //funClear();
        location.reload();
    }

    if(xhrSaveDriverDetails.readyState == 4 && xhrSaveDriverDetails.status == 590){

        alert("Driver phone number already present");
        return false;

    }
    if(xhrSaveDriverDetails.readyState == 4 && xhrSaveDriverDetails.status == 591){

        alert("Driver license number already present");
        return false;

    }


}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Cancel the data entered//

function funClear(){

    document.getElementById("dri-name").value = "";
    document.getElementById("dri-num").value = "";
    document.getElementById("lic-num").value = "";
    document.getElementById("lic-exp-date").value = "";

}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Update the driver details//

var editingId;
var editingRow;
var driId;

function editDriverData(row){

    savingNewRecord = false;

    editingId = row.closest("td").id;

    var countingEdit = editingId.replace("tdeditdelete","");

    editingRow = document.getElementById("trDriver"+countingEdit);

    var name = editingRow.getElementsByTagName("td")[0].innerHTML;
    var number = editingRow.getElementsByTagName("td")[1].innerHTML;
    var license = editingRow.getElementsByTagName("td")[2].innerHTML;
    var expiry = editingRow.getElementsByTagName("td")[3].innerHTML;
    driId = editingRow.getElementsByTagName("td")[5].innerHTML;

    document.getElementById("dri-name").value = name;
    document.getElementById("dri-num").value = number;
    document.getElementById("lic-num").value = license;
    document.getElementById("lic-exp-date").value = formatDate(expiry,1);

}

function updateDriverInfoProcessResponse(){

    if(xhrSaveDriverDetails.readyState == 4 && xhrSaveDriverDetails.status == 201){

        var response = this.reponseText;

        alert("Driver Details updated successfully");
        location.reload();
        //funClear();
    }

    if(xhrDriverDetails.readyState == 4 && xhrSaveDriverDetails.status == 590){

        alert("Driver Number already exist");
        return false;
    }

    if(xhrSaveDriverDetails.readyState == 4 && xhrSaveDriverDetails.status == 591){

        alert("License number already exist");
        return false;
    }

}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Delete the driver details//

var xhrDeleteDriverDetails = new XMLHttpRequest();

var deleteDriver;
var deleteId;
var deleterow;

function deleteDriverDetails(){

    xhrDeleteDriverDetails.open("PUT","http://localhost:8080/manage/drivers/deletedriver/"+deleteDriver,true);
    xhrDeleteDriverDetails.setRequestHeader("Content-Type","application/json");
    xhrDeleteDriverDetails.send(null);

    xhrDeleteDriverDetails.onreadystatechange = deleteDriverInfoProcessResponse;

}

function deleteDriverInfoProcessResponse(){

    if(xhrDeleteDriverDetails.readyState == 4 && xhrDeleteDriverDetails.status == 200){

        var response = this.responseText;

        deleterow.remove();

        alert("Driver Details deleted successfully");
        location.reload();

    }
}

function deleteDriverData(row){

    deleteId = row.closest("td").id;

    var counters = deleteId.replace("tdeditdelete","");

    deleterow = document.getElementById("trDriver"+counters);

    deleteDriver = deleterow.getElementsByTagName("td")[5].innerHTML;

}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Date format in the expiry date field//

function formatDate(date, option){
    var arr = date.split("-");

    if(option ==1)
        var formatedDate = arr[2] + "-" + arr[1] + "-" + arr[0];
    else if(option==2) //dd-mm-yyyy
        var formatedDate = arr[1] + "-" + arr[0] + "-" + arr[2];
    return formatedDate;

}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


/*function countRows() {
        var totalRowCount = 0;
        var rowCount = 0;
        //var table = document.getElementById("tblCustomers");
        var rows = table.getElementsByTagName("tr")
        for (var i = 0; i < rows.length; i++) {
            totalRowCount++;
            if (rows[i].getElementsByTagName("td").length > 0) {
                rowCount++;
            }
        }
        var message = "Total Row Count: " + totalRowCount;
        message += "\nRow Count: " + rowCount;
        alert(message);
    }*/
