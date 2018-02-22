import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import globalFunction from "../../components/GlobalFunction";
import validation from "../../components/GlobalValidation";
import config from "../../config";
import functions from "../../scss/styleFunctions";
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";
import call from "../../components/apiCall";

var betaEmail, token;
class Unsubscribe extends React.Component {
	

	exit() {
		this.context.router.push(config.root + "/NotFound");
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
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
	        	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
	        	parms = {}, i, n, v, nv;
	        	betaEmail = emailPairs[1];
	        	token = tokenPairs[1];
	        	betaEmail = betaEmail.replace("%40","@");
	        	//
	        	
	        	getUserData=getUserData.bind(this);
	        	var dataArray = { "email": betaEmail, "token": token}
	        	globalBetaFunction.getUserEmailToken(dataArray, getUserData);
	        	function getUserData(data){
	        		var response = JSON.parse(data);
					if(response.state === 200) {
						
					}
					else {
						this.exit();
					}
	        	} 
        	}
   		} else {
			this.exit();
		}
		
   	}

  render() {
    return (
     	<InlineCss stylesheet={Unsubscribe.css(this.props.arabic)} namespace="Unsubscribe">
     		<div className="o-background-color"></div>  
     		<div className="o-signup-container">   			
     			<div className="o-signup-form">
	     			<header>   				
	     				<h2 className="o-heading-singup">Unsubscribe Successful</h2>
	     			</header>
	     			<div className="o-signup-main">   
	     			<ul>				
	     				<li><p>Sorry to see you go!</p></li>
	     				<li><p>Your subscription had been successfully removed from the email list.</p></li>
	     			</ul>
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

				ul { 
					list-style:none;
					color: rgb(160,160,160);
				}

				li {
					margin-bottom: 0.7em;
					text-align: center;
				}
				
				.o-signup-main {
					width:100%;
					height: auto;
					font-size:1.0em;
					font-weight: 500;
				}
				.o-background-color {
					background-color: #ECE8E1;
    				width: 100%;
    				height: 30em;
    				z-index: -1;
    				position: absolute;
				}	
				& > .o-signup-container .o-signup-form {
					padding: 2em;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color: white;
					box-shadow: 0px 1px 3px #999999;
				}

				& > .o-signup-container .o-signup-form p {
					color: #4d4d4d;
					font-size: 1em;
				}

				& > .o-signup-container {
					padding: 4% 25%;	
				}

				.o-signup-form > header > h2 {
					font-weight: 500;
					font-size: 2.0em;
					color: #4D4D4D;
					line-height: 1.4em;
				}

				.o-signup-form > p {
					word-wrap: break-word;
					width: 100%;
					
					margin-bottom: 10%;
					text-align: center;
					text-align: -webkit-center;
					text-align: -moz-center;
				}
				.text-danger{
					color:red;
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 280px) and (max-width: 767px) {
					& > .o-signup-container {
						padding: 5% 12% 5%;	
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-signup-container {
						padding: 5% 22% 5%;		
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

Unsubscribe.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default Unsubscribe;