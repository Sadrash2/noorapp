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

class UserChangePassword extends React.Component {

	constructor(args) {
		super(args);
	}

	handleBack(e) {
		this.context.router.push(config.root + "/userprofile");
	}

	handleChange(e) {
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

		var isValid = this.validationCheck(pairs[1]);
		if (isValid == true) {
			let currentPassword = (this.refs.currentpassword.value == "") ? pairs[0] : this.refs.currentpassword.value;
			let newpassword = this.refs.password1.value;
			var email = Cookies.readCookie('user');

			var $ = require ('jquery')
			var opt = {"email": email,
						"password": currentPassword,
						"newpassword": newpassword,
						"format": pairs[1]
						};

			var request =  [
					"Users",
					"changePassword",
					opt];

			var json = JSON.stringify(request);  
			var form_data = new FormData();  
			form_data.append('request', json); 
// console.log(opt);
				$.ajax({
					type: "POST",
					datatype: 'json',
					url: "./app/bridge/enter.php",
					data: form_data,
					cache: false,
					contentType: false,
				    processData: false,
					success: function(data) {
						console.log(data);
						var response = JSON.parse(data);
						if(response.state === 200) {
							var loggedIn = 'true';
							alert("Change Password Successful");
							if(pairs[1] == "0"){
								this.context.router.push(config.root + "/userprofile");

							}
							else{
								if (/Android|BlackBerry/i.test(navigator.userAgent)) { //if android 
									setTimeout(function () { window.location = "https://play.google.com/store"; }, 25);
    								// window.location = " fb://profile "; // testing until the mobile apps are ready to be running
								}

								if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) { //if ios 
									// this.context.router.push(config.root + "/login");
									setTimeout(function () { window.location = "https://itunes.apple.com"; }, 25);
    								// window.location = " fb://profile "; // testing until the mobile apps are ready to be running
    								// window.location = " NoorApp://profile ";
								   	
								}
								else{
    								// alert("Successfully changed password");
									this.context.router.push(config.root + "/login");
								}
							}
						}
						else {
							alert(response.error);
						}
					}.bind(this)
				});
		}
	}

	validationCheck(status) {
		let currentPassword = this.refs.currentpassword.value;
		let password1 = this.refs.password1.value;
		let password2 = this.refs.password2.value;
		var validateFinal = validation.UserChangePassword(currentPassword, password1, password2);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;

		var validChecker = true;
		var allErrorMessage = "";

		//currentpassword
		if(status != "1"){
			if (validArray[0] == false) {
				document.getElementById('c-currentpassword').className='is-required';
				validChecker = false;
				if (messageArray[0] == "Password error: Please enter your Password!") {
					allErrorMessage = allErrorMessage + "Password error: Please enter your Current Password!" + "\n";
				} 
				else if (messageArray[0] == "Password error: Password must be between the length of 4 - 12.") {
					allErrorMessage = allErrorMessage + "Password error: Current Password must be between the length of 4 - 12." + "\n";
				}
				else if (messageArray[0] == "Password error: Password must be Alpha-numeric.") {
					allErrorMessage = allErrorMessage + "Password error: Current Password must be Alpha-numeric." + "\n";
				}
				else {
					document.getElementById('c-currentpassword').className='o-login-input';
				}
			}
		}
		else {
			document.getElementById('c-currentpassword').className='o-login-input';
		}

		//password1
		if (validArray[1] == false) {
			document.getElementById('c-password1').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[1] + "\n";
		} else {
			document.getElementById('c-password1').className='o-form__input';
		}

		//pwd2
		if (validArray[2] == false) {
			document.getElementById('c-password2').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[2] + "\n";
		} else {
			document.getElementById('c-password2').className='o-form__input';
		}	

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {
			alert(allErrorMessage);
			return false;
		}
	}

	verifyUser(){
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;
        if (pairs[0] && pairs[2]){
        var $ = require ('jquery')
			var opt = {"email": pairs[2],
						"password": pairs[0],
						"format": "changePwd"
						};

			var request =  [
					"Users",
					"login",
					opt];

							//console.log(opt);							


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
							Cookies.writeCookie('user', response.success[0].email, 3);
							if(pairs[1] == "1"){
								$('#currentPasswordContainer').hide();
							}else{
								$('#currentPasswordContainer').show();

							}
							
						}
						else {
							alert("Invalid Link!");
							Cookies.writeCookie('loggedIn', 'false', 3);
							Cookies.writeCookie('user', "", 3);

							this.context.router.push(config.root + "/login");

						}
					}.bind(this)
				});
	}
	else{
		alert("Wrong credentials");
	}
	}

	componentDidMount(){
		this.verifyUser();
	}

  render() {
    return (
     	<InlineCss stylesheet={UserChangePassword.css(this.props.arabic)} namespace="UserChangePassword">
     		<div className="o-sendapplication-container">
					<header className="o-sendapplication__header">
						<div className="o-sendapplication-padding">
							<h1 className="c-page__title o-sendapplication__title u-center-alignment">
							Change Your Password
							</h1>
							<p className="c-page__description o-sendapplication__description u-center-alignment">
							Please enter your current password and new password.</p>
						
						</div>
					</header>
					<div className="o-container c-sendapplication__form">
						<div className="o-sendapplication-padding">
							<div className="o-container__content">
								
									<div className="o-container__row" id="currentPasswordContainer">
										<div className="c-form__group">
											<input id="c-currentpassword" className="o-form__input" type="password" placeholder="Current password" ref="currentpassword"/>
										</div>
									</div>
									<div className="o-container__row">
										<div className="c-form__group">
											<input id="c-password1" className="o-form__input" type="password" placeholder="New password" ref="password1"/>
										</div>
									</div>
									<div className="o-container__row">
										<div className="c-form__group">
											<input id="c-password2" className="o-form__input" type="password" placeholder="Confirm password" ref="password2"/>
										</div>
									</div>
									<div className="o-container__row">
										<div className="c-form__group">
											<button type="button" className="c-reset-button o-form__button is-primary is-right" onClick={this.handleChange.bind(this)} >
     										Confirm</button>
										</div>
									</div>
								
							</div>
						</div>
					</div>
				</div>
     		<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `
			.clearfix() {
			  &:before,
			  &:after {
			    content: " ";
			    display: table;
			  }
			  &:after {
			    clear: both;
			  }
			}
			a, button {
				cursor: pointer;
			}
			.u-small-font-size {
				font-size: 1.4rem;
			}
			.is-required {
				display: block;
				width: 100%;
				padding: 12px 12px 8px;
				background-color: white;
				border: 1px solid #C54D4D;
				font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				font-size: 1.4rem;
				font-weight: 600;
				text-indent: 0;
				line-height: 1.42857143;
				color: #746A5A;
				box-shadow: inset 0 2px 1px 0 rgba(197,77,77,0.075);
				transition: border-color .25s ease-in-out;
				-webkit-appearance: none;
			    -moz-appearance: none;
			    appearance: none;
			}
			.c-form__group > label {
				display: block;
				font-size: 1.4rem;
			}
			.o-form__input {
				display: block;
				width: 100%;
				padding: 12px 12px 8px;
				background-color: white;
				border: 1px solid rgba(0,0,0,0.075);
				font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				font-size: 1.4rem;
				font-weight: 600;
				text-indent: 0;
				line-height: 1.42857143;
				color: #746A5A;
				box-shadow: inset 0 2px 1px 0 rgba(0,0,0,0.075);
				transition: border-color .25s ease-in-out;
				-webkit-appearance: none;
			    -moz-appearance: none;
			    appearance: none;
			}
			.o-form__input:focus, select:focus {
				box-shadow: 0px;
  				outline: 0 none;
			}
			.u-select__wrapper {
				position: relative;
				background-color: white;
			}
			.u-select__wrapper > i {
				position: absolute;
				top: 0;
				right: 12px;
				height: 46px;
				line-height: 46px;
				font-size: inherit;
				color: inherit;
				z-index: 0;
			}
			.u-select__wrapper:before {
				display: block;
				position: absolute;
				top: 0;
				right: 0;
				height: 34px;
				width: 34px;
				line-height: 34px;
				font-family: FontAwesome;
				font-size: inherit;
				color: inherit;
				content: "\f107";
			}
			select {
				position: relative;
				display: block;
				width: 100%;
				padding: 12px 21px;
				background-color: transparent;
				border: 1px solid rgba(0,0,0,0.075);
				border-radius: 0;
				font-size: 1.4rem;
				font-weight: 600;
				line-height: 1.42857143;
				color: #746A5A;
				box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
				transition: border-color ease-in-out .15s;
				-webkit-appearance: none;
				-moz-appearance: none;
    			appearance: none;
    			z-index: 1;
			}
			select:hover, select:focus {
				border-color: #E0DDD6;
			}
			.o-form__button {
				margin-top: 0px;
				padding: 12px 12px 8px;
				font-size: 1.4rem;
				font-weight: 600;
				letter-spacing: 0.6px;
				display: block;
				width: 100%;
			}
			button.is-primary {
				border: 0px;
				background-color: #C79269;
				color: white;
			}
			.is-large {
				padding: 23px 32px;
				font-size: 1.9rem;
			}
			.is-block {
				display: block;
				width: 100%;
			}
			.is-left {
				float: left !important;
			}
			.is-right {
				float: right !important;
			}
			& {
				padding-top: 66px;
			}
			& > .o-sendapplication-container header {
				padding: 64px 0;
			}
			& > .o-sendapplication-container header >.o-sendapplication-padding h1 {
				margin-bottonm: 32px;
				font-size: 2.4rem;
				line-height: 33px;
				font-weight: 500;
				letter-spacing: 0.57px;
			}
			& > .o-sendapplication-container header >.o-sendapplication-padding p {
				font-size: 2.0rem;
				line-height: 28px;
			}
			& div.o-container__content > section.o-container__section {
			}
			& div.o-container__content > section.o-container__section:first-child {
				background-color: #F2F0ED;
			}
			& div.o-container__content > section.o-container__section:nth-child(2) {
				border-bottom: 1px solid #F2F0ED;
			}
			& section.o-container__section {
				padding-top: 50px;
				padding-bottom: 50px;
				padding-right: 300px;
				padding-left: 300px;
			}
			& section.o-container__section > h3 {
				margin-bottom: 16px;
				font-size: 2.0rem;
				line-height: 23px;
				color: black;
				font-weight: 500;
			}
			.c-form__group {
				margin-bottom: 32px;
			}
			.o-upload__field {
				padding: 16px 23px;
				background-color: #E0DDD6;
				font-size: 1.4rem;
				font-weight: 600;
				cursor: pointer;
				transition: opacity .25s ease-in-out;
			}
			.is-required_upload_field {
				padding: 15px 22px;
				background-color: #E0DDD6;
				font-size: 1.4rem;
				font-weight: 600;
				cursor: pointer;
				transition: opacity .25s ease-in-out;
				border: 1px solid #C54D4D;
				transition: border-color .25s ease-in-out;
			}
			.o-upload__field:hover {
				opacity: 0.75;
			}
			.o-upload__field > i {
				margin-right: 16px;
			}
			footer.o-container__footer {
				padding: 23px;
			}
			@media (min-width: 768px) {
				& > .o-sendapplication-container header >.o-sendapplication-padding h1 {
					font-size: 3.6rem;
					line-height: 48px;
					letter-spacing: 0.85px;
				}
				& > .o-sendapplication-container .c-sendapplication__form >.o-sendapplication-padding .o-container__content {
					background-color: white;
					box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
				}
				& > .o-sendapplication-container .c-sendapplication__form {
					padding: 0;
				}
				.o-half__row {
					width: 50% !important;
				}
				.o-half__row > .c-form__group {
					width: 100% !important;
				}
				.o-container__row {
					display: flex;
					flex-flow: row wrap;
					justify-content: space-between;
				}
				.o-container__row > .c-form__group {
					width: 100%;
				}
				.o-container__row > .c-form__group2 {
					width: 49;
				}
				.has-three-elements > .c-form__group {
					width: 32% !important;
				}
			}
		` + functions.responsivePadding(".o-sendapplication-padding");

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

UserChangePassword.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default UserChangePassword;