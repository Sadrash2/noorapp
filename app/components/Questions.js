import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import ReactSwipe from "react-swipe";
import styleFunctions from "../scss/styleFunctions";
import Cookies from "../components/Cookies";
import functions from "../scss/styleFunctions";
import {Link} from "react-router";

var betaEmail;
class Questions extends React.Component {

	constructor(args) {
		super(args);

		this.state = {
			formSubmitted: false,
			errorMessage: ""
		};

		
	}

	handleSubmit() {
		const email = this.refs.emailInput.value;
		const name = (this.refs.nameInput.value == "")?"Anonymous":this.refs.nameInput.value;
		const question = this.refs.questionInput.value;

		if(email && name && question) {
			
			var $ = require ('jquery')

			var opt = {"email": email,
					"name": name,
					"question": question};

				var request =  [
					"Contact",
					"send",
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
							this.setState({
								errorMessage: "",
								formSubmitted: true
							});
							toastr.success('FAQ sent successfully');

						}
					}.bind(this)
					 });
		} else {
			this.setState({
				errorMessage: "You need to fill out all fields"
			});
		}

	}

	callApi(){

			var $ = require ('jquery')
			var request =  [
				"Faq",
				"fetch", "all"];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					var response = JSON.parse(data);
					var faq = [];
					var faqExpand = [];
					if(response.state === 200) {
						if(response.success.length>0){
							$("#FAQSection").show();
						}else{
							$("#FAQSection").hide();
						}

						for(var i =0; i<response.success.length; i++) {
							$("#questionAnswer").append(
								'<div class="c-question">' +
									'<div class="c-question-header"id="questionHeader'+i+'">' +
										response.success[i].question +
									'</div>' +
									'<div class="c-question-answer" id="questionAnswer'+i+'">' +
										response.success[i].answer +
									'</div>' +
								'</div>');
							$('#questionHeader'+i).click(function (e) {
													_handleClick($(this).attr("id"));
												});
						}
					}
					else if(response.state === "3011"){
						$("#FAQSection").hide();
					}
					else {
						$("#FAQSection").hide();
					}
				}.bind(this)
			});

		function _handleClick(e) {
			e = e.replace("Header","Answer");
			
			var $ = require ('jquery')

			$(".c-question-answer.active").removeClass("active");
			$("#"+e).addClass("active");
		}
	}

	checkLogIn(){
		var url = window.location.search;
    	var queryStart = url.indexOf("?") + 1;
	    var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	    var query = url.slice(queryStart, queryEnd - 1);
	    var pairs = query.replace(/\+/g, " ").split("&");
	    if(pairs[0] != ""){
	    	var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		    tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		    parms = {}, i, n, v, nv;
		    betaEmail = emailPairs[1];
		    betaEmail = betaEmail.replace("%40","@");
		}
		if(betaEmail != ""){
			var $ = require ('jquery')
			var request =  [
				"Users",
				"fetch", betaEmail];

			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					var response = JSON.parse(data);
					if(response.state === 200) {
						var type = "";
						var jobType = "";				
						$("#c-faqfirstname").val(response.success.firstName + " " + response.success.lastName);
						$("#c-faqemail").val(response.success.email);
					}
				}.bind(this)
			});
		}
	}

	componentDidMount() {
			this.callApi();
			this.checkLogIn();
			var $ = require ('jquery')
			$('html, body').animate({
                scrollTop: 0
            }, 0);
		}

	render() {

		const error = this.state.errorMessage ? this.state.errorMessage : "";

		const theForm = this.state.formSubmitted ? (
			<div className="o-questions-bottom">
				We will respond to your mail as soon as we can!
			</div>
			) : (
			<div className="o-questions-bottom">
				<div className="c-question__form">
					<div className="c-question-input-email">							
						<div className="c-input-heading">{lang(this.props.language, "questionUserEmail")}</div>
						<input type="text" ref="emailInput" id="c-faqemail" />
					</div>
	
					<div className="c-questions-input-name">								
						<div className="c-input-heading">{lang(this.props.language, "questionUserName")}</div>
						<input type="text" ref="nameInput" id="c-faqfirstname" />
					</div>
				</div>
				<div className="c-questions-input-message">								
					<div className="c-input-heading">{lang(this.props.language, "questionUserQuestion")}</div>
					<textarea ref="questionInput" />
				</div>

				<div>{error}</div>
				
			</div>
			
		);

		return (
			<InlineCss namespace="questions" stylesheet={Questions.css(this.props.arabic)}>
				<div className="o-contact-form">
					
					<div className="o-the-form o-questions-container">
						<div className="o-questions-up">

							<div className="o-intro-text">
								<h2>{lang(this.props.language, "questionHeader")}</h2>
							</div>

						</div>

						{theForm}
						<div className="c-submit__form">
							<button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect is-submit is-right" onClick={this.handleSubmit.bind(this)}>
								{lang(this.props.language, "questionControlAskUs")}
							</button>
						</div>
					</div>
				</div>

				<div className="o-faq-container o-questions-container" id="FAQSection">
								
					<h2>{lang(this.props.language, "questionFAQTitle")}</h2>
					<div className="o-faqs" id="questionAnswer">
						
					</div>
				</div>

			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const responsiveSocialMedia = styleFunctions.responsivePadding("#feedback .social-media");
		const responsiveContactForm = styleFunctions.responsivePadding("#feedback .o-contact-form");


		const base = `


			& {
				background-color: white;
			}

			& .c-submit__form {
				position: relative;
			}

			& button.is-submit {
				border: 0px;
				background-color: #C79269;
				color: white;
				font-family: inherit;
				margin-top: 10px;
				float: right !important;
				letter-spacing: 0.6px;
			}

			& button.is-right {
				position: absolute;
				right: 0;
			}

			div#react-root {
				background-color: white;
			}

			& .c-question-header {
				border: 1px solid #CCC0AE;
				
				padding: 10px 5px 0 5px;
			}

			& .c-question__form {
				display: flex;
				flex-direction: row;
				width: 100%;
				justify-content: space-between;
			}

			& .c-question {
				margin-bottom: 20px;
			}

			& .c-question .c-question-answer {
				display: none;
			}

			& .c-question .c-question-answer.active {
				display: block;
			}

			& .c-question-answer {
				border: 1px solid #CCC0AE;
				border-top: 0;
				padding: 10px 5px 10px 5px;
			}

			 .o-contact-form {
				padding: 32px 23px;
			}

			 .o-contact-form h2 {
			 	font-size: 2.2rem;
			 	line-height: 41px;
			 	font-weight: 100;
				color: #4d4d4d;
				margin-bottom: 23px;
			}

			 .o-contact-form p {
			 	font-size: 2.0rem;
			 	line-height: 26px;
			 	font-weight: 300;
				margin-bottom: 30px;
			}

			.c-input-heading {
				font-weight: 600;
				font-size: 1.2rem;
				margin: 6px 0;
			}

			.o-contact-form input[type=text] {
				height: 40px;
				border: 1px solid rgba(0,0,0,0.075);
				background-color: rgba(255,255,255,0.33);
				width: 100%;
				color: #746A5A!important;
				font-size: 1.4rem;
				font-weight: 600;
				line-height: 1.42857143;
				padding: 0 10px;
				box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
				border-radius: 2px;
			}

			.o-contact-form .c-questions-input-message textarea {
				width: 100%;
				border: 1px solid rgba(0,0,0,0.075);
				background-color: rgba(255,255,255,0.66);
				min-height: 140px;
				font-size: 14px;
				padding: 10px;
				box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
			}

			.c-questions-input-email, #feedback .c-questions-input-name {
				margin-bottom: 15px;
			}

			.c-questions-input-submit {
				background-color: ${colors.orange};
				height: 40px;
				border-radius: 5px;
				box-shadow: 0 2px 0 0 #A6581F;
				margin-top: 10px;
				text-align: center;
				padding-top: 10px;
				color: white;
			}

			.o-faq-container {
				padding-top: 64px !important;
				padding-bottom: 64px !important;
				border-bottom: 1px solid ${colors.dirtWhite};
			}

			.o-faq-container h2 {
				padding-bottom: 32px;
			}

			@media (min-width: 768px) {


				.o-contact-form .o-the-form .o-questions-up {
				}

				.o-contact-form .o-the-form .o-questions-bottom {
					display: flex;
					flex-wrap: wrap;
				}

				.o-contact-form .c-questions-input-email {
					flex-shrink: 1;
					flex-basis: 45%;
					margin-right: 5%;

				}



			& .c-question-input-email {
				flex-basis: 25%;
			}

				.o-contact-form .c-questions-input-name {
					flex-basis: 73%;
				}

				.c-questions-input-message {
					flex-basis: 100%;
				}

				.c-questions-input-submit {
					flex-basis: 20%;
					margin-left: auto;
				}
			}


		`;

		const arabic = ``;

		return arabicToggle ? base + arabic : base;
	}

};

export default Questions;