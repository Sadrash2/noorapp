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

class ForgetPassword extends React.Component {

	constructor(args) {
		super(args);
	}

	componentDidMount(){
		var $ = require ('jquery')
		$('#fallbackcontainer').hide();
	}

	//resetpassword button
	handleReset() {
		var email = this.refs.email.value;

		var validateFinal = validation.ForgetPasswordValidation(email);

		var validChecker = true;

		var $ = require ('jquery')
		$('#fallbackmessage li').remove();

		//email
		if (validateFinal.valid == false) {
			document.getElementById('c-email').className='is-required';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ validateFinal.message + '</li>');
			$('#fallbackcontainer').show();
			$('html, body').animate({
                scrollTop: 0
            }, 0);
			$('#fallbackheader').text("Error:");
			$('#fallbackcontainer').removeClass('success');

		} else {
			document.getElementById('c-email').className='o-form__input';

			var $ = require ('jquery')
			var opt = {"email": email};

			var request =  [
					"Users",
					"fetch",
					email];

				$.ajax({
					type: "POST",
					datatype: 'json',
					url: "./app/bridge/enter.php",
					data: {request},
					cache: false,
					success: function(data) {
						var response = JSON.parse(data);
						if(response.state === 200) {
							$('#fallbackcontainer').hide();
							var linkReset = "http://noor.me/UserChangePassword#" + response.success.password + "&1&" + response.success.email;
							var data = {"email":response.success.email,
										"firstName":response.success.firstName,
										"linkReset":linkReset,
										"format":"forget"};
							sendMail(data);
							$('#fallbackcontainer').addClass('success');
							$('#fallbackheader').text("Successful:");
							$('#fallbackcontainer').show();
							$('html, body').animate({
				                scrollTop: 0
				            }, 0);
							$('#fallbackmessage').append('<li>Reset link haave been sent to your email.</li>');
							

						} else {
							$('#fallbackcontainer').show();
							$('#fallbackmessage').append('<li>Invalid Email Address</li>');
							$('html, body').animate({
				                scrollTop: 0
				            }, 0);
							$('#fallbackheader').text("Error:");
							$('#fallbackcontainer').removeClass('success');
						}
					}.bind(this)
				});
		}

		function sendMail(opt){
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

	handleBack(e) {
		this.context.router.push(config.root + "/login");
	}


  render() {
    return (
     	<InlineCss stylesheet={css.userForgetPasswordContent(this.props.arabic)} namespace="ForgetPassword">
     		<div className="o-forgetpassword-container">
					<header className="o-forgetpassword__header">
						<div className="o-forgetpassword-padding">
							<h1 className="c-page__title o-forgetpassword__title u-center-alignment">
							{lang(this.props.language, "forgetPasswordTitle")}
							</h1>
							<p className="c-page__description o-forgetpassword__description u-center-alignment">
							{lang(this.props.language, "forgetPasswordDescription")}</p>
							<p><a onClick={this.handleBack.bind(this)}>Back to login</a></p>
						</div>
					</header>
					<div className="o-container c-forgetpassword__form">
						<div className="o-forgetpassword-padding">
							<div className="o-fallback-container" id="fallbackcontainer">
			     				<h3 id="fallbackheader"></h3>
			     				<div className="o-fallback-message">
			     					<ul className="c-fallback-results" id="fallbackmessage">
			     						<li>
			     						</li>
			     					</ul>
			     				</div>
			     			</div>
							<div className="o-container__content">
								<section className="o-container__section">
									<div className="o-container__row">
										<div className="c-form__group">
											<input id="c-email" className="o-form__input" type="text" placeholder={lang(this.props.language, "forgetPasswordElementEmail")} ref="email"/>
										</div>
										<div className="c-form__group2">
     										<button type="button" className="c-reset-button o-form__button is-primary is-right" onClick={this.handleReset.bind(this)} >
     										{lang(this.props.language, "forgetPasswordElementReset")}</button>
										</div>
									</div>
								</section>
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

ForgetPassword.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
 
export default ForgetPassword;