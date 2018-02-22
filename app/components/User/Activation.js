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

class Activation extends React.Component {

	constructor(args) {
		super(args);
	}

	checkURL(){
		var $ = require('jquery')
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

        if(pairs[0]=="pending"){
        	$('#activatebutton').hide();
        }else {
        	$('#resendbutton').hide();
        	$('#returnbutton').hide();        	
        }
	}

	componentDidMount(){
		var $ = require ('jquery')
		this.checkURL();
	}

	returnHome(e) {
		this.context.router.push(config.root + "/");
	}

	sendMail(e){
		var $ = require('jquery')
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

        callbackcheck =callbackcheck.bind(this);
		call.passRequest("Users","fetch",pairs[1],callbackcheck);

		function callbackcheck(data){
			var response = JSON.parse(data);
			var linkEmail = "http://noor.me/activation#active&"+response.success.email+"&"+response.success.password;
			var data = {"email":response.success.email,
						"firstName":response.success.firstName,
						"linkEmail":linkEmail,
						"format":"new"};
			sendEmailToUser = sendEmailToUser.bind(this);
			sendEmailToUser(data);
		}

		function sendEmailToUser(opt){
			var $ = require ('jquery')

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
					}
				}.bind(this)
			});
		}
	}

	activateAccount(e) {
		var $ = require('jquery')
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

        var opt = {"email": pairs[1],
        	"password": pairs[2],
        	"format": "1"}

        callSuccessCheck = callSuccessCheck.bind(this);
        call.passFormData("Users","fetchValidatePassword", opt, callSuccessCheck);

        function callSuccessCheck(data){
        	var response = JSON.parse(data);

        	if(response.state === 200){
        		callSuccess = callSuccess.bind(this);
        		call.passRequest("UserData","updateActivation", response.success.email, callSuccess);
        	}
        }

        function callSuccess(data){
        	Cookies.writeCookie('loggedIn',"true", 3);
			Cookies.writeCookie('user',pairs[1], 3);
			this.context.router.push(config.root + "/profile");

        }
        
	}

  render() {
    return (
     	<InlineCss stylesheet={css.userActivationContent(this.props.arabic)} namespace="Activation">
     		<div className="o-activatecontent-container">     			
     			<div className="o-activatecontent__form">
	     			<header>   				
	     				<h3>{lang(this.props.language, "activationTitle")}</h3>
	     			</header>
     				<p>{lang(this.props.language, "activationDescription")}</p>
     				<button className="is-orangeprimary o-form__button" id="resendbutton" onClick={this.sendMail.bind(this)}>{lang(this.props.language, "activationControlResend")}</button>
     				<button className="is-orangeprimary o-form__button" id="returnbutton" onClick={this.returnHome.bind(this)}>{lang(this.props.language, "activationControlReturn")}</button>
     				<button className="is-orangeprimary o-form__button" id="activatebutton" onClick={this.activateAccount.bind(this)}>{lang(this.props.language, "activationControlActivate")}</button>
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

Activation.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default Activation;