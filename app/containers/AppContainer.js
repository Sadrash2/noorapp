/////For Desktop notification
window.onerror = function() {
    if (typeof window.console !== "undefined" && typeof window.console.log === "function") {
    	//console.log("Uncatched error: ", arguments);
    } 
};

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import InlineCss from "react-inline-css";
import lang from "../languages/lang";
import {Link, Router} from "react-router";
import AppStyle from "../scss/App";
import { setLanguage, setResolution  } from "../actions";
import reducers from "../reducers";
import MenuContainer from "./MenuContainer";
import UserCPMenuContainer from "./UserCPMenuContainer";
import Footer from "../components/Footer";
import config from "../config";
import PrayTimes from "../components/PrayTimesFunction.js";
import Cookies from "../components/Cookies";
import globalFunction from "../components/GlobalFunction";

var email, token;
class AppContainer extends Component {
	constructor(args) {
		super(args);
	}

	//////////Desktop Notification////////////////
	sendNotification(prayType, prayTime) {
	    let title = 'NOOR Notification';
	    let body = prayType+' praying time: '+prayTime;
	    let icon = '';
	 

	    // Available options
	    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
	    var options = {
	      body: body,
	      icon: icon,
	      dir: 'ltr',
	      sound: '',
	      vibrate: [200, 100, 200]

	    };

		var notification = new Notification(title, options);
		setTimeout(function() {
          	notification.close()
     	}, 5000);


     	notification.onclick = function(event) {
 			event.preventDefault(); // prevent the browser from focusing the Notification's tab
  			notification.close();
		}

		notification.onshow = function(event) {
			event.preventDefault(); // prevent the browser from focusing the Notification's tab
		}

		notification.onclose = function(event) {
			event.preventDefault(); // prevent the browser from focusing the Notification's tab
		}
	}
	////////////////////////////////////////

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
	
	//get pray time from praytimesFunction and function for countdown
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
				Cookies.writeCookie('dateCookie', today, 1);
				getTimeAndShow(longitude, latitude, timezone, today);
			}
		}
		
		//get dailypraytime and activate countdown
		function getTimeAndShow (longitude, latitude, timezone, countdownDate) {
			var $ = require ('jquery')
			var date = new Date();
			var todayParts = countdownDate.split("-");
			//getdailyprayertimes from prayTimesFunction
			var todayPrayTime = (PrayTimes.getTimes([parseInt(todayParts[0]), parseInt(todayParts[1]), parseInt(todayParts[2])], [latitude, longitude], timezone, 'auto', '24h'));
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
						this.countdown("countdown", 0, timeDifference, "Fajr Countdown: ", "Fajr", todayPrayTime.fajr);
						Cookies.writeCookie('currentTimeStatus', "Maghrib", 1);
						this.forceUpdate();
						break;
					} else {
						continue;
					}
				}		
				if (i == 1) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[1]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[1]);
						this.countdown("countdown", 0, timeDifference, "Dhuhr Countdown: ", "Dhuhr", todayPrayTime.dhuhr);
						Cookies.writeCookie('currentTimeStatus', "Fajr", 1);
						this.forceUpdate();
						break;
					} else {
						continue;
					}
				}
				if (i == 2) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[2]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[2]);
						this.countdown("countdown", 0, timeDifference, "Asr Countdown: ", "Asr", todayPrayTime.asr);
						Cookies.writeCookie('currentTimeStatus', "Fajr", 1);
						this.forceUpdate();
						break;
					} else {
						continue;
					}
				}
				if (i == 3) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[3]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[3]);
						this.countdown("countdown", 0, timeDifference, "Maghrib Countdown: ", "Maghrib", todayPrayTime.maghrib);
						Cookies.writeCookie('currentTimeStatus', "Fajr", 1);
						this.forceUpdate();
						break;
					} else {
						continue;
					}
				}
				if (i == 4) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[4]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[4]);
						this.countdown("countdown", 0, timeDifference, "Isha Countdown: ", "Isha", todayPrayTime.isha);
						Cookies.writeCookie('currentTimeStatus', "Maghrib", 1);
						this.forceUpdate();
						break;
					} else {
						var nextDay = globalFunction.getTodayDate(1);
						Cookies.writeCookie('dateCookie', nextDay, 1);
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
	countdown( elementName, minutes, seconds, message, prayType, prayTime) {
		var element, endTime, hours, mins, msLeft, time;

		updateTimer = updateTimer.bind(this);
		function twoDigits( n )
		{
		    return (n <= 9 ? "0" + n : n);
		}

		function updateTimer()
		{
			var $ = require ('jquery')
		    msLeft = endTime - (+new Date);
		    if ( msLeft < 1000 ) {

		    	/*if (Notification.permission === "granted") {
					if (prayType == "Fajr") {
			    		this.sendNotification(prayType, prayTime);
			    	} else if (prayType == "Dhuhr") {
			    		this.sendNotification(prayType, prayTime);
			    	} else if (prayType == "Asr") {
			    		this.sendNotification(prayType, prayTime);
			    	} else if (prayType == "Maghrib") {
			    		this.sendNotification(prayType, prayTime);
			    	} else if (prayType == "Isha") {
			    		this.sendNotification(prayType, prayTime);
			    	}
				} else {
					
				}*/
		    	Cookies.writeCookie('dateCookie', "", 1);
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
		        time = new Date( msLeft );
		        hours = time.getUTCHours();
		        mins = time.getUTCMinutes();
				$('#prayer-name').text(prayType);
				$('#prayer-time').text(prayTime);
		        $('#c-countdown').text((hours + ':' + twoDigits( mins ) ) + ':' + twoDigits( time.getUTCSeconds()));
		        setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
		    }
		}
		element = document.getElementById( elementName );
		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}

	mediaQueryChanged() {
		const desktop = window.matchMedia(`(min-width: 992px)`).matches;
		const {store} = this.context;

		store.dispatch( setResolution(desktop) );
	}

	scrollTo(elementId) {
		const rect = document.getElementById(elementId).getBoundingClientRect();
		const menuRect = document.getElementById("Menu").getBoundingClientRect();
		
		window.scrollTo(0,rect.top + window.pageYOffset - menuRect.height ); 
	}

	handleAccept(e) {
		//this.getCurrentLocation();
			var $ = require ('jquery')

			//this.sendNotification("","");

			if (!("Notification" in window)) {
			    alert("This browser does not support desktop notification");
			}
			else if (Notification.permission === "granted") {
			   
			    $("#c-permission-container").hide();
			}
			else if (Notification.permission !== 'denied') {
			    Notification.requestPermission(function (permission) {
			    	if (!('permission' in Notification)) {
			        	Notification.permission = permission;
			    	}
			    
			    	if (permission === "granted") {
			        	$("#c-permission-container").hide();
			      	} else if (permission === "denied") {
			      		$("#c-permission-container").hide();
			      	}
			    });
			  }	
	}

	handleDiscard(e) {
		var $ = require ('jquery')
		$("#c-permission-container").hide();
	}

	componentDidMount() {
		var $ = require ('jquery');
		$('#c-apps-List').hide();

		const {store} = this.context;
		let mediaQueryDesktop = window.matchMedia(`(min-width: 992px)`);
		let mediaQueryLarge = window.matchMedia(`(min-width: 1170px)`);
		mediaQueryDesktop.addListener(this.mediaQueryChanged.bind(this));
		
		if(mediaQueryDesktop.matches) {
			this.mediaQueryChanged();
		}

		var $ = require('jquery')

	    $(' #mIcon[src$=".svg"]').hover(HoverIn,HoverOut);
	    $(' #qIcon[src$=".svg"]').hover(HoverIn,HoverOut);
	    $(' #aIcon[src$=".svg"]').hover(HoverIn,HoverOut);

	    function HoverIn() {
	    	if ($(this).hasClass('icons')){
			    var $img = $(this);
			    var imgURL = $img.attr('src');
				var src2 = $(this).attr('value');
			  	$(this).attr('src',src2);
			   	$(this).attr('value',imgURL);
	    	}    	
		}
		function HoverOut() {
		   	if ($(this).hasClass('icons')){
		    	var src2 = $(this).attr('value');
		       	var imgURL = $(this).attr('src');
		     	$(this).attr('src',src2);
		    	$(this).attr('value',imgURL);
		      }
		}

		var $ = require ('jquery')

		//Notification permission
		/*if (Notification.permission === "granted") {
			$("#c-permission-container").hide();
		} else if (Notification.permission === "denied"){
			$("#c-permission-container").hide();
		} else {
			$("#c-permission-container").show();
		}*/

		//prayerTimesCounter and desktopNotification
		var locationLatitude = Cookies.readCookie('locationLatitude');
		var locationLongitude = Cookies.readCookie('locationLongitude');
		var locationTimeZone = Cookies.readCookie('locationTimeZone');

		if(locationLatitude == "" || locationLongitude == "" || locationTimeZone == ""){
			this.getCurrentLocation();
		} else {
			Cookies.writeCookie('dateCookie', "", 1);
			this.showTime(locationLongitude, locationLatitude, locationTimeZone);
		}

		//event when you are not clicking the searchbar or the suggestion ul
	    clickEvent2 = clickEvent2.bind(this);
	    $(document).mousedown(clickEvent2);
	    function clickEvent2(e) {
	        var buttonContainer = $("#c-application-button");
	        var ULContainer = $("#c-apps-List");
	        var mosqueButton = $("#mIcon");
	        var quranButton = $("#qIcon");
	        var accountButton = $("#aIcon");
	        
	        if (!ULContainer.is(e.target) && !buttonContainer.is(e.target) && !mosqueButton.is(e.target) && !quranButton.is(e.target) && !accountButton.is(e.target)) 
	        {
	            ULContainer.hide(300);
	        }
	    }

	    var url = window.location.pathname;
		url = url.split("/");
		url = url[url.length-1];
		if(url.startsWith("QuranMain")) {
			var url = window.location.search;
		    var queryStart = url.indexOf("?") + 1;
	       	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	       	var query = url.slice(queryStart, queryEnd - 1);
	       	var pairs = query.replace(/\+/g, " ").split("&");
	       	if (pairs[0] == "" || pairs[1] == "") {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		      	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		      	parms = {}, i, n, v, nv;
		      	email = emailPairs[1];
		      	token = tokenPairs[1];
		      	email = email.replace("%40","@");
        	}
		} else if(url.startsWith("MosqueFinder")){
			var url = window.location.search;
		    var queryStart = url.indexOf("?") + 1;
	       	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	       	var query = url.slice(queryStart, queryEnd - 1);
	       	var pairs = query.replace(/\+/g, " ").split("&");
	       	if (pairs[0] == "" || pairs[1] == "") {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		      	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		      	parms = {}, i, n, v, nv;
		      	email = emailPairs[1];
		      	token = tokenPairs[1];
		      	email = email.replace("%40","@");
        	}
		} else if(url.startsWith("accounts")){
			var url = window.location.search;
		    var queryStart = url.indexOf("?") + 1;
	       	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	       	var query = url.slice(queryStart, queryEnd - 1);
	       	var pairs = query.replace(/\+/g, " ").split("&");
	       	if (pairs[0] == "" || pairs[1] == "") {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		      	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		      	parms = {}, i, n, v, nv;
		      	email = emailPairs[1];
		      	token = tokenPairs[1];
		      	email = email.replace("%40","@");
        	}   	
		}
	}

	componentDidUpdate(){
		let { query } = this.props.location;
		if(query.scrollTo){
			this.scrollTo(query.scrollTo);
			this.context.router.push(config.root + "/");
		}

		var url = window.location.pathname;
		url = url.split("/");
		url = url[url.length-1];
		if(url.startsWith("QuranMain")) {
			var url = window.location.search;
		    var queryStart = url.indexOf("?") + 1;
	       	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	       	var queryUrl = url.slice(queryStart, queryEnd - 1);
	       	var pairs = queryUrl.replace(/\+/g, " ").split("&");
	       	if (pairs[0] == "" || pairs[1] == "") {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		      	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		      	parms = {}, i, n, v, nv;
		      	email = emailPairs[1];
		      	token = tokenPairs[1];
		      	email = email.replace("%40","@");
        	}
		} else if(url.startsWith("MosqueFinder")){
			var url = window.location.search;
		    var queryStart = url.indexOf("?") + 1;
	       	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	       	var queryUrl = url.slice(queryStart, queryEnd - 1);
	       	var pairs = queryUrl.replace(/\+/g, " ").split("&");
	       	if (pairs[0] == "" || pairs[1] == "") {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		      	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		      	parms = {}, i, n, v, nv;
		      	email = emailPairs[1];
		      	token = tokenPairs[1];
		      	email = email.replace("%40","@");
        	}
		} else if(url.startsWith("accounts")){
			var url = window.location.search;
		    var queryStart = url.indexOf("?") + 1;
	       	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	       	var queryUrl = url.slice(queryStart, queryEnd - 1);
	       	var pairs = queryUrl.replace(/\+/g, " ").split("&");
	       	if (pairs[0] == "" || pairs[1] == "") {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		      	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		      	parms = {}, i, n, v, nv;
		      	email = emailPairs[1];
		      	token = tokenPairs[1];
		      	email = email.replace("%40","@");
        	}   	
		}
	}

	componentWillMount() {
		var $ = require ('jquery');
		$('#c-apps-List').hide();
	}

	handleAppsButtonClick(e) {
		var $ = require ('jquery');
		if ($('#c-apps-List').is(":visible"))
			$('#c-apps-List').hide();
		else
			$('#c-apps-List').show();
	}

	handleMosqueFinderClick2(e) {
		var $ = require ('jquery');
		var ULContainer = $("#c-apps-List");
		ULContainer.hide(300);
		this.context.router.push(config.root + "/MosqueFinder?email="+email+"&token="+token);
		
	}
	handleQuranReaderClick2(e) {
		var $ = require ('jquery');
		var ULContainer = $("#c-apps-List");
		ULContainer.hide(300);
		this.context.router.push(config.root + "/QuranMain?email="+email+"&token="+token);
	}
	exit() {
    	this.context.router.push(config.root + "/NotFound");
  	}
	handleMyAccountClick2(e) {
		var $ = require ('jquery');
		var ULContainer = $("#c-apps-List");
		ULContainer.hide(300);
		this.context.router.push(config.root + "/accounts?email="+email+"&token="+token);		
	}

	render() {
		
		const state = this.context.store.getState();
		return (			
			<InlineCss stylesheet={AppStyle} namespace="App">
				<div className="o-main-top-menu">
					<div className="o-noorLogo-icon"><img className="c-logo-image" src="app/components/ClosedBeta/assets/noorLogo.svg"/></div> 
					<img id="c-application-button" className="c-application-button" onClick={this.handleAppsButtonClick.bind(this)} src="app/components/ClosedBeta/assets/AppsButton.svg"/>
				</div>
				<div id="c-apps-List" className="o-application-menu">
					<div className="o-button-wrapper">
						<img onClick={this.handleMosqueFinderClick2.bind(this)} className="icons c-app-icon"  id="mIcon"	src="app/components/ClosedBeta/assets/appicon-mosque-inactive.svg" value="app/components/ClosedBeta/assets/appicon-mosque-active.svg"	/>
						<img onClick={this.handleMyAccountClick2.bind(this)} className="icons c-app-icon"   id="aIcon"	src="app/components/ClosedBeta/assets/appicon-user-inactive.svg" value="app/components/ClosedBeta/assets/appicon-user-active.svg"	/>
					 	<img onClick={this.handleQuranReaderClick2.bind(this)} className="icons c-app-icon quranIcon"  id="qIcon" 	src="app/components/ClosedBeta/assets/appicon-quran-inactive.svg" value="app/components/ClosedBeta/assets/appicon-quran-active.svg"	/>
					</div>
				</div>
				<UserCPMenuContainer />
				
				{this.props.children && React.cloneElement(this.props.children, {
		            language: state.language.code,
		            desktop: state.desktop,
					arabic: state.language.arabic
		        })}
						
			    {/*<InlineCss stylesheet={AppContainer.css(this.props.arabic)} namespace="AppContainer">
			    	<div className="c-permission-container" id="c-permission-container">
			    		<p>This website uses notification to improve your experience. We'll assume you're ok with this, but you can opt-out if you wish.</p>
			    		<div className="modal-buttons" id="c-permission-box">
			    			<div id="buttonDiv">
				    			<ul>
					    			<li><button className="btn btn-modal accept" onClick={this.handleAccept.bind(this)} id="c-accept">Accept</button></li>
					    			<li><button className="btn btn-modal discard" onClick={this.handleDiscard.bind(this)} id="c-discard">Discard</button></li>
					    		</ul>
				    		</div>
			    		</div>
			    	</div>
			    </InlineCss>*/}
			</InlineCss>
		);
	}

	static css(arabicToggle) {

		const base = `

			& p {
				font-size: 13px;
				color: #999999;
				font-weight: bold;
			}

			

			.c-permission-container {
				background-color: #efefef;
				width: 100%;
				padding: 15px 0;
				margin: 0 auto;
				position: fixed;
				bottom: 0px;
				z-index: 999999999999999999999999;
				text-align: center;
				box-shadow: 0px 0px 10px #ccc;
				border-top: 1px solid white;
			}

			.modal-buttons {
				width: 100%;
			}

			.modal-buttons ul {
				margin: 0px;
				padding: 0px;
			}

			.modal-buttons ul li {
				display: inline-block;
				margin: 0 5px;
			}

			.modal-buttons button {
				border: 0px;
				cursor: pointer;
			}

			.modal-buttons .accept {
				background-color: #c79269;
				color: white;
			}

			.modal-buttons .discard {
				background-color: #999;
				color: white;
			}

		`;

		const arabic = `
				
		`;

		return arabicToggle ? base + arabic : base;

	}
};


AppContainer.contextTypes = {
	store: React.PropTypes.object,
	router: React.PropTypes.object.isRequired
};


export default connect(state => state)(AppContainer)