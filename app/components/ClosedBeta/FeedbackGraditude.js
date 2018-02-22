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
import globalFunction from "../../components/GlobalFunction";
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";
import call from "../../components/apiCall";
var betaEmail, token, isTimeOut = false;
class FeedbackGratitude extends React.Component {

	exit() {
		this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
		isTimeOut = true;
	}

	componentDidMount() {
		var $ = require('jquery')
		$('#UserCPMenu').addClass('logout');
		$('.c-application-button').css('display','none');
		var url = window.location.search;
		if(url != "") {
			var queryStart = url.indexOf("?") + 1;
        	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
        	var query = url.slice(queryStart, queryEnd - 1);
        	var pairs = query.replace(/\+/g, " ").split("&");
        	if (pairs[0] == "" || pairs[1] == "" || pairs[0] == null || pairs[1] == null) {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
	        	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
	        	parms = {}, i, n, v, nv;
	        	betaEmail = emailPairs[1];
	        	token = tokenPairs[1];
	        	betaEmail = betaEmail.replace("%40","@");
	        	getUserData=getUserData.bind(this);
	        	var dataArray = { "email": betaEmail, "token": token}
	        	globalBetaFunction.getUserEmailToken(dataArray, getUserData);
	        	function getUserData(data){
	        		var response = JSON.parse(data);
					if(response.state === 200) {
						var array = response.success;
						comparefunction=comparefunction.bind(this);
						globalBetaFunction.compareTimeExpired(betaEmail, comparefunction);
						function comparefunction(data) {
							if (data == "timeremain") {
								compareStartfunction=compareStartfunction.bind(this);
								globalBetaFunction.compareTimeStart(betaEmail, compareStartfunction);
								
							} else {
								this.timeout();
							}
        					this.callApi();

						}
						function compareStartfunction(data) {
							if (data == "timeremain") {

							} else {
								this.timeout();
							}
						}
						if (array[0].steps == 0) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/SignUp?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 1) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/NDA?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 2) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/BetaRegisteration?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 3) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/StartSession?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 4) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/AboutPage?email="+betaEmail+"&token="+token);
						}				
					}
					else {
						this.exit();
					}
	        	} 
        	}
	        	
   		} else {
			this.exit();
		}
        $('#UserCPMenu').addClass('logout');
		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?

	}

	callApi() {
		var opt = {"email":betaEmail,"token":token}
		call.passFormData("BetaUserData","fetch",opt,function(data) {
			var response = JSON.parse(data);
			var enddate = new Date(response.success[0].timeexpired*1000);
			var startdate = new Date(response.success[0].timestart*1000);

			var deadline = calcTime(enddate, startdate);
			var clock = document.getElementById("countdown");
			var $ = require('jquery')
			if(deadline != 0 && isTimeOut == false) {
				$("button").css('display','block');
				$("#notice").css('display','none');
				var timeinterval = setInterval(function(){
					var t = getTimeRemaining(deadline);
					clock.innerHTML = t.hours + 'hrs ' +
					                  t.minutes + 'min ' +
					                  t.seconds + 'sec';
					if(t.total<=0){
						$("button").css('display','none');
						$("#notice").css('display','block');
						clock.innerHTML = '00hrs ' +
					                 	  '00min ' +
					                	  '00sec';
					}
				},1000);
			}else {
				$("button").css('display','none');
				$("#notice").css('display','block');
				clock.innerHTML = '00hrs ' +
					              '00min ' +
					              '00sec';
			}
			

			function calcTime(endtime,starttime) {
				var t = Date.parse(endtime) - Date.parse(starttime);
				var seconds = Math.floor( (t/1000) % 60 );
				var minutes = Math.floor( (t/1000/60) % 60 );
				var hours = Math.floor( (t/(1000*60*60)) % 24 );
				var days = Math.floor( t/(1000*60*60*24) );
				hours = hours + (days*24)

				if (hours > 96) {
					return endtime;
				} else {
					
					var s = Date.parse(new Date()) - Date.parse(starttime);
					var seconds = Math.floor( (s/1000) % 60 );
					var minutes = Math.floor( (s/1000/60) % 60 );
					var hours = Math.floor( (s/(1000*60*60)) % 24 );
					var days = Math.floor( s/(1000*60*60*24) );
					hours = hours + (days*24)
					if (hours > 72){
						var value = 0;
						return value;
					}else {
						var s = Date.parse(starttime) - Date.parse(new Date());
						var seconds = Math.floor( (s/1000) % 60 );
						var minutes = Math.floor( (s/1000/60) % 60 );
						var hours = Math.floor( (s/(1000*60*60)) % 24 );
						hours = hours + 72;
						var time = starttime.getTime();
						time += (72*60*60*1000);
						var deadline = new Date(time);

						return deadline;
					}
				}
			}

			function getTimeRemaining(endtime){
				var t = Date.parse(endtime) - Date.parse(new Date());
				var seconds = Math.floor( (t/1000) % 60 );
				var minutes = Math.floor( (t/1000/60) % 60 );
				var hours = Math.floor( (t/(1000*60*60)) % 24 );
				var days = Math.floor( t/(1000*60*60*24) );
				hours = hours + (days*24);

				return {
				  'hours': hours,
				  'minutes': minutes,
				  'seconds': seconds
				};
			}
		})
	}

	continue(e) {
		this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
	}

  render() {
    return (
     	<InlineCss stylesheet={FeedbackGratitude.css(this.props.arabic)} namespace="FeedbackGratitude">
     		<div className="o-background-color"></div>  
     		<div className="o-graditude-container">
     			<div className="o-graditude-form">
	     			<header>   				
	     				<h3>Thank You For Participating</h3>
	     			</header>
	     			<label className="c-label">Time Left</label>
	     			<label className="c-countdown" id="countdown"></label>
	     			<label className="c-notice" id="notice">Your session has ended.</label>
	     			<button className="is-continue" onClick={this.continue.bind(this)}>Continue</button>
     			</div>
     		</div>
     		
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `

				& {
					padding-top: 65px;
				}

				.o-graditude-form > button {
					border: none;
					outline: none;
					padding: 12px 0;
					width: 27%;
					font-size: 1.5rem;
					line-height: 1.427;
					display:none;
				}

				.c-label {
					font-size: 1.em;
					padding-top: 6em;
					padding-bottom: 1em;
					color: #BBBBBB;
				}

				.c-notice {
					margin-top: 1em;
					display:none;
				}

				.c-countdown {
					font-size: 3rem;
					font-weight: 600;
					border: 1px solid #CFA482;
					border-radius: 3px;
					padding: 0.5em;
					line-height: 1.5em;
					text-align: center;
					color: #CFA482;
				}

				button.is-continue {
					margin-top: 5em;
					background-color: #5FB35D;
					color: white;
				}

				button.is-logout {
					background-color: #4d4d4d;
					color: white;
				}

				.o-background-color {
					background-color: #ECE8E1;
					width: 100%;
					height: 30em;
    				z-index: -1;
    				position: absolute;
				}	
				& > .o-graditude-container .o-graditude-form {
					padding: 4em;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color:white;
					box-shadow: 0px 1px 3px #999999;
					align-items: center;
				}

				& > .o-graditude-container {
					padding: 5% 22% 5%;		
				}

				.o-graditude-form > header > h3 {
					font-weight: 600;
					font-size: 2.0em;
					line-height: 1em;
					color: #4D4D4D;
					text-align: -webkit-center;
					text-align: center;
					text-align: -moz-center;
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 280px) and (max-width: 767px) {
					& > .o-graditude-container {
						padding: 5% 12% 5%;		
					}

					button.is-continue {
						width: 100%;
						margin-top: 1em;
					}

					button.is-logout {
						width: 100%;
					}

					.c-label {
						padding-top: 1em;
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-graditude-container {
						padding: 5% 22% 5%;		
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

FeedbackGratitude.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default FeedbackGratitude;