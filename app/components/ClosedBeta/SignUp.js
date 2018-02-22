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
import toastr from 'toastr';

var betaEmail, token;
class SignUp extends React.Component {
	_handlePasswords(e){
		var $ = require ('jquery')
		var pass=this.refs.pass.value;
		var pass_repeat =this.refs.pass_repeat.value;
		var validateFinal = validation.PasswordsValidation(pass, pass_repeat);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;
		var validChecker = true;
		var allErrorMessage = "";
		// pass
		if (validArray[0] == false) {
			document.getElementById('c-pass').className='is-required';
			validChecker = false;

			$('#c-pass').parent().parent().find('.alert').html(messageArray[0]);
			$('#c-pass').parent().parent().find('.alert').show();
			// $('#c-pass').parent().find('.alert_success').hide();

		} else {
			document.getElementById('c-pass').className='required_success c-pass c-input ';
			$('#c-pass').parent().parent().find('.alert').hide();
			// $('#c-pass').parent().find('.alert_success').show();
			// $('#c-pass').parent().find('.alert_success').html('Correct password entered');
		}
		// pass_r
		if (validArray[1]!=undefined){
			if (validArray[1] == false) {
				document.getElementById('c-pass_repeat').className='is-required';
				validChecker = false;
				$('#c-pass_repeat').parent().parent().find('.alert_success').hide();
				$('#c-pass_repeat').parent().parent().find('.alert').show();
				$('#c-pass_repeat').parent().parent().find('.alert').html(messageArray[1]);
			} else {
				document.getElementById('c-pass_repeat').className='required_success c-pass_repeat c-input ';
				$('#c-pass_repeat').parent().parent().find('.alert').hide();
				$('#c-pass_repeat').parent().parent().find('.alert_success').show();
				$('#c-pass_repeat').parent().parent().find('.alert_success').html('Correct combination');
			}
		}
		// }

	}

