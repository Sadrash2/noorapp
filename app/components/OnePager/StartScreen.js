import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import config from "../../config";
import css from "./css";
import cssFajar from "../cssGlobalFajar";
import Cookies from "../../components/Cookies";
import cssMaghrib from "../cssGlobalMaghrib";
import moment from "moment-hijri";
import PrayTimes from "../../components/PrayTimesFunction";
import globalFunction from "../../components/GlobalFunction";
import functions from "../../scss/styleFunctions";

var myVar;
var time;
class StartScreen extends React.Component {
/*Read ME 
		IslamicDate and Time
		
		DIV className="c-islamic-date" is for islamicDate
		{this.state.dateState} {this.state.timeState} is the printed date and time (auto update)

		Ramadan/pray countdown
		
		DIV className="c-praytime-countdown" will be showing time countdown
		DIV className="c-praytime-list" will be showing praytime list of the day, will be refresh the list when the last pray time countdown finish.

		to change pray list title and countdown title please look for the commment below.
	*/
	constructor(args) {
		super(args);
		//IslamicDate - get today date and time into state
		let date = moment().format('iD iMMMM iYYYY');
		let dateInEnglish = this.getDateinWords();
	    time = this.getTimein24H();
		this.state = { 
 			timeState: time, 
 			dateState: date,
 			dateEngState: dateInEnglish
 		};
	}

	//IslamicDate - Auto update Date and Time ticking
	islamicDateTimer() {
	    //Hijri date from moment-hijri
	    let date = moment().format('iD iMMMM iYYYY');
	    let dateInEnglish = this.getDateinWords();
        time = this.getTimein24H();
	    this.setState({timeState: time});
	    this.setState({dateState: date});
	    this.setState({dateEngState: dateInEnglish});
	}

	getTimein24H() {
		var d = new Date();
	   	var hh = ('0' + (d.getHours())).slice(-2);
    	var mm = ('0' + (d.getMinutes())).slice(-2);
	    return hh + ":" +mm;
	}

	getDateinWords() {
		var date = new Date();
		var dateString = date.toString();
		var dateArray = dateString.split(" ");
		var dayWords, month, day;
		if (dateArray[0] == "Mon") {
			dayWords = "Monday";
		} else if (dateArray[0] == "Tue") {
			dayWords = "Tuesday";
		} else if (dateArray[0] == "Wed") {
			dayWords = "Wednesday";
		} else if (dateArray[0] == "Thu") {
			dayWords = "Thursday";
		} else if (dateArray[0] == "Fri") {
			dayWords = "Friday";
		} else if (dateArray[0] == "Sat") {
			dayWords = "Saturday";
		} else if (dateArray[0] == "Sun") {
			dayWords = "Sunday";
		} 

		if (dateArray[1] == "Jan") {
			month = "January";
		} else if (dateArray[1] == "Feb") {
			month = "February";
		} else if (dateArray[1] == "Mar") {
			month = "March";
		} else if (dateArray[1] == "Apr") {
			month = "April";
		} else if (dateArray[1] == "May") {
			month = "May";
		} else if (dateArray[1] == "Jun") {
			month = "June";
		} else if (dateArray[1] == "Jul") {
			month = "July";
		} else if (dateArray[1] == "Aug") {
			month = "August";
		} else if (dateArray[1] == "Sep") {
			month = "September";
		} else if (dateArray[1] == "Oct") {
			month = "October";
		} else if (dateArray[1] == "Nov") {
			month = "November";
		} else if (dateArray[1] == "Dec") {
			month = "December";
		}

		return dayWords + ", " + month + " " + dateArray[2];
	}

	//get nearest country location based on timezone
	getDefaultLocation(timezone) {
		if (timezone == -11) {
			//American samoa
			return [14.271, 170.132, timezone];
		} else if (timezone == -10) {
			//french polynesia
			return [17.679, 149.406, timezone];
		} else if (timezone == -9.30 || timezone == -9.3 || timezone == -9.5) {
			//Marquesas Islands	
			return [9.781, 139.081, timezone];
		} else if (timezone == -9) {
			//alaska US
			return [64.200, 149.493, timezone];
		} else if (timezone == -8) {
			//caifornia US
			return [36.778, 119.417, timezone];
		} else if (timezone == -7) {
			//arizona US
			return [34.048, 111.093, timezone];
		} else if (timezone == -6) {
			//costarica
			return [9.748, 83.753, timezone];
		} else if (timezone == -5) {
			//columbia US
			return [38.951, 92.3341, timezone];
		} else if (timezone == -4) {
			//brazil
			return [14.235, 51.925, timezone];
		} else if (timezone == -3.30 || timezone == -3.3 || timezone == -3.5) {
			//canada newfoundland
			return [53.135, 57.660, timezone];
		} else if (timezone == -3) {
			//argentina
			return [38.416, 63.616, timezone];
		} else if (timezone == -2) {
			//Brazil (Fernando de Noronha)
			return [3.857, 32.429, timezone];
		} else if (timezone == -1) {
			//Cape Verde
			return [16.538, 23.041, timezone];
		} else if (timezone == 0) {
			//ghana
			return [7.946, 1.023, timezone];
		} else if (timezone == 1) {
			//algeria
			return [28.033, 1.659, timezone];
		} else if (timezone == 2) {
			//egypt
			return [26.820, 30.802, timezone];
		} else if (timezone == 3) {
			//iraq
			return [33.223, 43.679, timezone];
		} else if (timezone == 3.3 || timezone == 3.30 || timezone == 3.5) {
			//iran
			return [32.427, 53.688, timezone];
		} else if (timezone == 4) {
			//united arab emirates
			return [23.424, 53.847, timezone];
		} else if (timezone == 4.3 || timezone == 4.30 || timezone == 4.5) {
			//Afghanistan
			return [33.939, 67.710, timezone];
		} else if (timezone == 5) {
			//pakistan
			return [30.375, 69.345, timezone];
		} else if (timezone == 5.45) {
			//nepal
			return [28.394, 84.124, timezone];
		} else if (timezone == 6) {
			//bangladesh
			return [23.685, 90.356, timezone];
		} else if (timezone == 7) {
			//cambodia
			return [12.565, 104.991, timezone];
		} else if (timezone == 8) {
			//Malaysia
			return [3.153, 101.713, timezone];
		} else if (timezone == 8.3 || timezone == 8.30 || timezone == 8.5) {
			//north korea
			return [40.339, 127.510, timezone];
		} else if (timezone == 9) {
			//south korea
			return [35.907, 127.766, timezone];
		} else if (timezone == 10) {
			//Papua New Guinea
			return [6.315, 143.955, timezone];
		} else if (timezone == 12) {
			//newzealand
			return [40.900, 174.132, timezone];
		} else {
			return [3.153, 101.713, timezone];
		}
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
						document.getElementById("prayer-name").innerHTML = "Fajr " + todayPrayTime.fajr;
						//document.getElementById("ramadan-name").innerHTML = "Sehr " + todayPrayTime.fajr;
						this.countdown("c-countdown", 0, timeDifference);
						//this.ramadanCountdown("c-ramadancountdown", 0, timeDifference);
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
						document.getElementById("prayer-name").innerHTML = "Dhuhr " + todayPrayTime.dhuhr;
						//document.getElementById("ramadan-name").innerHTML = "Iftar " + todayPrayTime.maghrib;
						this.countdown("c-countdown", 0, timeDifference);
						//this.ramadanCountdown("c-ramadancountdown", 0, timeDifference2);
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
						document.getElementById("prayer-name").innerHTML = "Asr " + todayPrayTime.asr;
						//document.getElementById("ramadan-name").innerHTML = "Iftar " + todayPrayTime.maghrib;
						this.countdown("c-countdown", 0, timeDifference);
						//this.ramadanCountdown("c-ramadancountdown", 0, timeDifference2);
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
						document.getElementById("prayer-name").innerHTML = "Maghrib " + todayPrayTime.maghrib;
						//document.getElementById("ramadan-name").innerHTML = "Iftar " + todayPrayTime.maghrib;
						this.countdown("c-countdown", 0, timeDifference);
						//this.ramadanCountdown("c-ramadancountdown", 0, timeDifference2);
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
						document.getElementById("prayer-name").innerHTML = "Isha " + todayPrayTime.isha;
						//document.getElementById("ramadan-name").innerHTML = "Sehr " + todayPrayTime.fajr;
						this.countdown("c-countdown", 0, timeDifference);
						//this.ramadanCountdown("c-ramadancountdown", 0, timeDifference2);
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
	countdown( elementName, minutes, seconds) {
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
		        element.innerHTML = (hours + ':' + twoDigits( mins ) ) + ':' + twoDigits( time.getUTCSeconds());      /*countdown time format*/	
		        setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
		    }
		}
		element = document.getElementById( elementName );
		endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
		updateTimer();
	}

	/////////countdown////////////
	ramadanCountdown( elementName, minutes, seconds) {
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
		  		//ramadancountdown end
		    } else {
		        time = new Date( msLeft );
		        hours = time.getUTCHours();
		        mins = time.getUTCMinutes();
		        element.innerHTML = (hours + ':' + twoDigits( mins ) ) + ':' + twoDigits( time.getUTCSeconds());      /*countdown time format*/	
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
								document.getElementById("dailyVerseEnglish2").textContent = quranVerse[randNum].text;
								//document.getElementById("dailyVerseEnglish2").textContent = quranVerse[randNum].text;
							}else{
								document.getElementById("dailyVerseEnglish2").textContent = quranVerse[randNum-1].text;
								//document.getElementById("dailyVerseEnglish2").textContent = quranVerse[randNum-1].text;
							}

							document.getElementById("ayaVerse2").textContent = "Aya: "+quranVerse[randNum].aya;
							//document.getElementById("ayaVerse2").textContent = "Aya: "+quranVerse[randNum].aya;

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
								document.getElementById("surahTitle2").textContent = "Chapter title: "+response.success.name;
								//document.getElementById("surahTitle2").textContent = "Chapter title: "+response.success.name;
							}
							else {
								

							}
						}.bind(this)
					});
		}
	}

	numberDayofRamadan() {
		var today = globalFunction.getTodayDate(0);
		if (today == "2016-06-06") {
			document.getElementById("ramadanTeaser").innerHTML = "1st ";
		} else {
			var dayDifference = globalFunction.getDateDifferenceInDay("2016-06-06", today);
			if (dayDifference == 2) {
				document.getElementById("ramadanTeaser").innerHTML = dayDifference + "nd ";
			} else if (dayDifference == 3) {
				document.getElementById("ramadanTeaser").innerHTML = dayDifference + "rd ";
			} else {
				document.getElementById("ramadanTeaser").innerHTML = dayDifference + "th ";
			}
		}
	}
	
	componentDidMount() {
		var $ = require ('jquery')
		//Cookies.writeCookie('locationLongitude', "", 3);
		//Cookies.writeCookie('locationLatitude', "", 3);
		//Cookies.writeCookie('locationTimeZone', "", 3);
		//Cookies.writeCookie('dateCookie', "", 3);
		
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
		//this.numberDayofRamadan();
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

		return (
			//<InlineCss namespace="startscreen" stylesheet={styleStartScreen}>
			 <InlineCss namespace="startscreen" stylesheet={css.startScreen(this.props.arabic)}>

<header className="site-header">
	<div className="container">
		<div className="content">
			<h1>{lang(this.props.language, "teaserTitleBegin")}</h1>
			<div className="welcome">
				<p>{lang(this.props.language, "teaserTitleEnd")}</p>
			</div>
			<div className="powered-by">
				<small>{lang(this.props.language, "teasterSoonAvailble")}</small>
				<ul className="list-unstyled">
					<li className="AppStore"><a href="">{lang(this.props.language, "teaserButtonApple")}</a></li>
					<li className="GooglePlay"><a href="">{lang(this.props.language, "teaserButtonGPlay")}</a></li>
				</ul>
			</div>
		</div>
		<div className="splash-image-container">
			<div className="app">
				<div className="screen">

					<div className="toolbar">
						<ul className="list-unstyled">
							<li>
								<i className="fa fa-circle"></i>
								<i className="fa fa-circle"></i>
								<i className="fa fa-circle"></i>
								<i className="fa fa-circle"></i>
								<i className="fa fa-circle-o"></i>
							</li>
							<li>
								<span className="percentage">
									80%
								</span>
								<div className="battery">
									<div className="battery-load"></div>
								</div>
							</li>
						</ul>
					</div>
					<div className="chevron bas">
					<div className="fleche up"></div>
					</div>
					<div className="phone-content">
						<time>{this.state.timeState}</time>
						<date>{this.state.dateEngState}</date>
						<date>{this.state.dateState}</date>
					</div>
					<div className="upcoming-prayer">
						<ul className="list-unstyled">
							<li>
								<span className="prayer-caption">{lang(this.props.language, "teaserMockupPrayerCaption")}</span>
								<div className="prayer-content">
									<span className="prayer-name" id="prayer-name"></span>
									<time id="c-countdown"></time>
								</div>
							</li>
							{/*<li>
								<span className="prayer-caption">{lang(this.props.language, "teaserMockupRamadanReminder")}</span>
								<div className="prayer-content">
									<span className="prayer-name" id="ramadan-name"></span>
									<time id="c-ramadancountdown"></time>
								</div>
							</li>*/}
						</ul>
					</div>
					<div className="ramadan-daily-verse">
						<span>{lang(this.props.language, "teaserMockupVerse")} <span id="ayaVerse2"></span>, {lang(this.props.language, "teaserMockupSurah")} <p id="surahTitle2"></p></span>
						{/*<span><span id="ramadanDay"></span> {lang(this.props.language, "teaserRamadanEvent")}, </span>*/}
						<span id="dailyVerseEnglish2"></span>
					</div>
					<div className="chevron bas">
						<div className="fleche"></div>
					</div>
				</div>
			</div>

		</div>
	</div>
</header>

			</InlineCss>
		);
	}


};

export default StartScreen;