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
import globalFunction from "../../components/GlobalFunction";
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";
import call from "../../components/apiCall";

var betaEmail, token;
class AppsPage extends React.Component {
	handleMosqueFinderClick(e) {
		this.context.router.push(config.root + "/MosqueFinder?email="+betaEmail+"&token="+token);	
	}
	handleQuranReaderClick(e) {
		this.context.router.push(config.root + "/QuranMain?email="+betaEmail+"&token="+token);	
	}
	handleMyAccountClick(e) {
		this.context.router.push(config.root + "/accounts?email="+betaEmail+"&token="+token);	
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
						comparefunction=comparefunction.bind(this);
						globalBetaFunction.compareTimeExpired(betaEmail, comparefunction);
						function comparefunction(data) {
							if (data == "timeremain") {
								compareStartfunction=compareStartfunction.bind(this);
								globalBetaFunction.compareTimeStart(betaEmail, compareStartfunction);
								function compareStartfunction(data) {
									if (data == "timeremain") {
										call.passFormData("BetaUserData","fetch", {"email":betaEmail,"token":token}, function(data) {
											var response = JSON.parse(data);
											if(response.success[0].steps < 6){
												//check
												var opts = { "steps": 6, "email": betaEmail}
												globalBetaFunction.editSteps(opts);
												$('#appsaction').hide();
											} else {
												$('#appsheader').hide();
												$('#appsaction').show();

											}
										});
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
						} else if (array[0].steps == 3) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/StartSession?email="+betaEmail+"&token="+token);
						} else if (array[0].steps == 4) {
							betaEmail = betaEmail.replace("@","%40");
							this.context.router.push(config.root + "/AboutPage?email="+betaEmail+"&token="+token);
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

		$(' #appsMIcon[src$=".svg"]').hover(HoverIn,HoverOut);
	    $(' #appsQIcon[src$=".svg"]').hover(HoverIn,HoverOut);
	    $(' #appsAIcon[src$=".svg"]').hover(HoverIn,HoverOut);

	    function HoverIn() {
	    	if ($(this).hasClass('icons')){
			    var $img = $(this);
			    var imgURL = $img.attr('src');
				var src2 = $(this).attr('value');
			  	$(this).attr('src',src2);
			   	$(this).attr('value',imgURL);
		    	$(this).parent().find('p').css('color','#C79269');
			   			
	    	}    	
		}
		function HoverOut() {
		   	if ($(this).hasClass('icons')){
		    	var src2 = $(this).attr('value');	
		       	var imgURL = $(this).attr('src');
		     	$(this).attr('src',src2);
		    	$(this).attr('value',imgURL);
		    	$(this).parent().find('p').css('color','#B6AC9B');
		      }
		}

		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?
	}

	handleSubmit(e) {
		this.context.router.push(config.root + "/summary?email="+betaEmail+"&token="+token);
	}

	handleFinish(e) {
		this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}

  render() {
    return (
     	<InlineCss stylesheet={AppsPage.css(this.props.arabic)} namespace="AppsPage">
     		<div className="o-background-color"></div>  
     		<div className="o-apps-container">   			
     			<div className="o-apps-form">
	     			<header id="appsheader">   				
	     				<h5 >Please feel free to explore our current features and leave plenty of feedback :)</h5>
	     			</header>
	     			<div className="o-appmain-wrapper">
	     				<ul className="flex-container">					
	     					<li className="flex-item " id="apps_icon">
	     						<img className="icons c-mosquefinder-icon" onClick={this.handleMosqueFinderClick.bind(this)}	id="appsMIcon" 	src="app/components/ClosedBeta/assets/appicon-mosque-inactive.svg" value="app/components/ClosedBeta/assets/appicon-mosque-active.svg"/>
	     						<p className="AppTitle">Mosque Finder</p>
	     					</li>
	     					<li className="flex-item " id="apps_icon">
	     						<img className="icons c-myaccount-icon"	onClick={this.handleMyAccountClick.bind(this)}		id="appsQIcon"	src="app/components/ClosedBeta/assets/appicon-user-inactive.svg" value="app/components/ClosedBeta/assets/appicon-user-active.svg"/>
	     						<p className="AppTitle">My Account</p>
	     					</li>
	     					<li className="flex-item " id="apps_icon">
	     						<img className="icons c-quranreader-icon"	onClick={this.handleQuranReaderClick.bind(this)}	id="appsAIcon"	src="app/components/ClosedBeta/assets/appicon-quran-inactive.svg" value="app/components/ClosedBeta/assets/appicon-quran-active.svg" />
	     						<p className="AppTitle">The Holy Qur'an</p>
	     					</li>
	     				</ul>
	     			</div>
	     			<div className="o-action-wrapper" id="appsaction">
	     				<div className="o-apps__action">
	     					<button className="is-save" onClick={this.handleSubmit.bind(this)}>Save & Exit</button>
	     					<button className="is-finish" onClick={this.handleFinish.bind(this)}>Finish & Submit</button>
	     				</div>
	     			</div>
     			</div>
     			<div className="c-noor-mena"><h6>© 2016 NOOR Technology MENA</h6></div>
     		</div>
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `
				.AppTitle {
					color: #C79269;
					font-size:1.2em;
					font-weight: 400;
					padding-top: 20px;

				}
				#apps_icon p {
					color:#B6AD9C;
				}
				// li#apps_icon:hover {
				// 	color:#C79269;
				// }
				
				svg:hover path {
				    fill: red;
				}
				.filled_red{
					color:red;
				}
				//  ul #apps_icon:hover {
				// 	color:red;
				// }

				.c-mosquefinder-icon path {
					fill: currentColor;
					color: red;
				}

				& {
					padding-top: 65px;
				}

				.o-action-wrapper {
					width:100%;
					height: auto;
					font-size:1.0em;
					margin-top: 2em;
					font-weight: 500;
				}

				.o-apps__action > button {
					display:inline-block;
					border: none;
					outline: none;
					width: 34%;
					font-size: 1.5rem;
					line-height: 1.427;
				}

				button.is-save {
					background-color: #999999;
					color: white;
				}

				button.is-finish {
					background-color: #C79269;
					color: white;
				}

				.o-apps__action {
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					padding: 0 20%;
					text-align:center;
				}

				.flex-container {
				  display:flex;
				  flex-direction: row;
				}


				.flex-item {
					flex:3
				}


				.c-noor-mena{
					margin-top: 2%;
					text-align: center;
				}

				ul { 
					list-style: none;
				    color: rgb(160,160,160);
				    display: inline-block;	
				}

				ul li {
					cursor:pointer;
				    margin-right: 1.0em;
				}

				ul li:hover {
					// background-color:rgb(230,230,230);
				}

				ul li img{
					width:10.0em;
					height:10.0em;
				}

				.o-appmain-wrapper {
					height: auto;
					font-size:1.0em;
					font-weight: 500;
				}
				.o-background-color {
					background-color: #F2F0ED;
    				padding: 30% 100% 0 0;
    				z-index: -1;
    				position: absolute;
				}	
				& > .o-apps-container .o-apps-form {
					padding: 8% 5% 8% 5%;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color:white;
					box-shadow: 0px 0px 6px #888888;
				}

				& > .o-apps-container {
					padding: 5% 10%;
					text-align: center;
				}

				.o-apps-form > header > h5 {
					font-weight: 300;
					font-size: 1.8em;
					line-height: 1.2em;
					color: rgb(130,130,130);
					margin-bottom: 7%;
					text-align: center;
				}

				.o-apps-form > p {
					word-wrap: break-word;
					width: 100%;
					
					margin-bottom: 10%;
					text-align: center;
					text-align: -webkit-center;
					text-align: -moz-center;
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 180px) and (max-width: 767px) {
					& > .o-welcome-container {
						padding: 5% 12% 5%;		
					}
					ul li img{
						padding-top:1.0em;
						width:6.0em;
						height:6.0em;
					}

					ul li {
						margin-bottom: 2.0em;
					}
					.flex-container {
					  flex-direction: column;
					}
					.o-apps-form > header > h5 {
						font-size: 1.2em;
					}
					.o-apps__action {
						flex-direction: column;
					}
					.o-apps__action > button {
						width: auto;
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-welcome-container {
						padding: 5% 22% 5%;		
					}

					ul li img{
						width:6.0em;
						height:6.0em;
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

AppsPage.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default AppsPage;