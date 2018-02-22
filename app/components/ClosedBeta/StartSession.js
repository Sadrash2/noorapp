import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import config from "../../config";
import globalFunction from "../../components/GlobalFunction";
import functions from "../../scss/styleFunctions";
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";

var betaEmail, token;
class StartSession extends React.Component {

	handleBegin(e) {
		//add Time start to db
		addBetaUser=addBetaUser.bind(this);
		globalBetaFunction.addBetaUserTimeStart(betaEmail, addBetaUser);
		function addBetaUser(data) {
			var response = JSON.parse(data);
			if(response.state === 200) {
				var opts = { "steps": 4, "email": betaEmail}
				globalBetaFunction.editSteps(opts);
				this.context.router.push(config.root + "/AboutPage?email="+betaEmail+"&token="+token);
			}
		}
		
		//globalBetaFunction.compareTimeStart("manvee@noor.me");
	}

	exit() {
		this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
		this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}

	componentDidMount() {
		var $ = require('jquery')
		$('.c-application-button').css('display','none');
        $('#UserCPMenu').addClass('logout');

		var url = window.location.search;
		if(url != "") {
			var queryStart = url.indexOf("?") + 1;
        	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
        	var query = url.slice(queryStart, queryEnd - 1);
        	var pairs = query.replace(/\+/g, " ").split("&");

        	if (pairs[0] == "" || pairs[1] == "" || pairs[0] == null || pairs[1] == null) {
        		this.exit();
        	}  else {
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
						} else if (array[0].steps == 4) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/AboutPage?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 5) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 6) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
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
		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?

	}


  render() {
    return (
     	<InlineCss stylesheet={StartSession.css(this.props.arabic)} namespace="StartSession">
     		<div className="o-background-color"></div>  
     		<div className="o-welcome-container">   			
     			<div className="o-welcome-form">
	     			<header>   				
	     				<h3>Before we start...</h3>
	     			</header>
	     			<div className="o-welcomemain-wrapper">
	     				<ul>
	     					<li>The first beta session will be open for one week.</li>
	     					<li>Once you sign up, you have 72 hours to complete your session.</li>
	     					<li>You can use a maximum of two devices; one computer and one mobile device.</li>
	     					<li>We will ask you some questions during the session.</li>
	     					<li>Most importantly, you can save or submit your feedback at any time during your 72 hours.</li>
	     					<li>Please remember we are still in the development phase of the app. There will be errors, faults and bugs.</li>
	     					<li>Please do not share any info about NOOR with anyone.</li>
	     				</ul>
	     				<div className="o-button-wrapper">
	     					<button type="button" id="c-begin-button" className="c-begin-button" onClick={this.handleBegin.bind(this)} >Let's begin</button>
	     				</div>
	     				
	     			</div>
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

				.o-button-wrapper {
					margin-top: 2em;
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					text-align:center;
				}

				.c-begin-button {
					display:inline-block;
					background-color:rgb(95, 179, 93);
					color: white;
					border:none;
					font-size: 1.2em;
					outline:none;
					padding: 1em 5em;
				}
				.c-begin-button:hover {
					background-color:rgb(75, 159, 73);
				}

				ul { 
					list-style:none;
					color: #4D4D4D;
					font-weight: 400;
				}

				li {
					padding-bottom: 0.8em;
					margin-top: 0.5em;
					border-bottom: 1px solid rgba(0,0,0,0.1);
				}
				.o-welcomemain-wrapper {
					width:100%;
					height: auto;
					font-size:1.0em;
					font-weight: 500;
					text-align: center;
				}
				.o-background-color {
					background-color: #ECE8E1;
					width: 100%;
					height: 30em;
    				z-index: -1;
    				position: absolute;
				}	
				& > .o-welcome-container .o-welcome-form {
					padding: 8% 5% 8% 5%;
					padding: 2em;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color:white;
					box-shadow: 0px 1px 3px #999999;
				}

				& > .o-welcome-container {
					padding: 5% 22% 5%;		
				}

				.o-welcome-form > header > h3 {
					font-weight: 500;
					font-size: 2em;
					color: #4D4D4D;
					line-height: 1em;
					margin-bottom: 1em;
					text-align: center;
				}

				.o-welcome-form > p {
					word-wrap: break-word;
					width: 100%;
					
					margin-bottom: 10%;
					text-align: center;
					text-align: -webkit-center;
					text-align: -moz-center;
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 280px) and (max-width: 767px) {
					& > .o-welcome-container {
						padding: 5% 12% 5%;		
					}
					.c-begin-button {
						padding: 1em;
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-welcome-container {
						padding: 5% 22% 5%;		
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

StartSession.contextTypes = {
    router: React.PropTypes.object.isRequired,
};


export default StartSession;