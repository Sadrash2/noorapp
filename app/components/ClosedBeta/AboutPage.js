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

var slideIndex = 1;
var betaEmail, token
class AboutPage extends React.Component {

	handleNext(e) {
		var opts = { "steps": 5, "email": betaEmail}
		globalBetaFunction.editSteps(opts);
		this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
	}

	currentSlide(e) {
	  	var $ = require ('jquery');
	  	$('.mySlides').css('display','none');
	  	$('.dot').removeClass('active');
	  	if(e.target.id === "1"){
	  		$('#first').css('display','block');
	  		$('#1').addClass('active');
	  	}else if(e.target.id === "2"){
	  		$('#second').css('display','block');
	  		$('#2').addClass('active');
	  	}else{
	  		$('#third').css('display','block');
	  		$('#3').addClass('active');
	  	}
	}

	showSlide() {
	  	var $ = require ('jquery');	
		$('.mySlides').css('display','none');
	  	$('.dot').removeClass('active');
		if(slideIndex == 1) {			
		  	$('#first').css('display','block');
		  	$('#1').addClass('active');
		  	slideIndex=2;
		} else if(slideIndex == 2) {
		  	$('#second').css('display','block');
		  	$('#2').addClass('active');
		  	slideIndex=3;
		} else if(slideIndex == 3) {
		  	$('#third').css('display','block');
		  	$('#3').addClass('active');
		  	slideIndex=1;
		}
	}

	exit() {
		this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
		this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}
	
	componentDidMount() {
	  	var $ = require ('jquery')
		$('.c-application-button').css('display','none');
        $('#UserCPMenu').addClass('logout');
	  	$('.mySlides').css('display','none');
	  	$('.dot').removeClass('active');
	  	$('#first').css('display','block');
	  	$('#1').addClass('active');	  	
	  	setInterval(this.showSlide, 3000);	

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
								function compareStartfunction(data) {
									if (data == "timeremain") {
									} else {
										this.timeout();
									}
								}
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
     	<InlineCss stylesheet={AboutPage.css(this.props.arabic)} namespace="AboutPage">
     		<div className="o-about-title">
     			<h1>About NOOR</h1>
     		</div>
     		<div className="o-background-color"></div>
     		<div className="o-about-container">   			
     			<div  className="slideshow-container">
				  <div  className="mySlides fade" id="first">
				    <img src="app/assets/images/content/promotional/features/image-001.jpg" alt=""/>
				  </div>

				  <div className="mySlides fade" id="second">
				    <img src="app/assets/images/content/promotional/features/image-002.jpg" alt=""/>
				  </div>

				  <div className="mySlides fade" id="third">
				    <img src="app/assets/images/content/promotional/features/image-003.jpg" alt=""/>
				  </div>
				  <div className="o-dot-elements">
					<span id="1" className="dot" onClick={this.currentSlide.bind(this)}></span> 
					<span id="2" className="dot" onClick={this.currentSlide.bind(this)}></span> 
					<span id="3" className="dot" onClick={this.currentSlide.bind(this)}></span> 
				  </div>
				</div>				
     		</div>
     		<div className="o-about-content">
     			<header>
     				<h3>In case you don't know us yet...</h3>
     			</header>
     			<p>
					{lang(this.props.language,"aboutNoorElementContent1")}
     			</p>
     			<p>
     				{lang(this.props.language,"aboutNoorElementContent2")}     				
     			</p>
     			<p>
     				{lang(this.props.language,"aboutNoorElementContent3")}
     			</p>
     			{/*<p>
     				{lang(this.props.language,"aboutNoorElementContent4")}
     			</p>*/}
     			<p>
     				{lang(this.props.language,"aboutNoorElementContent5")}
     			</p>
     			<div className="o-button-wrapper">
	     			<button type="button" id="c-begin-button" className="c-begin-button" onClick={this.handleNext.bind(this)} >Next</button>
	     		</div>
     		</div>
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `
			
			& {
					padding-top: 85px;
				}
				.o-about-title, .o-about-content {					
					padding: 0% 22% 2%;
				}
				.o-about-title h1 {
					text-align: center;
					color: #4D4D4D;
					font-size: 2em;
					font-weight: 500;
				}
				.o-about-content header h3 {
					text-align: left;
					color: #4D4D4D;
					font-size: 1em;
					font-weight: 600;
					margin-bottom: 1em;
				}
				.o-about-content p {
					font-weight: 300;
					font-size: 0.9em;
					margin-bottom: 1em;
				}
				.o-button-wrapper {
					margin-top: 3em;
					margin-bottom: 3em;
					width: 100%;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-around;
					text-align:center;
				}

				.c-begin-button {
					padding: 0.5em 3em;
					background-color: #C79269;
					color: white;
					border:none;
					font-size: 1.2em;
					outline: none;
					display:inline-block;
				}
				.c-begin-button:hover {
					background-color: #DBA982;
				}
				.o-background-color {
					background-color: #ECE8E1;
					width: 100%;
					height: 30em;
    				z-index: -1;
    				position: absolute;
				}	

				& > .o-about-container {
					padding: 5% 22% 3%;		
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media screen and (min-width: 180px) and (max-width: 767px) {
					& > .o-about-container, .o-about-content {
						padding: 5% 2% 5%;		
					}
					.mySlides img {
						width: 100% !important;
					}
					.o-background-color {
						height: 8em;
					}
					.o-about-title h1 {				 
					    font-size: 1.2em;
					}
					.o-about-content p {
					    font-size: 0.8em;
					}
					.o-button-wrapper {
						flex-direction:column;
					}

				}

				{/* Tablet (Portrait)
				================================================== */}
				@media screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-about-container, .o-about-content {
						padding: 5% 22% 5%;		
					}
					.mySlides img {
						width: 100% !important;
					}

					.o-background-color {
						height: 20em;
					}	
				}

				/* Slideshow container */
				.slideshow-container {
					box-shadow: 0px 1px 3px #999999;
				  	position: relative;
				  	background-color: white;
				}
				.mySlides {
					text-align: center;
				}
				.mySlides img {
					width: 100%;
					height: 100%;
				}

				/* Caption text */
				.caption {
				  color: #000;
				  padding: 15px 5px;
				  position: absolute;
				  bottom: 11%;
				  width: 100%;
				  text-align: center;
				}
				.caption h1 {
					font-weight: 400;
				}
				.sub-caption {
				  color: #a59f95;
				  font-size: 15px;
				  position: absolute;
				  bottom: 8%;
				  width: 100%;
				  text-align: center;
				}

				/* The dots/bullets/indicators */
				.o-dot-elements {
					position: relative;
					text-align: center;
					padding: 1% 0% 2%;
				}
				.dot {
				  cursor:pointer;
				  height: 13px;
				  width: 13px;
				  margin: 0 2px;
				  border: 1px solid #b3aea6;
				  background-color: #fff;
				  border-radius: 50%;
				  display: inline-block;
				  transition: background-color 0.6s ease;
				}

				.active, .dot:hover {
				  background-color: #b3aea6;
				}

				/* Fading animation */
				.fade {
				  -webkit-animation-name: fade;
				  -webkit-animation-duration: 1.5s;
				  animation-name: fade;
				  animation-duration: 1.5s;
				}

				@-webkit-keyframes fade {
				  from {opacity: .4} 
				  to {opacity: 1}
				}

				@keyframes fade {
				  from {opacity: .4} 
				  to {opacity: 1}
				}

		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

AboutPage.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default AboutPage;