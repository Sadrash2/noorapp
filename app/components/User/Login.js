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
import Cookies from "../../components/Cookies";
import css from "./userCss";

class Login extends React.Component {

	constructor(args) {
		super(args);
	}

	//signup button onclick
	handleSignup() {
		this.context.router.push(config.root + "/userregistration");
	}

	//forgetPassword button onclick
	handleForgetPassword(e) {
		this.context.router.push(config.root + "/ForgetPassword");
	}

	//login button onclick
	handleLogin() {
		var isValid = this.validateInput();
		if (isValid == true) {
			var email = this.refs.email.value;
			var password = this.refs.password.value;
			var rememberMe = document.getElementById("inlineCheckboxRememberMe");
			var rememberMeValue = rememberMe.checked? rememberMe.value:"";

			var $ = require ('jquery')
			var opt = {"email": email,
						"password": password,
						"format": "login"
						};

			var request =  [
					"Users",
					"login",
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
							$('#fallbackcontainer').hide();
							var loggedIn = 'true';
							var expiryDate;
							if(rememberMeValue === "yes"){
								expiryDate = 20*365;
							}else {
								expiryDate = '';

							}

							Cookies.writeCookie('loggedIn', loggedIn, expiryDate);
							Cookies.writeCookie('user', response.success[0].email, expiryDate);
							this.context.router.push(config.root + "/accounts");
							// var step = 2;
							// var userEmail = response.success[0].email.replace("@","%40");
							// var userToken = "aaa";
							// console.log(step);
							// var page = '';
							// switch(step) {
							//     case 1:
							//     	page = "/SignUp";
							//         break;
							//     case 2:
							//     	page = "/NDA";
							//         break;
							//     case 3:
							//     	page = "/BetaRegisteration";
							//         break;
							//     case 4:
							//     	page = "/StartSession";
							//         break;
							//     case 5:
							//     	page = "/AboutPage";
							//         break;
							//     default:
							//         page = "/AppsPage";
							// } 
							// var url = page + "?email=" + userEmail + "&token=" + userToken;
							// this.context.router.push(config.root + url);
						}
						else {
							$('#fallbackcontainer').show();
							$('#fallbackmessage').append('<li>Invalid Email Address or password</li>');
						}
					}.bind(this)
				});
		} else {

		}
	}

	validateInput() {
		var email = document.getElementById('c-email').value;
		var password = document.getElementById('c-password').value;
		
		var validateFinal = validation.LoginValidation(email, password);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;

		var $ = require ('jquery')
		$('#fallbackmessage li').remove();

		var validChecker = true;
		var allErrorMessage = "";



		//email
		if (validArray[0] == false) {
			document.getElementById('c-email').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[0] + '</li>');
		} else {
			document.getElementById('c-email').className='o-login-input';
		}

		//password
		if (validArray[1] == false) {
			document.getElementById('c-password').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[1] + '</li>');
		} else {
			document.getElementById('c-password').className='o-login-input';
		}

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {
			$('#fallbackcontainer').show();
			return false;
		}
	}

	checkLogIn(){
		var status = Cookies.readCookie('loggedIn');
		if(status == "true"){
			var user = Cookies.readCookie('user');
			if(user != ""){
				this.context.router.push(config.root + "/accounts");
			}
		}

	}

	componentDidMount(){
		var $ = require ('jquery')
        $('#UserCPMenu').addClass('logout');
		$('#fallbackcontainer').hide();
		this.checkLogIn();
	}

	componentDidUpdate(){
		var $ = require ('jquery')
        $('#UserCPMenu').addClass('logout');
		$('#fallbackcontainer').hide();
	}

  render() {
    return (
     	<InlineCss stylesheet={css.userLoginContent(this.props.arabic)} namespace="Login">
     		<div className="o-login-container">
     			<div className="o-fallback-container" id="fallbackcontainer">
     				<h3>Error: </h3>
     				<div className="o-fallback-message">
     					<ul className="c-fallback-results" id="fallbackmessage">
     						<li>
     						</li>
     					</ul>
     				</div>
     			</div>
     			<div className="o-container">
     				<div className="o-container-header">
     					<h1>{lang(this.props.language, "loginTitle")}</h1>
     				</div>
     				<div className="o-container-textbox">
     					<div className="o-container-textboxfield">
     						<input id="c-email" className="o-login-input" type="text" placeholder={lang(this.props.language, "loginElementEmail")} ref="email"/>
     						<i className="fa fa-user" id="firstname"></i>
     					</div>
     					<div className="o-container-textboxfield">   					
     						<input id="c-password" className="o-login-input" type="password" placeholder={lang(this.props.language, "loginElementPassword")} ref="password"/>
     						<i className="fa fa-key" id="firstname"></i>
     					</div>	
       				</div>
       				<div className="o-container-checkbox">
       					<label className="checkbox-inline">
							<input type="checkbox" id="inlineCheckboxRememberMe" value="yes" />
							<span htmlFor="inlineCheckboxType1">Keep Me Logged In</span>
						</label>
       				</div>
       				<div className="o-container-button">
       					
       					<button type="button" className="c-signup-button o-form__button is-primary is-left" onClick={this.handleSignup.bind(this)} >
       					{lang(this.props.language, "loginElementSignUp")}</button>
       					<button type="button" className="c-login-button o-form__button is-primary is-right" onClick={this.handleLogin.bind(this)} >
       					{lang(this.props.language, "loginElementLogin")}</button>
       				</div>
     			</div>
     			<div className="o-container-forgetpassword">
     				<p>{lang(this.props.language, "loginElementForgetPassword")}</p>
     				<button type="button" className="c-forgetpassword-button" onClick={this.handleForgetPassword.bind(this)} >
     				{lang(this.props.language, "loginElementClickHere")}</button>
     				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
     			</div>
     		</div>
     		
     	</InlineCss>
    );
  }

};

Login.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default Login;