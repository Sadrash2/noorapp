import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import config from "../../config";
import functions from "../../scss/styleFunctions";
import css from "../cssGlobal";
import cssFajar from "../cssGlobalFajar";
import Cookies from "../../components/Cookies";
import cssMaghrib from "../cssGlobalMaghrib";
import moment from "moment-hijri";
import PrayTimes from "../../components/PrayTimesFunction";
import globalFunction from "../../components/GlobalFunction";

var myVar;
var time;
class StartScreen extends React.Component {
	/*Read ME 
		IslamicDate and Time
		--------------------
		DIV className="c-islamic-date" is for islamicDate
		{this.state.dateState} {this.state.timeState} is the printed date and time (auto update)

		Ramadan/pray countdown
		----------------------
		DIV className="c-praytime-countdown" will be showing time countdown
		DIV className="c-praytime-list" will be showing praytime list of the day, will be refresh the list when the last pray time countdown finish.

		to change pray list title and countdown title please look for the commment below.
	*/
	constructor(args) {
		super(args);
		//IslamicDate - get today date and time into state
		let d = new Date();
		let date = moment().format('iD iMMMM iYYYY');
	    time = d.toLocaleTimeString();
		this.state = { 
 			timeState: time, 
 			dateState: date,
 		};
	}

	//IslamicDate - Auto update Date and Time ticking
	islamicDateTimer() {
	    let d = new Date();
	    //Hijri date from moment-hijri
	    let date = moment().format('iD iMMMM iYYYY');
	    time = d.toLocaleTimeString();

	    this.setState({timeState: time});
	    this.setState({dateState: date});
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

    	Cookies.writeCookie('locationLongitude', longitude, 3);
		Cookies.writeCookie('locationLatitude', latitude, 3);
		Cookies.writeCookie('locationTimeZone', timezone, 3);
		Cookies.writeCookie('dateCookie', "", 3);
		this.showTime(longitude, latitude, timezone);
	}	

	//getCurrentLocation function error handler
	showError(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				alert("User denied the request for Geolocation.");
				break;
			case error.POSITION_UNAVAILABLE:
				alert("Location information is unavailable.");
				break;
			case error.TIMEOUT:
				alert("The request to get user location timed out.");
				break;
			case error.UNKNOWN_ERROR:
				alert("An unknown error occurred.");
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
			//get label for all pray times
/*pray	*/	document.getElementById("fajr").innerHTML = "Fajr (Sehr): " + todayPrayTime.fajr;
/*label	*/	document.getElementById("dhuhr").innerHTML = "Dhuhr: " + todayPrayTime.dhuhr;
/*details*/	document.getElementById("asr").innerHTML = "Asr: " + todayPrayTime.asr;
			document.getElementById("maghrib").innerHTML = "Maghrib (Iftar): " + todayPrayTime.maghrib;
			document.getElementById("ishaa").innerHTML = "Isha: " + todayPrayTime.isha;
			document.getElementById("fajr").style.display = 'block';
			document.getElementById("dhuhr").style.display = 'block';
			document.getElementById("asr").style.display = 'block';
			document.getElementById("maghrib").style.display = 'block';
			document.getElementById("ishaa").style.display = 'block';

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
/*Countdown title*/		this.countdown("c-countdown", 0, timeDifference, "Fajr Countdown: ");
						break;
					} else {
						document.getElementById("fajr").style.display = 'none';
						continue;
					}
				}
			
				if (i == 1) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[1]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[1]);
/*Countdown title*/		this.countdown("c-countdown", 0, timeDifference, "Dhuhr Countdown: ");
						break;
					} else {
						document.getElementById("dhuhr").style.display = 'none';
						continue;
					}
				}

				if (i == 2) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[2]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[2]);
/*Countdown title*/		this.countdown("c-countdown", 0, timeDifference, "Asr Countdown: ");
						break;
					} else {
						document.getElementById("asr").style.display = 'none';
						continue;
					}
				}
				if (i == 3) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[3]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[3]);
/*Countdown title*/		this.countdown("c-countdown", 0, timeDifference, "Maghrib Countdown: ");
						break;
					} else {
						document.getElementById("maghrib").style.display = 'none';
						continue;
					}
				}
				if (i == 4) {
					var returnNumber = globalFunction.dateTimeCompare(todayDate, prayArray[4]);
					if (returnNumber == -1) {
						let timeDifference = globalFunction.dateDifference(todayDate, prayArray[4]);
/*Countdown title*/		this.countdown("c-countdown", 0, timeDifference, "Isha Countdown: ");
						break;
					} else {
						document.getElementById("ishaa").style.display = 'none';
						var nextDay = globalFunction.getTodayDate(1);
						Cookies.writeCookie('dateCookie', nextDay, 3);
						var locationLatitude = Cookies.readCookie('locationLatitude');
						var locationLongitude = Cookies.readCookie('locationLongitude');
						var locationTimeZone = Cookies.readCookie('locationTimeZone');

						this.showTime(locationLongitude, locationLatitude, locationTimeZone);
						break;
					}
				}
			}
		}
	}

	/////////countdown////////////
	countdown( elementName, minutes, seconds, message) {
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
		        time = new Date( msLeft );
		        hours = time.getUTCHours();
		        mins = time.getUTCMinutes();
		        element.innerHTML = (message + hours + ':' + twoDigits( mins ) ) + ':' + twoDigits( time.getUTCSeconds());      /*countdown time format*/	
		        setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
		    }
		}
		element = document.getElementById( elementName );
		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}

	//daily Verse
	dailyVerseArabPrint(){
		var $ = require ('jquery')
		var quranVerse = [];
			var request =  [
					"Quran",
					"fetch",
					""];

				$.ajax({
					type: "POST",
					datatype: 'json',
					url: "./app/bridge/enter.php",
					data: {request},
					cache: false,
					success: function(data) {
						var response = JSON.parse(data);
						if(response.state === 200) {
							for (var i = 0; i < response.success.length; i++){
								quranVerse.push(response.success[i]);
							}

							var randNum = Math.floor(Math.random()*response.success.length);
							if(quranVerse[randNum].lang == "_en"){
								document.getElementById("dailyVerseEnglish").textContent = quranVerse[randNum].text;
								document.getElementById("dailyVerseArab").textContent = quranVerse[randNum+1].text;
							}else{
								document.getElementById("dailyVerseEnglish").textContent = quranVerse[randNum-1].text;
								document.getElementById("dailyVerseArab").textContent = quranVerse[randNum].text;
							}

							document.getElementById("surahChapter").textContent = "Chapter: "+quranVerse[randNum].sura;
							document.getElementById("ayaVerse").textContent = "Aya: "+quranVerse[randNum].aya;



							getSuraTitle(quranVerse[randNum].sura);
						}
						else {
							

						}
					}.bind(this)
				});

		function getSuraTitle(suraNum){
		var $ = require ('jquery')
			var request =  [
					"Quran",
					"fetchSura",
					suraNum];

				$.ajax({
					type: "POST",
					datatype: 'json',
					url: "./app/bridge/enter.php",
					data: {request},
					cache: false,
					success: function(data) {
						var response = JSON.parse(data);
						if(response.state === 200) {
							document.getElementById("surahTitle").textContent = "Chapter title: "+response.success.name;
						}
						else {
							

						}
					}.bind(this)
				});
	}
	}
	
	componentDidMount() {
		var locationLatitude = Cookies.readCookie('locationLatitude');
		var locationLongitude = Cookies.readCookie('locationLongitude');
		var locationTimeZone = Cookies.readCookie('locationTimeZone');

		if(locationLatitude == "" || locationLongitude == "" || locationTimeZone == ""){
			this.getCurrentLocation();
		} else {
			Cookies.writeCookie('dateCookie', "", 3);
			this.showTime(locationLongitude, locationLatitude, locationTimeZone);
		}		
		this.dailyVerseArabPrint();
	}

	componentWillMount(){
		//IslamicDate - Date and Time start rolling
	   	myVar = setInterval(function(){ this.islamicDateTimer() }.bind(this), 1000);
	 }

	componentWillUnmount(){
		//IslamicDate - Date and Time stop rolling
    	clearInterval(myVar);
  	}

	componentDidUpdate(){
		this.render();
	}

	render() {

		var styleStartScreen;
		var timeStatus = Cookies.readCookie('currentTimeStatus');
		if(timeStatus == 'Fajr'){
			styleStartScreen = cssFajar.startScreen(this.props.arabic);
		}else{
			styleStartScreen = cssMaghrib.startScreen(this.props.arabic);

		}

		return (
			<InlineCss namespace="startscreen" stylesheet={styleStartScreen}>

				<div className="c-startscreen-image">
					<div className="c-startscreen-phone"></div>
				</div>
				<div className="c-startscreen-content">
					<h1 className="c-startscreen-contenttitle">
						{lang(this.props.language, "startscreenContentTitle")}
					</h1>
					<div className="c-startscreen-description">
						{lang(this.props.language, "startscreenDescription")}
					</div>
					<div className="c-islamic-date">
						<div>{this.state.dateState} {this.state.timeState}</div>
					</div>
					<div className="c-praytime-countdown" id="c-countdown">
						
					</div>
					<div className="c-praytime-list">
						<label id="fajr"></label>
						<label id="dhuhr"></label>
						<label id="asr"></label>
						<label id="maghrib"></label>
						<label id="ishaa"></label>
					</div>
					<div className="c-dailyVerse">
						<div className="o-container">
	     				
	     					<p id="surahChapter"></p><p id="ayaVerse"></p> <p id="surahTitle"></p>
	     				
		     			</div>
		     			<div className="o-container">
		     				
		     				<h1 id="dailyVerseEnglish"></h1>
		     				
		     			</div>
		     			<div className="o-container">
		     				
		     				<h1 id="dailyVerseArab"></h1>
		     				
		     			</div>
					</div>
				</div>

			</InlineCss>
		);
	}


};

export default StartScreen;