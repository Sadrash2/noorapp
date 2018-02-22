
//////////////export functions///////////////////
let globalFunction = {

showmodal: function(messageText){
  	var $ = require ('jquery')
    document.getElementById('myModal').style.display = "block";
    document.getElementById("myModalMessage").innerHTML = '<p>'+messageText+'</p>';

  },
  initModal: function(){
    // Get the modal
    var $ = require('jquery');
    $('#myModal').hide();

    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("close")[0].onclick = function() {
        document.getElementById('myModal').style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //   if($('#myModal').is(":visible") == true){
    //         console.log("out modal click");
    //         document.getElementById('myModal').style.display = "none"
    //   }
    // }
    
  },
	getCountry: function(callback) {
		var $ = require ('jquery')

			var request =  [
				"Location",
				"getCountries",
				""];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},
	uuid: function(callback){
		var u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
		function(c) {
		var r = Math.random() * 16 | 0,
		v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
		});
		return u;
	},

	getDeviceId: function(callback){
		var current = window.localStorage.getItem("_DEVICEID_")
		if (current) return current;
		var id = this.uuid();
		window.localStorage.setItem("_DEVICEID_",id);   
		return id;
	},

	differentiate_device: function(betaEmail,token,callback){
		if (betaEmail != null && token != null) {
			var u_id=this.getDeviceId(); //get the u_id, right device?
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				console.log('Mobile');
				this.get_device_mac_add_mobile(betaEmail,u_id, function(data) { //get deviceMac mobobile
					var response = JSON.parse(data);
					if (response.success!=null){
						//console.log(response.success + '- Mobile');
					}
					else{
						window.location.replace("CallBackDevice?email="+betaEmail+'&token='+token);
					}
				});	
			}
			else{
				this.get_device_mac_add_desk(betaEmail,u_id,function(data) { //get deviceMac desktop
					var response = JSON.parse(data);
					if (response.success!=null){
						//console.log(response.success + '- desktop');
					}
					else{
						window.location.replace("CallBackDevice?email="+betaEmail+'&token='+token);
					}
				});
			}
		}
	},

	get_device_mac_add_desk: function(betaEmail,u_id,callback) {
		var $ = require ('jquery')
		var data =  [
					betaEmail,u_id
					];
			var request =  [
				"device_identification",
				"get_mac_add_desk",
				data];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},
	get_device_mac_add_mobile: function(betaEmail,u_id,callback) {
		var $ = require ('jquery')
			var data =  [
						betaEmail,u_id
						];
			var request =  [
				"device_identification",
				"get_mac_add_mob",
				data];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},
	getCountry: function(callback) {
		var $ = require ('jquery')

			var request =  [
				"Location",
				"getCountries",
				""];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	countryChange: function(countryID, callback) {
		var $ = require ('jquery')
		var request =  [
			"Location",
			"getStates",
			countryID];
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: {request},
			cache: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	stateChange: function(stateID, callback) {
		var $ = require ('jquery')

		var request =  [
			"Location",
			"getCities",
			stateID];
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: {request},
			cache: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	getJobSearch: function(searchArray, callback) {
		var $ = require ('jquery')
		var request =  [
				"Jobs",
				"search",
				searchArray];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getJobFetchAll: function(callback) {
		var $ = require ('jquery')
		var request =  [
				"Jobs",
				"fetch",
				"all"];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getCategories: function(callback) {
		var $ = require ('jquery')
		var request =  [
				"Jobs",
				"getCategories",
				"category"];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getUserFetch: function(users, callback) {
		var $ = require ('jquery')
		var request =  [
				"Users",
				"fetch",
				users];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getUserCustomizeFetch: function(users, friendDetail, callback) {
		var $ = require ('jquery')
		var request =  [
				"Users",
				"fetch",
				users];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data, friendDetail);
				}.bind(this)
		});
	},

	getUserDataFetch: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserData",
				"fetch",
				opt];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getFavSuraAya: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserSuraAya",
				"fetchAll",
				opt];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getMosqueLatLngFetch: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
					"Mosque",
					"getMosqueByLatLng",
					opt];

			var json = JSON.stringify(request); 
 
			var form_data = new FormData();  
			form_data.append('request', json); 

				$.ajax({
					type: "POST",
					datatype: 'json',
					url: "./app/bridge/enter.php",
					data: form_data,
					cache: false,
					contentType: false,
				    processData: false,
					success: function(data) {
						callback(data);
					}.bind(this)
		});
	},

	getFavouriteMosqueFetch: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"MosqueFavourite",
				"fetch",
				opt];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	addFavouriteMosque: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
                  "MosqueFavourite",
                  "add",
                  opt];
              var json = JSON.stringify(request);  
              var form_data = new FormData();  
              form_data.append('request', json); 
              $.ajax({
                type: "POST",
                datatype: "json",
                url: "./app/bridge/enter.php",
                data: form_data,
                cache: false,
                      contentType: false,
                      processData: false,
                success: function(data) {
						callback(data);
				}.bind(this)
		});
	},
	addRecentMosque: function(opt) {
		var $ = require ('jquery')
		var request =  [
                  "MosqueRecent",
                  "add",
                  opt];
              var json = JSON.stringify(request);  
              var form_data = new FormData();  
              form_data.append('request', json); 
              $.ajax({
                type: "POST",
                datatype: "json",
                url: "./app/bridge/enter.php",
                data: form_data,
                cache: false,
                      contentType: false,
                      processData: false,
                success: function(data) {
						// callback(data);
				}.bind(this)
		});
	},

	getRecentMosque: function(opt, callback) {
		var $ =  require('jquery');
		var request = [
			"MosqueRecent",
			'fetch',
			opt
		];
		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	removeFavouriteMosque: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
                  "MosqueFavourite",
                  "delete",
                  opt];
              var json = JSON.stringify(request);  
              var form_data = new FormData();  
              form_data.append('request', json); 
              $.ajax({
                type: "POST",
                datatype: "json",
                url: "./app/bridge/enter.php",
                data: form_data,
                cache: false,
                      contentType: false,
                      processData: false,
                success: function(data) {
						callback(data);
				}.bind(this)
		});
	},

	removeFavouriteVerse: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
                  "UserSuraAya",
                  "deleteFavouriteSuraAya",
                  opt];
              var json = JSON.stringify(request);  
              var form_data = new FormData();  
              form_data.append('request', json); 
              $.ajax({
                type: "POST",
                datatype: "json",
                url: "./app/bridge/enter.php",
                data: form_data,
                cache: false,
                      contentType: false,
                      processData: false,
                success: function(data) {
						callback(data);
				}.bind(this)
		});
	},

	addFriend: function(opt) {
		var $ = require ('jquery')
		var request =  [
					"UserFriend",
					"add",
					opt];
					console.log(opt)
              var json = JSON.stringify(request);  
              var form_data = new FormData();  
              form_data.append('request', json); 
              $.ajax({
                type: "POST",
                datatype: "json",
                url: "./app/bridge/enter.php",
                data: form_data,
                cache: false,
                      contentType: false,
                      processData: false,
                success: function(data) {
				}.bind(this)
		});
	},

	getUserFriendFetch: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"fetchFriend",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	getBlockedFriendFetch: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"fetchBlockedFriend",
				opt];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getUserFriendInvite: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"fetchSent",
				opt];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getUserFriendRequest: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"fetchRequest",
				opt];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	addUserData: function(opt) {
		var $ = require ('jquery')
		var request =  [
				"UserData",
				"add",
				opt];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
				}.bind(this)
		});
	},

	editTravelMode: function(opt) {
		var $ = require ('jquery')
		var request =  [
				"UserData",
				"updateTravelMode",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {			
			}.bind(this)
		});
	},

	editFBName: function(opt) {
		var $ = require ('jquery')
		var request =  [
				"UserData",
				"updateFBName",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
			}.bind(this)
		});
	},

	editSyncContact: function(opt) {
		var $ = require ('jquery')
		var request =  [
				"UserData",
				"updateContactSync",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
			}.bind(this)
		});
	},

	editFriendApproval: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"editFriendApproval",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	editFriendDisapproval: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"editFriendDisapproval",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	editUnblockFriend: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"unblockFriend",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	editFriendRelation: function(opt) {
		var $ = require ('jquery')
		var request =  [
				"UserFriend",
				"editFriendRelation",
				opt];
		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
			}.bind(this)
		});
	},

	loginUser: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
					"Users",
					"login",
					opt];

		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json); 

		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	//carmen
	validFriend: function(opt, count, name, callback) {
		var $ = require ('jquery')
		var request =  [
					"UserFriend",
					"validateFriend",
					opt];

		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json); 

		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
				callback(data,count, name);
			}.bind(this)
		});
	},

	getEmailByFB: function(opt, callback) {
		var $ = require ('jquery')
		var request =  [
					"UserData",
					"fetchByFBName",
					opt];

		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: {request},
			cache: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},

	getMosque: function(callback) {
		var $ = require ('jquery')

			var request =  [
				"Mosque",
				"fetchAll",
				""];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},
	getMosqueByName: function(mosquename, callback, count) {
		var $ = require ('jquery')

			var request =  [
				"Mosque",
				"fetch",
				mosquename];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data,count);
				}.bind(this)
		});
	},
	getMosqueSearchResult: function(mosquename, callback) {
		var $ = require ('jquery')
		var request =  [
					"Mosque",
					"fetchSearchResult",
					mosquename];

				$.ajax({
					type: "POST",
					datatype: 'json',
					url: "./app/bridge/enter.php",
					data: {request},
					cache: false,
					success: function(data) {
						callback(data);
					}.bind(this)
		});
	},

	setMaxDate: function() {
		/*Setting for input date maximum date*/	
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
 		if(dd<10){
        	dd='0'+dd
    	} 
    	if(mm<10){
        	mm='0'+mm
    	}
    	today = yyyy+'-'+mm+'-'+dd;
    	return today; 
	},

	userProfileEditClick: function(componentName) {
		var $ = require ('jquery')
		$("input[disabled]").prop("disabled", false);
		$("#c-email").prop("disabled", true);
		$("#c-"+componentName).focus();
		$("select[disabled]").prop("disabled", false);
		$(".fa-edit").hide();
		$(".overlay-date").css("z-index","0");
		$(".react-datepicker__input-container").css("z-index","1");
		$(".fa-angle-down").show();
		$("#editButton").show();
		$("i").addClass("active");
		$("select").addClass("active");
	},

	//getTodayDate format="yyyy-mm-dd" increment+1 = nextday
	getTodayDate: function(increment) {
	    var today = new Date();
	    var dd = ('0' + (today.getDate()+increment)).slice(-2);
	    var month = ('0' + (today.getMonth()+1)).slice(-2); //January is 0!
	    var yyyy = today.getFullYear();
				
	    var today = yyyy+'-'+month+'-'+dd;
	    return today;
	},

	//get todayDateTime format="yyyy-month-dd-hh-mm-ss" for split efficiency increment+1 = nextday
	getTodayDateTime: function(increment) {
    	var today = new Date();
    	var dd = ('0' + (today.getDate()+increment)).slice(-2);
    	var month = ('0' + (today.getMonth()+1)).slice(-2); //January is 0!
    	var yyyy = today.getFullYear();
		var hh = ('0' + (today.getHours())).slice(-2);
    	var mm = ('0' + (today.getMinutes())).slice(-2);
    	var ss = ('0' + (today.getSeconds())).slice(-2);

    	var today = yyyy+'-'+month+'-'+dd+'-'+hh+'-'+mm+'-'+ss;
    	return today;
	},

	//compare both dateTime and return 1(later than), -1(early than), 0(samedate)
	dateTimeCompare: function(today,dateCookie) {
      	var todayParts = today.split("-");
		var dateCookieParts = dateCookie.split("-");
		var dateOne = new Date(todayParts[0], todayParts[1], todayParts[2], todayParts[3], todayParts[4], todayParts[5], 0); //Year, Month, Day, hh, mm, ss
      	var dateTwo = new Date(dateCookieParts[0], dateCookieParts[1], dateCookieParts[2], dateCookieParts[3], dateCookieParts[4], dateCookieParts[5], 0); //Year, Month, Day, hh, mm, ss
       	if (dateOne > dateTwo) {
           	return 1
        }else if (dateOne < dateTwo) {
           	return -1
        } else {
        	return 0
        }
		  	
	},

	//compare date format("yyyy-mm-dd") and 1(later than), -1(early than), 0(samedate)
	dateCompare: function(today, dateCookie) {
		var todayParts = today.split("-");
		var dateCookieParts = dateCookie.split("-");
		var dateOne = new Date(todayParts[0], todayParts[1], todayParts[2]); //Year, Month, Date
	    var dateTwo = new Date(dateCookieParts[0], dateCookieParts[1], dateCookieParts[2]); //Year, Month, Date
	    if (dateOne > dateTwo) {
	       	return 1
	    }else if (dateOne < dateTwo) {
	      	return -1
	    } else {
	    	return 0
	    }
	},

	//get compared date difference in days
	getDateDifferenceInDay: function(date1, date2) {
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var date1 = date1.split("-");
		var date2 = date2.split("-");
		var dateOne = new Date(date1[0], date1[1], date1[2]);
		var dateTwo = new Date(date2[0], date2[1], date2[2]);

		return parseInt(Math.round(Math.abs((dateOne.getTime() - dateTwo.getTime())/(oneDay))));
	},		

	//get compared date difference in seconds
	dateDifference:function (date1,date2) {
		var date1 = date1.split("-");
		var date2 = date2.split("-");
		var dateOne = new Date(date1[0], date1[1], date1[2], date1[3], date1[4], date1[5], 0); //Year, Month, Day, hh, mm, ss
      	var dateTwo = new Date(date2[0], date2[1], date2[2], date2[3], date2[4], date2[5], 0); //Year, Month, Day, hh, mm, ss

		return parseInt(Math.abs(dateOne.getTime()-dateTwo.getTime())/1000);
	},
		/////////////////////////////////////////// Nearest Mosques Functions ///////////////////////////////////////////////////
    UserLocation:function( position )
    {
        NearestMosques( position.coords.latitude, position.coords.longitude );
    },

    PythagorasEquirectangular:function ( lat1, lon1, lat2, lon2 )
    {
    lat1 = this.Deg2Rad(lat1);
    lat2 = this.Deg2Rad(lat2);
    lon1 = this.Deg2Rad(lon1);
    lon2 = this.Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    var y = (lat2-lat1);
    var d = Math.sqrt(x*x + y*y) * R;
    return d;
    },
    Deg2Rad( deg ) {
       return deg * Math.PI / 180;
    },
  
      NearestMosques( latitude, longitude , callback)
    {
    	var opt = {"lat": Math.floor(latitude),
              "lng": Math.floor(longitude)}

    globalFunction.getMosqueLatLngFetch(opt, function(data){
    var mosques = [];
      var response = JSON.parse(data);
      if(response.state == 200) {
      	for(var i =0; i<response.success.length; i++) {
      		var mosque = [];
			mosque[0] = response.success[i].mosquename;
			mosque[1] = response.success[i].lat;
			mosque[2] = response.success[i].lng;
			mosque[3] = response.success[i].addressline1;
			mosque[5] = response.success[i].image;
			mosques.push(mosque);
		}
        var mindif=99999;
        var closest;

        for (var index = 0; index < mosques.length; ++index) {
             mosques[ index ][ 4 ] =  globalFunction.PythagorasEquirectangular( latitude, longitude, mosques[ index ][ 1 ], mosques[ index ][ 2 ] );
        }
        mosques.sort(function(a,b) {return (a[4] > b[4]) ? 1 : ((b[4] > a[4]) ? -1 : 0);} );
        // echo the nearest mosque
      var nearestMosques = [];
        if (mosques.length > 6) {
      for (var i = 0; i < 6; i ++) {
        nearestMosques.push(mosques[i]);
      }
      callback(nearestMosques);
    } else {
      callback(mosques) ;
    }

      }
      else
      {
      	//console.log("Unable to reach the database, response.state = " + response.state);
      }

    });
    },
    //////////////////////////////////////////////////////////////////////////////////////////////

     //distance and duration function
  getDistence(originLat,originLng,destinationLat,destinationLng,distenceCallback){

    var bounds = new google.maps.LatLngBounds;
    var origin = {lat: parseFloat(originLat) , lng: parseFloat(originLng)};
    var destination = {lat: parseFloat(destinationLat), lng: parseFloat(destinationLng) };

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [origin], // [origin1,origin2, ...]
      destinations: [destination], // [destination1,destination2, ...]
      travelMode: google.maps.TravelMode.DRIVING, // DRIVING, BICYCLING, TRANSIT, WALKING
      unitSystem: google.maps.UnitSystem.METRIC, // METRIC, IMPERIAL
      avoidHighways: false, // true, false
      avoidTolls: false // true, false
    }, function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
         var originList = response.originAddresses;
         var destinationList = response.destinationAddresses;
         for (var i = 0; i < originList.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
                distenceCallback(results[j].distance.text,results[j].duration.text);
          }
        }
      }
    });
  }
   

};
export default globalFunction;