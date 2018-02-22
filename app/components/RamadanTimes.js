import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import config from "../config";
import PrayTimes from "./PrayTimesFunction.js";
import Cookies from "./Cookies";
import globalFunction from "../components/GlobalFunction";

class PrayerTimes extends React.Component {

	constructor(args) {
		super(args);
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
			document.getElementById("fajr").innerHTML = "Fajr (Sehr): " + todayPrayTime.fajr;
			document.getElementById("dhuhr").innerHTML = "Dhuhr: " + todayPrayTime.dhuhr;
			document.getElementById("asr").innerHTML = "Asr: " + todayPrayTime.asr;
			document.getElementById("maghrib").innerHTML = "Maghrib (Iftar): " + todayPrayTime.maghrib;
			document.getElementById("ishaa").innerHTML = "Isha'a: " + todayPrayTime.isha;
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
						this.countdown("countdown", 0, timeDifference, "Fajr Countdown: ");
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
						this.countdown("countdown", 0, timeDifference, "Dhuhr Countdown: ");
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
						this.countdown("countdown", 0, timeDifference, "Asr Countdown: ");
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
						this.countdown("countdown", 0, timeDifference, "Maghrib Countdown: ");
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
						this.countdown("countdown", 0, timeDifference, "Isha Countdown: ");
						break;
					} else {
						document.getElementById("ishaa").style.display = 'none';
						var nextDay = globalFunction.getTodayDate(1);
						Cookies.writeCookie('dateCookie', nextDay, 3);
						var locationLatitude = Cookies.readCookie('locationLatitude');
						var locationLongitude = Cookies.readCookie('locationLongitude');
						var locationTimeZone = Cookies.readCookie('locationTimeZone');
				        var blahblah = "2016-06-03-20-31-01";
						this.showTime(locationLongitude, locationLatitude, locationTimeZone, blahblah);
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
					var mapArray = globalFunction.getCurrentLocation();
					Cookies.writeCookie('locationLongitude', mapArray[1], 3);
					Cookies.writeCookie('locationLatitude', mapArray[0], 3);
					Cookies.writeCookie('locationTimeZone', mapArray[2], 3);
					Cookies.writeCookie('dateCookie', mapArray[3], 3);
				
					this.showTime(mapArray[1], mapArray[0], mapArray[2]);
				} else {
					this.showTime(locationLongitude, locationLatitude, locationTimeZone);
				}
		    } else {
		        time = new Date( msLeft );
		        hours = time.getUTCHours();
		        mins = time.getUTCMinutes();
		        element.innerHTML = ( hours ? message + hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds());
		        setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
		    }
		}
		element = document.getElementById( elementName );
		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}
	
	componentDidMount() {
		var locationLatitude = Cookies.readCookie('locationLatitude');
		var locationLongitude = Cookies.readCookie('locationLongitude');
		var locationTimeZone = Cookies.readCookie('locationTimeZone');
		if(locationLatitude == "" || locationLongitude == "" || locationTimeZone == ""){
			var mapArray = globalFunction.getCurrentLocation();
			Cookies.writeCookie('locationLongitude', mapArray[1], 3);
			Cookies.writeCookie('locationLatitude', mapArray[0], 3);
			Cookies.writeCookie('locationTimeZone', mapArray[2], 3);
			Cookies.writeCookie('dateCookie', mapArray[3], 3);
		
			this.showTime(mapArray[1], mapArray[0], mapArray[2]);
		} else {
			Cookies.writeCookie('dateCookie', "", 3);
			this.showTime(locationLongitude, locationLatitude, locationTimeZone);
		}		
	}

  render() {
  		
    return (
     	<InlineCss stylesheet={PrayerTimes.css(this.props.arabic)} namespace="PrayerTimes">
     		<div className="container">
     			<div>
     				<h1>Ramadan 2016</h1>
     			</div>
     			<div id="countdown">
					<div id="hours">
						</div>
						<div id="minutes">
						</div>
						<div id="seconds">
						</div>
				</div>
				<div>
					<div>
						<label id="fajr"></label>
					</div>
					<div>
						<label id="dhuhr"></label>
					</div>
					<div>
						<label id="asr"></label>
					</div>
					<div>
						<label id="maghrib"></label>
					</div>
					<div>
						<label id="ishaa"></label>
					</div>
				</div>
     		</div>
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `
			& {
				padding: 102px 0 60px;
			}

			& > .container {
				padding: 23px 19%;
			}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};
 
export default PrayerTimes;