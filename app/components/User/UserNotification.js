import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import config from "../../config";
import functions from "../../scss/styleFunctions";
import Cookies from "../../components/Cookies";
import validation from "../../components/GlobalValidation";
import PrayTimes from "../../components/PrayTimesFunction";
import globalFunction from "../../components/GlobalFunction";
var betaEmail;
class UserNotification extends React.Component {

	constructor(args) {
		super(args);
	}

	//html5 geolocation API
	getCurrentLocation() {
			this.showPosition = this.showPosition.bind(this);
			var optn = {
				enableHighAccuracy : true, //if true will be more accurate but takes longer time.
				timeout : Infinity,
				maximumAge : 0
			};
		
			if (navigator.geolocation) {
				// Get the user's current position
				navigator.geolocation.getCurrentPosition(this.showPosition, this.showError, optn);
			} else {
				alert('Geolocation is not supported in your browser');
			}
	}

	//getCurrentLocation function, get latitude, longtitude and Timezone of the current location
	showPosition(position) {
			var date = new Date();
			let timezone = date.getTimezoneOffset();
			timezone = (timezone/60) * -1;
			let latitude = position.coords.latitude;
			latitude = latitude.toFixed(3);
			let longitude = position.coords.longitude;
			longitude = longitude.toFixed(3);

	    	var today = globalFunction.getTodayDate(0);

	    	Cookies.writeCookie('locationLongitude', longitude, 1);
			Cookies.writeCookie('locationLatitude', latitude, 1);
			Cookies.writeCookie('locationTimeZone', timezone, 1);
			Cookies.writeCookie('dateCookie', "", 1);

			this.showTime(longitude, latitude, timezone);
			//location.reload();
	}	

	//getCurrentLocation function error handler
	showError(error) {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					//alert("User denied the request for Geolocation.");
					var $ = require ('jquery')
					$("#c-permission-container").hide();
					break;
				case error.POSITION_UNAVAILABLE:
					//alert("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					//alert("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					//alert("An unknown error occurred.");
					break;
			}
	}


	// Ramadan/praytime Countdown - get pray time from praytimesFunction and function for countdown
	showTime(longitude, latitude, timezone) {
		getTimeAndShow = getTimeAndShow.bind(this);
		var dateCookie = Cookies.readCookie('dateCookie');
		var today = globalFunction.getTodayDate(0);
		//dateCookie = empty then get today dailypraytime
		if (dateCookie == "") {
			getTimeAndShow(longitude, latitude, timezone, today);
		} else {
			var dateCompareNumber = globalFunction.dateCompare(today, dateCookie);
			if (dateCompareNumber == -1) {
				getTimeAndShow(longitude, latitude, timezone, dateCookie);
			} else if (dateCompareNumber == 0) {
				getTimeAndShow(longitude, latitude, timezone, today);
			} else if (dateCompareNumber == 1) {
				Cookies.writeCookie('dateCookie', today, 3);
				getTimeAndShow(longitude, latitude, timezone, today);
			}
		}
		
		//get dailypraytime and activate countdown
		function getTimeAndShow (longitude, latitude, timezone, countdownDate) {

			var date = new Date();
			var todayParts = countdownDate.split("-");
			//getdailyprayertimes from prayTimesFunction
			var todayPrayTime = (PrayTimes.getTimes([parseInt(todayParts[0]), parseInt(todayParts[1]), parseInt(todayParts[2])], [latitude, longitude], timezone, 'auto', '24h'));
			//get label for all pray timess
			var fajr = (todayPrayTime.fajr).replace(":", "-");
			var dhuhr = (todayPrayTime.dhuhr).replace(":", "-");
			var asr = (todayPrayTime.asr).replace(":", "-");
			var maghrib = (todayPrayTime.maghrib).replace(":", "-");
			var ishaa = (todayPrayTime.isha).replace(":", "-");

			//get pray dateTime and push into array for comparison purpose;
			var prayArray = [countdownDate+"-"+fajr + "-00", countdownDate+"-"+dhuhr + "-00", countdownDate+"-"+asr + "-00", countdownDate+"-"+maghrib + "-00", countdownDate+"-"+ishaa + "-00"];
			var todayDate = globalFunction.getTodayDateTime(0);
			for (var i = 0; i < 5; i ++) {
				if (i == 0) {
					//compare todayDateTime and prayerDateTime, if return -1(early than) activate countdown and break loop
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[0]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[0]);
						document.getElementById("notification-prayername").innerHTML = "Fajr " + todayPrayTime.fajr;
/*Countdown title*/		this.countdown("Fajr", 0, timeDifference);
						break;
					} else {
						continue;
					}
				}
			
				if (i == 1) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[1]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[1]);
						let timeDifference2 = globalFunction.dateDifference(todayDate, prayArray[3]);
						document.getElementById("notification-prayername").innerHTML = "Dhuhr " + todayPrayTime.dhuhr;
/*Countdown title*/		this.countdown("Dhuhr", 0, timeDifference);
						break;
					} else {
						continue;
					}
				}

				if (i == 2) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[2]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[2]);
						let timeDifference2 = globalFunction.dateDifference(todayDate, prayArray[3]);
						document.getElementById("notification-prayername").innerHTML = "Asr " + todayPrayTime.asr;
/*Countdown title*/		this.countdown("Asr", 0, timeDifference);
						break;
					} else {
						continue;
					}
				}
				if (i == 3) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[3]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[3]);
						let timeDifference2 = globalFunction.dateDifference(todayDate, prayArray[3]);
						document.getElementById("notification-prayername").innerHTML = "Maghrib " + todayPrayTime.maghrib;
/*Countdown title*/		this.countdown("Maghrib", 0, timeDifference);
						break;
					} else {
						continue;
					}
				}
				if (i == 4) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[4]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[4]);
						let timeDifference2 = globalFunction.dateDifference(todayDate, prayArray[0]);
						document.getElementById("notification-prayername").innerHTML = "Isha " + todayPrayTime.isha;
/*Countdown title*/		this.countdown("Isha", 0, timeDifference);
						break;
					} else {
						var nextDay = globalFunction.getTodayDate(1);
						Cookies.writeCookie('dateCookie', nextDay, 3);
						var locationLatitude = Cookies.readCookie('locationLatitude');
						var locationLongitude = Cookies.readCookie('locationLongitude');
						var locationTimeZone = Cookies.readCookie('locationTimeZone');
						if(locationLatitude == "" || locationLongitude == "" || locationTimeZone == ""){
							this.getCurrentLocation();
						} else {
							this.showTime(locationLongitude, locationLatitude, locationTimeZone);
						}
						break;
					}
				}
			}
		}
	}

	/////////countdown////////////
	countdown(prayerName, minutes, seconds) {
		var $ = require ('jquery')
		var element, endTime, hours, mins, msLeft, time;
		updateTimer = updateTimer.bind(this);
		function twoDigits( n )
		{
		    return (n <= 9 ? "0" + n : n);
		}

		function updateTimer()
		{
		    msLeft = endTime - (+new Date);
		    if ( msLeft < 1000 ) {
		        //countdown finish then check cookies, if cookie empty then getLocation else showTime
		        var locationLatitude = Cookies.readCookie('locationLatitude');
				var locationLongitude = Cookies.readCookie('locationLongitude');
				var locationTimeZone = Cookies.readCookie('locationTimeZone');

				if(locationLatitude == "" || locationLongitude == "" || locationTimeZone == ""){
					this.getCurrentLocation();
				} else {
					this.showTime(locationLongitude, locationLatitude, locationTimeZone);
				}
		    } else {
		    	if(msLeft < 60000){
		    		$('.o-prayertime-notification').show();
		    		$('#notification-timeleft').text("In 1 minutes.");
					document.getElementById("notification-prayername").innerHTML = "Its about time for " + prayerName;
		    	}else if(msLeft < 180000){
		    		$('#notification-timeleft').text("In 3 minutes.");
		    		$('.o-prayertime-notification').show();
					document.getElementById("notification-prayername").innerHTML = "Its about time for " + prayerName;
		    	}else if(msLeft < 300000){
		    		$('#notification-timeleft').text("In 5 minutes.");
		    		$('.o-prayertime-notification').show();
					document.getElementById("notification-prayername").innerHTML = "Its about time for " + prayerName;
		    	}else if(msLeft < 900000){
		    		$('.o-prayertime-notification').show();
					document.getElementById("notification-prayername").innerHTML = "Its about time for " + prayerName;
		    		$('#notification-timeleft').text("In 15 minutes.");
		    	}else {
		    		$('.o-prayertime-notification').hide();
		    	}

		        time = new Date( msLeft );
		        hours = time.getUTCHours();
		        mins = time.getUTCMinutes();
		        setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
		    }
		}
		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}

	componentDidMount() {
		var locationLatitude = Cookies.readCookie('locationLatitude');
		var locationLongitude = Cookies.readCookie('locationLongitude');
		var locationTimeZone = Cookies.readCookie('locationTimeZone');
		var $ = require ('jquery')
		$('.o-prayertime-notification').hide();
		if(locationLatitude == "" || locationLongitude == "" || locationTimeZone == ""){
			this.getCurrentLocation();
		} else {
			Cookies.writeCookie('dateCookie', "", 3);
			this.showTime(locationLongitude, locationLatitude, locationTimeZone);			
		}
	}

	componentDidUpdate() {
		var url = window.location.search;
			var queryStart = url.indexOf("?") + 1;
	        var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	        var query = url.slice(queryStart, queryEnd - 1);
	        var pairs = query.replace(/\+/g, " ").split("&");
	        if(pairs[0] != ""){
	        	var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		        tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		        parms = {}, i, n, v, nv;
		        betaEmail = emailPairs[1];
		        betaEmail = betaEmail.replace("%40","@");
				this.fetchRequest();
				
	        }
	}

	fetchRequest(){
		var $ = require ('jquery')

      	var opt = betaEmail;

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
				var response = JSON.parse(data);
				if(response.state === 200) {
					$("#requestnotification-table li").remove();

		            for(var i =0; i < response.success.length; i++){
		            	$('#requestnotification-table')
						         .append('<li class="c-notification" id="friendlist-notification-'+i+'>' +
									'<img src="app/assets/images/content/promotional/users/default-profile.jpg" />' +
									'<div class="c-notification-container">' +
										'<header>' +
											'<h5 id="friend-notification-'+i+'">'+response.success[i].emailSent+'</h5>' +
										'</header>' +
										'<div class="c-notification-detail">' +
											'Friend Request' +
										'</div>' +
									'</div>' +
									'<div class="c-notification-content">' +
										'<div class="c-notification-confirm">' +
											'<img id="request-confirm-'+i+'" src="app/assets/images/content/promotional/users/button-confirm.png" />' +
										'</div>' +
										'<div>' +
											'<img id="request-delete-'+i+'" src="app/assets/images/content/promotional/users/button-delete.png" />' +
										'</div>' +
									'</div>' +
								'</li>');
						confirmClick = confirmClick.bind(this);
						$('#request-confirm-'+i).click(confirmClick);
						deleteClick = deleteClick.bind(this);
						$('#request-delete-'+i).click(deleteClick);
		            }
				} else {
					$("#requestnotification-table li").remove();
					$("#o-friendrequest-notification").hide();
				}
			}.bind(this)
		});

		function confirmClick(e) {
			var id = e.target.id;
			id = id.split("-");
			var $ = require ('jquery')			

			var friendConfirmEmail = $('#friend-notification-'+id[2]).text();

			var opt = {"emailRequest": betaEmail,
						"emailSent": friendConfirmEmail
					}

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
					var response = JSON.parse(data);
					if(response.state === 200) {
						var list = document.getElementById("requestnotification-table");
						list.removeChild(list.childNodes[id[2]]);
					}
				}.bind(this)
			});
		}

		function deleteClick(e) {
			var id = e.target.id;
			id = id.split("-");
			var $ = require ('jquery')			

			var friendConfirmEmail = $('#friend-notification-'+id[2]).text();

			var opt = {"emailRequest": betaEmail,
						"emailSent": friendConfirmEmail
					}

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
					var response = JSON.parse(data);
					if(response.state === 200) {
						var list = document.getElementById("requestnotification-table");
						list.removeChild(list.childNodes[id[2]]);
					}
				}.bind(this)
			});
		}
	}

	render() {

		return (	
			<InlineCss stylesheet={UserNotification.css(this.props.arabic)} namespace="UserNotification">
				<div className="o-usernotification-container">
					<section className="o-prayertime-notification">
						<div className="c-notificationhead-content">
							<ul className="o-notification-results" id="prayernotification-table">
								<li className="c-notification">
									<img src="app/assets/images/content/promotional/users/icon-prayer.png" />
									<div className="c-notification-container">
										<header>
											<h5 id="notification-prayername"></h5>
										</header>
										<div className="c-notification-content">
											<div id="notification-timeleft"></div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</section>
					<section className="o-friendrequest-notification">
						<div className="c-notificationhead-content">
							<ul className="o-notification-results" id="requestnotification-table">
								<li className="c-notification">
									
								</li>
							</ul>
						</div>
					</section>
				</div>
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `
			ul.o-notification-results li {
				background-color: white;
				padding: 15px 10px 15px 35px;
				color: black;
				display: flex;
				flex-direction: row;
			}

			li.c-notification > img {
				border-radius: 50%;
				max-height: 50px;
				margin-right: 20px;
			}

			.c-notification-content {
				display: flex;
				flex-direction: row;
				font-size: 1.4rem;
			}

			.c-notification-confirm {
				padding-right: 20px;
			}

			.c-notification-content > div > img {
				cursor: pointer;
				padding-top: 10px;
			}

			.c-notification-detail {
				font-size: 1.2rem;
				color: grey;
			}

			
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

UserNotification.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserNotification;