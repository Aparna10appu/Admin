
//Coverting Localtime into 12 hour time format

function timeFormatTo12Hr(time,secNeeded){
	
	if(secNeeded==0){
		var slotSplitted = time.split(":");
		slotHour = slotSplitted[0];
		if (slotHour < 12) {
			if (slotHour == 00) {
				return "12" + ":" + slotSplitted[1] + " AM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + " AM";
			}
		}
		else {
			slotHour = slotHour - 12;
			if (slotHour == 0) {
				return "12" + ":" + slotSplitted[1] + " PM";
			}
			else if (slotHour < 10) {
				return "0" + slotHour + ":" + slotSplitted[1] + " PM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + " PM";
			}
		}
	}
	else{
		
		var slotSplitted = time.split(":");
		slotHour = slotSplitted[0];
		secs = slotSplitted[2].split(".")[0];
		
		if (slotHour < 12) {
			if (slotHour == 00) {
				return "12" + ":" + slotSplitted[1] + ":" + secs+" AM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + ":" + secs+" AM";
			}
		}
		else {
			slotHour = slotHour - 12;
			if (slotHour == 0) {
				return "12" + ":" + slotSplitted[1] + ":" + secs+" PM";
			}
			else if (slotHour < 10) {
				return "0" + slotHour + ":" + slotSplitted[1] + ":" + secs+" PM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + ":" + secs+" PM";
			}
		}
		
	}
	
}

//Coverting LocalDatetime into 12 hour time format

function dateTimeFormatTo12Hr(dateTime,secNeeded){
	
	var time = dateTime.split("T")[1];
			
	if(secNeeded==0){
		var slotSplitted = time.split(":");
		slotHour = slotSplitted[0];
		if (slotHour < 12) {
			if (slotHour == 00) {
				return "12" + ":" + slotSplitted[1] + " AM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + " AM";
			}
		}
		else {
			slotHour = slotHour - 12;
			if (slotHour == 0) {
				return "12" + ":" + slotSplitted[1] + " PM";
			}
			else if (slotHour < 10) {
				return "0" + slotHour + ":" + slotSplitted[1] + " PM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + " PM";
			}
		}
	}
	else{
		
		var slotSplitted = time.split(":");
		slotHour = slotSplitted[0];
		secs = slotSplitted[2].split(".")[0];
		
		if (slotHour < 12) {
			if (slotHour == 00) {
				return "12" + ":" + slotSplitted[1] + ":" + secs+" AM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + ":" + secs+" AM";
			}
		}
		else {
			slotHour = slotHour - 12;
			if (slotHour == 0) {
				return "12" + ":" + slotSplitted[1] + ":" + secs+" PM";
			}
			else if (slotHour < 10) {
				return "0" + slotHour + ":" + slotSplitted[1] + ":" + secs+" PM";
			}
			else {
				return slotHour + ":" + slotSplitted[1] + ":" + secs+" PM";
			}
		}
		
	}
}
		
	