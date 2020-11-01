

var timerNFC = null;
var reloadBreack = false;

dxSample.clock = function(params) {
	
	var clockModel = this;

	clockModel.clockText = ko.observable("")
	
	clockModel.showTime = function() {

		var date = new Date();
		var h = date.getHours(); // 0 - 23
		var m = date.getMinutes(); // 0 - 59
		var session = "AM";
		
		if(h == 0){
			h = 12;
		}
		
		if(h > 12){
			h = h - 12;
			session = "PM";
		}
		
		h = (h < 10) ? "0" + h : h;
		m = (m < 10) ? "0" + m : m;
		
		var time = h + ":" + m + " " + session;

		clockModel.clockText(time); //knockout		
	}


	clockModel.showTime();

    return clockModel;
};	