	_handleStart(e){
		var $ = require ('jquery')
		var isValid = this.validateForm();
		if (isValid == true) { //if validation is true for all fields
			var email = this.refs.email.value;
			var opt={"email": this.refs.email.value,
			"password": this.refs.pass.value};
			addUsers = addUsers.bind(this);
			call.passFormData("Users","add",opt,addUsers);
		}

		function addUsers(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					//if user_data DB doesnt have data then do this.
						var request =  [
							"UserData",
							"add",
							betaEmail];
						$.ajax({
							type: "POST",
							datatype: 'json',
							url: "./app/bridge/enter.php",
							data: {request},
							cache: false,
							success: function(data) {
								var response = JSON.parse(data);
								if(response.state === 200) {
									var opts = { "steps": 1, "email": betaEmail}
									globalBetaFunction.editSteps(opts);
									this.context.router.push(config.root + "/NDA?email="+betaEmail+"&token="+token);
								} else {						
									
								}
							}.bind(this)
						});
				}
				else if(response.state === "3003") {
  					toastr.info('An account with this email already exists');
					//this.context.router.push(config.root + "/login?email="+email);
					return;
				}
			}
	}

	validateForm() { //validate signup form
		var email = this.refs.email.value;
		var pass = this.refs.pass.value;
		var pass_repeat = this.refs.pass_repeat.value;	
		var validateFinal = validation.signup_validation(email, pass, pass_repeat);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;
		var validChecker = true;
		var allErrorMessage = "";

		var $ = require ('jquery')
		
		/*'is-required = error' 'o-profileform__input = success'*/
		// email
		if (validArray[0] == false) {
			document.getElementById('c-email').className='is-required';
			validChecker = false;
			$('#c-email').parent().find('.alert').html(messageArray[0]);
			$('#c-email').parent().find('.alert').show();

		} else {
			document.getElementById('c-email').className='c-email c-input';
			$('#c-email').parent().find('.alert').hide();

		}

		//firstName
		if (validArray[1] == false) {
			document.getElementById('c-pass').className='is-required';
			validChecker = false;
			$('#c-pass').parent().find('.alert').html(messageArray[1]);
			$('#c-pass').parent().find('.alert').show();

		} else {
			document.getElementById('c-pass').className='c-pass c-input';
			$('#c-pass').parent().find('.alert').hide();

		}

		//lastName
		if (validArray[2] == false) {
			document.getElementById('c-pass_repeat').className='is-required';
			$('#c-pass_repeat').parent().find('.alert').show();
			$('#c-pass_repeat').parent().find('.alert').html(messageArray[2]);

			validChecker = false;
			// $('#fallbackmessage').append('<li>'+ messageArray[2] + '</li>');
		} else {
			$('#c-pass_repeat').parent().find('.alert').hide();

			document.getElementById('c-pass_repeat').className='c-pass_repeat c-input';
		}

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {
			return false;
		}
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
						//
						if (array[0].steps == 1) {
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
						} else if (array[0].steps == 5) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 6) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
						}

						comparefunction=comparefunction.bind(this);
						globalBetaFunction.compareTimeExpired(array[0].email, comparefunction);
						function comparefunction(data) {
							if (data == "timeremain") {
								var $ = require('jquery')
								$ ('#c-email').val(array[0].email);
								
							} else {
								this.timeout();
							}
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
		this.retrieveMacFunction();
   	}
	
   	retrieveMacFunction () { //1 phone && 1 desktop , specific browsers
   		var $ = require ('jquery')	
		$('.c-email').val(betaEmail);
		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?
		
   	}

   	viewTextPassword(e){
   		var obj = document.getElementById('c-'+e.target.id);
  		obj.type = "text";
   	}

   	viewHiddenPassword(e){
   		var obj = document.getElementById('c-'+e.target.id);
  		obj.type = "password";
   	}

  render() {
		var $ = require ('jquery')
    return (
     	<InlineCss stylesheet={SignUp.css(this.props.arabic)} namespace="SignUp">
     		<div className="" id="fallbackmessage"></div>  
     		<div className="o-background-color"></div>  
     		<div className="o-signup-container">   			
     			<div className="o-signup-form">
	     			<header>   				
	     				<h2 className="o-heading-singup">Thank you for participating in the NOOR closed beta!</h2>
	     			</header>
	     			<div className="o-signup-main">   
	     			<ul>				
	     				<li><label>{lang(this.props.language, "signupElementEmail")}</label><input id="c-email" className="c-email c-input" ref="email" type="o-text" readOnly/><div className="alert text-danger"></div></li>
	     				<li><label>{lang(this.props.language, "signupElementPassword")}</label>
	     				<div className="u-pass_wrapper">
		     				<input id="c-pass" className="c-pass c-input c-password_input" ref="pass" type="password" onChange={this._handlePasswords.bind(this)}/>
							<i className="fa fa-eye c-eye" id="pass" onMouseOver={this.viewTextPassword.bind(this)} onMouseOut={this.viewHiddenPassword.bind(this)}></i>
	     				</div>
						<div className="alert text-danger"></div><div className="alert_success text-success"></div></li>
						<li><label>{lang(this.props.language, "signupElementConfirm")}</label>
	     				<div className="u-pass_wrapper">
		     				<input id="c-pass_repeat" className="c-pass_repeat c-input c-password_input" ref="pass_repeat" type="password" onChange={this._handlePasswords.bind(this)}/>
							<i className="fa fa-eye c-eye" id="pass_repeat" onMouseOver={this.viewTextPassword.bind(this)} onMouseOut={this.viewHiddenPassword.bind(this)}></i>
	     				</div>
						<div className="alert text-danger"></div><div className="alert_success text-success"></div></li>

	     			</ul>
	     			<div className="o-button-wrapper">
	     					<button type="button" id="c-start-button" className="c-start-button" onClick={this._handleStart.bind(this)}>Start</button>
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
				.u-pass_wrapper {
					display: flex;
					position: relative;
				}
				.c-password_input {
					display: block;
				    width: 100%;
				    padding: 12px 12px 8px;
				    background-color: transparent;
				    border: 1px solid rgba(0,0,0,0.075);
				    border-radius: 0;
				    font-size: 1.4rem;
				    font-weight: 600;
				    line-height: 1.42857143;
				    color: #746A5A!important;
				    box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
				    transition: border-color ease-in-out .15s;
				    -webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				}
				.c-eye {
					position: absolute;
				    top: 0;
				    right: 12px;
				    height: 46px;
				    line-height: 46px;
				    font-size: inherit;
				    color: inherit;
				    z-index: 1;
				}
				.required_success{
					border: 1px solid green;
				}
				.is-required{
					width: 100%;
					padding: 2%; 
					font-size: 1em;
					border: 1px solid #DDDDDD;
					outline: none;
					border-color:red;
				}
				.o-heading-singup {
					line-height: normal;
					font-size: xx-large;
					font-weight: 500;
				}
				.c-input {
					width: 100%;
					padding: 2%; 
					font-size: 1em;
					border: 1px solid #DDDDDD;
					outline: none;
				}

				.o-button-wrapper {
					text-align: center;
				}

				.c-start-button {
					background-color: #C79269;
					color: white;
					border:none;
					font-size: 1.2em;
					outline: none;
					width: 100%;
					padding: 1em 0;
					padding-left:0;
				}
				.c-start-button:hover {
					background-color: #DBA982;
				}

				ul { 
					list-style:none;
					color: rgb(160,160,160);
				}

				li {
					margin-bottom: 0.7em;
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

				& > .o-signup-container .o-signup-form label {
					color: #746A5A;
					font-size: 0.8em;
					line-height: 2.5em;
				}

				& > .o-signup-container {
					padding: 4% 0;	
					max-width: 500px;
					margin: 0 auto;
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
					font-size:12px;
				}
				.text-success{
					color:green;
					font-size:12px;
				}

				@media screen and (min-width:0\0) {
						.c-start-button {
							padding-left:45%;
						}
						
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 280px) and (max-width: 767px) {
					& > .o-signup-container {
						padding: 5% 12% 5%;	
					}
					.o-button-wrapper {
						margin: 0;
					}
					@media screen and (min-width:0\0) {
						.c-start-button {
							padding-left:40%;
						}
						
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					
					.o-button-wrapper {
						margin: 0;
					}
				}

				

				
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

SignUp.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default SignUp;