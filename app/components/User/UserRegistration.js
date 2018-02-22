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
import validation from "../../components/GlobalValidation";
import call from "../../components/apiCall";
import Cookies from "../../components/Cookies";
import css from "./userCss";

var $ = require('jquery');

class UserRegistration extends React.Component {

	constructor(args) {
		super(args);
	}

	_handleSubmit(e){
		var isValid = this.validateForm();
		if (isValid == true) {
			//form validation success
			let firstName = this.refs.firstname.value;
			let lastName = this.refs.lastname.value;
			let email = this.refs.email.value;
			let password = this.refs.password1.value;
			let role = 1;

			var opt = {"firstName": firstName,
						"lastName": lastName,
						"email": email,
						"password": password,
						"role": role
					}

			var successMsg = lang(this.props.language, "userRegistrationFallbackSuccess");
			var activateMsg = lang(this.props.language, "userRegistrationFallbackActivation");
			var invalidMsg = lang(this.props.language, "userRegistrationFallbackInvalid");

			var request =  [
						"Users",
						"add",
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
							call.passRequest("Users","fetch",email,function(data){
								var response = JSON.parse(data);
								$('#fallbackcontainer').hide();
								var linkEmail = "http://noor.me/activation#active&"+response.success.email+"&"+response.success.password;
								
								var data = {"email":response.success.email,
											"firstName":response.success.firstName,
											"linkEmail":linkEmail,
											"format":"new"};

								sendMail(data);
								addUserData(email);
								$('#fallbackmessage li').remove();

								$('#fallbackcontainer').addClass('success');
								$('#fallbackheader').text("Successful:");
								$('#fallbackcontainer').show();
								$('html, body').animate({
					                scrollTop: 0
					            }, 0);
								$('#fallbackmessage').append('<li>'+successMsg+'</li>');
								$('#fallbackmessage').append('<li>'+activateMsg+'</li>');
								$('#registrationform').toggle("slide");
							});

							

						}
						else {
							$('#fallbackmessage li').remove();
							$('#fallbackcontainer-invites').show();
							$('#fallbackmessage').append('<li>'+lang(this.props.language, "userRegistrationFallbackExisting")+'</li>');
							$('html, body').animate({
							    scrollTop: 0
							}, 0);
							$('#fallbackheader').text("Error:");
							$('#fallbackcontainer-invites').removeClass('success');
						}
					}.bind(this)
					 });
			}

			function sendMail(opt){

				var request =  [
						"Users",
						"sendMail",
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
							} else {
								$('#fallbackmessage li').remove();
								$('#fallbackcontainer-invites').show();
								$('#fallbackmessage').append('<li>'+invalidMsg+'</li>');
								$('html, body').animate({
								    scrollTop: 0
								}, 0);
								$('#fallbackheader').text("Error:");
								$('#fallbackcontainer-invites').removeClass('success');
							}
						}.bind(this)
					});
			}

			function addUserData(opt){

				var request =  [
						"QuranMain",
						"add",
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
							} 
						}.bind(this)
					});
			}
	}

	validateForm() {
		var firstName = this.refs.firstname.value;
		var lastName = this.refs.lastname.value;
		var email = this.refs.email.value;
		var password1 = this.refs.password1.value;
		var password2 = this.refs.password2.value;
		
		var validateFinal = validation.UserRegistrationValidation(firstName, lastName, email, password1, password2);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;

		var validChecker = true;
		var allErrorMessage = "";
		$('#fallbackmessage li').remove();
		
		/*'is-required = error' 'o-form__input = success'*/
		//firstName
		if (validArray[0] == false) {
			document.getElementById('c-firstname').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[0] + '</li>');
		} else {
			document.getElementById('c-firstname').className='o-form__input';
		}

		//lastName
		if (validArray[1] == false) {
			document.getElementById('c-lastname').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[1] + '</li>');
			
		} else {
			document.getElementById('c-lastname').className='o-form__input';
		}

		//email
		if (validArray[2] == false) {
			document.getElementById('c-email').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[2] + '</li>');
			
		} else {
			document.getElementById('c-email').className='o-form__input';
		}

		//pwd1
		if (validArray[3] == false) {
			document.getElementById('c-password1').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[3] + '</li>');
		} else {
			document.getElementById('c-password1').className='o-form__input';
		}

		//pwd2
		if (validArray[4] == false) {
			document.getElementById('c-password2').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[4] + '</li>');
		} else {
			document.getElementById('c-password2').className='o-form__input';
		}

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {
			$('#fallbackcontainer').show();
			$('html, body').animate({
			    scrollTop: 0
			}, 0);
			$('#fallbackheader').text("Error:");
			$('#fallbackcontainer').removeClass('success');
			return false;
		}
	}
	handleBack(e) {
		this.context.router.push(config.root + "/login");
		$('#fallbackcontainer').hide();
	}

	componentDidMount() {
		var $ = require ('jquery')
		$('#fallbackcontainer').hide();
	}

	render() {
		
		return (	
			<InlineCss stylesheet={css.userRegistrationContent(this.props.arabic)} namespace="UserRegistration">
				<div className="o-registration-container">					
					<header className="o-registration__header">
						<div className="o-registration-padding">
							<h1 className="c-page__title o-registration__title u-center-alignment">
							{lang(this.props.language, "userRegistrationTitle")}
							</h1>
							<p className="c-page__description o-registration__description u-center-alignment">
							{lang(this.props.language, "userRegistrationDescription")}</p>
							<p><a onClick={this.handleBack.bind(this)}>Back to login</a></p>
						</div>
					</header>
					<div className="o-container c-registration__form">
						<div className="o-registration-padding">
							<div className="o-fallback-container" id="fallbackcontainer">
			     				<h3 id="fallbackheader"></h3>
			     				<div className="o-fallback-message">
			     					<ul className="c-fallback-results" id="fallbackmessage">
			     						<li>
			     						</li>
			     					</ul>
			     				</div>
			     			</div>
							<div className="o-container__content" id="registrationform">
								<section className="o-container__section">
									<div className="o-container__row">
										<div className="c-form__group">
											<label htmlFor="c-firstname">{lang(this.props.language, "userRegistrationElementFirstName")}</label>
											<input id="c-firstname" className="o-form__input" type="text" ref="firstname" />
										</div>
										<div className="c-form__group">
											<label htmlFor="c-lastname">{lang(this.props.language, "userRegistrationElementLastName")}</label>
											<input id="c-lastname" className="o-form__input" type="text" ref="lastname" />
										</div>										
									</div>
									<div className="o-container__row has-three-elements">

									{/*
										<div className="c-form__group">
											<label htmlFor="c-gender">{lang(this.props.language, "userRegistrationElementGender")}</label>
											<div className="u-select__wrapper">
												<select id="c-gender" className="c-selection has-dropdown" ref="gender">
												</select>
												<i className="fa fa-angle-down"></i>
											</div>
										</div>
										*/}
										<div className="c-form__group">
											<label htmlFor="c-email">{lang(this.props.language, "userRegistrationElementEmail")}</label>
											<input id="c-email" className="o-form__input" type="text" ref="email" />
										</div>
										<div className="c-form__group">
											<label htmlFor="c-password1">{lang(this.props.language, "userRegistrationElementPassword")}</label>
											<input id="c-password1" className="o-form__input" type="password" ref="password1" />
										</div>
										<div className="c-form__group">
											<label htmlFor="c-password2">{lang(this.props.language, "userRegistrationElementPasswordConfirmation")}</label>
											<input id="c-password2" className="o-form__input" type="password" ref="password2" />
										</div>										
									</div>
								</section>
								
								
								<footer className="o-container__footer">
									<div className="o-container__row">
										<button type="button" className="c-submit o-form__button is-primary is-right" onClick={this._handleSubmit.bind(this)} >
										{lang(this.props.language, "userRegistrationControlSignUp")}</button>
									</div>
								</footer>
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

};

UserRegistration.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserRegistration;