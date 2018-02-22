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
import globalFunction from "../../components/GlobalFunction";
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";
import css from "./userCss";
import Profile from "./UserProfile";
import FriendsFamily from "./UserFriendsFamily";
import People from "./UserPeople";
import FavMosque from "./UserFavouriteMosque";
import Settings from "./UserSettings";
import Draggable, {DraggableCore} from 'react-draggable';

var id, stateCity, countryState, password;
var windowHeight=0, windowWidth=0;
var buttonX=0, buttonY=0;
var resizeTimer;
var betaEmail, token;
var feedbackSession = false;
class UserAccountsMain extends React.Component {

	constructor(args) {
		super(args);
	}

    handleTab(e){
    	var $ = require ('jquery')
    	$('.c-usercpcontenttab__button').removeClass('active');
    	$('.usercpcontent-tabcontent').css('display','none');
    	var id = e.currentTarget.id;
    	$('#'+id).addClass('active');
    	id = id.split('-');
    	var action = id[0];
	    document.getElementById(action).style.display = "block";
	    if(action == "Settings") {
	    	$('#UserSettings').css('display','block');
	    }
    }

	componentWillUnmount() {
		var $ = require('jquery')
		$(window).off("resize");
	}

	windowMount() {
		var $ = require('jquery')
		windowHeight = window.innerHeight;
	    windowWidth = window.innerWidth;
	    buttonX = windowWidth - 79;
	    buttonY = (windowHeight/2) - 220;
		resizeWindow=resizeWindow.bind(this);
		$(window).resize(resizeWindow);
		function resizeWindow(){
			clearTimeout(resizeTimer);
			timer=timer.bind(this);
			resizeTimer = setTimeout(timer, 250);
			function timer() {
				windowHeight = window.innerHeight;
			    windowWidth = window.innerWidth;
			    buttonX = windowWidth - 79;
			    buttonY = (windowHeight/2) - 220;
				this.forceUpdate();            
			}
		}
	}

	exit() {
	    this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
	    this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}

	componentDidUpdate() {
		var $ = require ('jquery')
    	$('.c-application-button').css('display','block');
		$('#UserCPMenu').addClass('logout');
        $('.c-application-button').css('right','3.0em');
        $('.o-application-menu').css('right','3.5em');
	}

	componentDidMount() {

		//Beta check email token url
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

		var $ = require ('jquery')
    	$('.c-application-button').css('display','block');

		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?
        $('#UserCPMenu').addClass('logout');
        $('.o-noorLogo-icon').css("cssText","position: absolute !important;top: 0 !important;width: 100% !important;z-index: auto;");

		//this.checkLogIn();
    	$('#UserSettings').css('display','none');
    	$('.usercpcontent-tabcontent').css('display','none');
		$('#Profile-tab').addClass('active');
	    document.getElementById("Profile").style.display = "block";
	    this.windowMount();
	    this.forceUpdate();
	    
	}

	handleFeedback() {
		this.getQuestionFeedback();
	}

	handleStart() {
		var $ = require('jquery')
		$('#c-feedback-button').off('click');
		$('#c-feedback-button').click(this.handleFeedback.bind(this));
	}

	handleDrag(e, ui) {
		var $ = require('jquery')
		buttonX = buttonX + ui.deltaX;
		buttonY = buttonY + ui.deltaY;
		$('#c-feedback-button').off('click');
	}

	handleStop() {
		var top = 0;
		var left = 0;
		var right = window.innerWidth;
		var bottom = window.innerHeight;
		var topCal = buttonY + top;
		var bottomCal = (bottom - 200) - buttonY;
		var leftCal = buttonX + left;
		var rightCal = right - buttonX
		var finalHeight = 0, finalWidth = 0;
		if (topCal < bottomCal){
			if (leftCal < rightCal) {
				if (leftCal > topCal) {
					finalHeight = 0;
					finalWidth = leftCal;
				} else {
					finalHeight = topCal;
					finalWidth = 0;
				}	
			} else {
				if (rightCal > topCal) {
					finalHeight = 0;
					finalWidth = right-rightCal;
				} else {
					finalHeight = topCal;
					finalWidth = (right - 79);
				}
			}
		} else {
			//finalHeight = (bottom - 206);
			if (leftCal < rightCal) {	
				if (leftCal > bottomCal) {
					finalHeight = (bottom - 200);
					finalWidth = leftCal;
				} else {
					finalHeight = topCal;
					finalWidth = 0;
				}	
			} else {
				if (rightCal > bottomCal) {
					finalHeight = (bottom - 200);
					finalWidth = right-rightCal;
				} else {
					finalHeight = topCal;
					finalWidth = (right - 79);
				}
			}
		}

		

		buttonX = finalWidth;
		buttonY = finalHeight;
		this.forceUpdate();
	}

	getQuestionFeedback() {
		if(feedbackSession) {
			var modal = document.getElementById('myModal');
		  	modal.style.display = 'block';
		} else {
			feedbackSession = true;
			getQuestionForm = getQuestionForm.bind(this);
			globalBetaFunction.getFeedbackModal("account",getQuestionForm);
			function getQuestionForm(data) {
			  var $ = require('jquery');
			  $('body').append(data);
			  var modal = document.getElementById('myModal');
			  modal.style.display = 'block';
			  $('.closeModalBtn').click(function(){        
			    modal.style.display = "none";
			    $('.c-errorClass').css('display','none');
			  });
			  $('.add-new').click(function() {
			    var newNo = $('.o-question-inner').children().length + 1;
			    $('#question-table').append(
			        '<li class="c-questionlistener">' +
			          '<label>'+newNo+'.</label>' +
			          '<div class="u-select__wrapper">' +
			          '<select id="account-question-'+newNo+'" class="c-selection has-dropdown" ref="accountquestion">' +
                    	'<option selected disabled>-- Choose Bug --</option>' +			            
			            '<option value="Function Not Working">Function Not Working</option>' +
						'<option value="Invalid Data">Invalid Data</option>' +
						'<option value="Spelling mistakes">Spelling mistakes</option>' +
						'<option value="Browser Compatibility">Browser Compatibility</option>' +
						'<option value="Logic Error">Logic Error</option>' +
						'<option value="Crashing Issues">Crashing Issues</option>' +
			          '</select>' +
			          '<i class="fa fa-angle-down"></i>' +
			        '</div>' +
			          '<input id="accountanswer'+newNo+'" class="o-form__input" type="text" placeholder="Comment..." />' +
			          '<div class="u-select__wrapper">' +
			          '<select id="account-priority-'+newNo+'" class="c-selection has-dropdown" ref="accountpriority">' +
                    	'<option selected disabled>-- Choose priority --</option>' +			            
			            '<option value="Low">Low</option>' +
			            '<option value="Medium">Medium</option>' +
			            '<option value="High">High</option>' +
			            '<option value="Urgent">Urgent</option>' +
			            '<option value="Emergency">Emergency</option>' +
			            '<option value="Critical">Critical</option>' +
			          '</select>' +
			          '<i class="fa fa-angle-down"></i>' +
			        '</div>' + 
			        '</li>');
			  });
			  saveFeedback = saveFeedback.bind(this);
			  $('.is-save').click(saveFeedback);
			  function saveFeedback() {
			    var $ = require('jquery');
			    var feedbackData;
			    var userEmail = betaEmail;
			    var validateAll = globalBetaFunction.validateFeedbackForm("account");
			    if(validateAll.errorMsg == "") {          
					for(var i=1; i<=validateAll.answerFill; i++) {
						feedbackData = {
							email: userEmail,
							category: "account",
							answer: $('#accountanswer'+i).val(),
							priority: $('#account-priority-'+i).val(),
							question: $('#account-question-'+i).val()
						};
						globalBetaFunction.addUserFeedback(feedbackData);
					}
					if(validateAll.extraFill) {
						feedbackData = {
						    email: userEmail,
						    category: "account",
						    answer: $('#othercomment').val(),
						    priority: "medium",
						    question: "general"
						};
						globalBetaFunction.addUserFeedback(feedbackData);
					}
					modal.style.display = "none";
			      	modal.remove();
			      	this.context.router.push(config.root + "/summary?email="+betaEmail+"&token="+token);
			    }
			    else {
              		$('.c-errorClass').text(validateAll.errorMsg);
	              	$('.c-errorClass').css('display','block');
	            }
			  }
			}
		}
	}

	handleExtendTab(e) {
		var $ = require ('jquery')
		if($('#extend-tab').hasClass('active')){
			$('#extend-tab').removeClass('active');
			$('#extend-tab').removeClass('on');
			$('#extend-tab').addClass('off');
			
		}else {
			$('#extend-tab').addClass('active');
			$('#extend-tab').addClass('on');
			$('#extend-tab').removeClass('off');
		}
	}

	render() {
		var tabButton;
		if(this.props.desktop) {
			tabButton = (<div className="o-usercpcontent__tab">
							<button id="Profile-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementProfile")}
							</button>
							<button id="FriendsFamily-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementConnection")}
							</button>
							<button id="People-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementPeople")}
							</button>
							<button id="FavMosque-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementFavouriteMosque")}
							</button>
							<button id="Settings-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementSettings")}
							</button>
						</div>);
		}else {
			tabButton = (<div className="o-usercpcontent__tab">
							<button id="Profile-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementProfile")}
							</button>
							<button id="FriendsFamily-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementConnection")}
							</button>
							<button id="People-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>
								{lang(this.props.language, "accElementPeople")}
							</button>
							<div className="c-extendtab">							
								<div id="extend-tab" className="o-wrappertab-dropdown off" tabIndex="1" onClick={this.handleExtendTab.bind(this)}>
									<span><i className="fa fa-ellipsis-v"></i></span>
									<ul className="c-maintab-dropdown">
										<li><button id="FavMosque-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>{lang(this.props.language, "accElementFavouriteMosque")}</button></li>
										<li><button id="Settings-tab" className="mdl-button mdl-js-button mdl-js-ripple-effect c-usercpcontenttab__button" onClick={this.handleTab.bind(this)}>{lang(this.props.language, "accElementSettings")}</button></li>
									</ul>
								</div>
							</div>
						</div>);
		}
		return (	
			<InlineCss stylesheet={css.userContent(this.props.arabic)} namespace="UserAccountsMain">
				<div className="o-usercpcontent-container">
					<Draggable
					    axis="both"
					    grid={[10, 10]}
					    zIndex={20}
					    bounds={{top: 0, left: 0, right: windowWidth - 79, bottom: windowHeight - 200}}
					
					    position={{x: buttonX, y: buttonY}}
					    onStart={this.handleStart.bind(this)}
					    onDrag={this.handleDrag.bind(this)}
					    onStop={this.handleStop.bind(this)}>
					   <button type="button" id="c-feedback-button" className="c-feedback-button">?</button>
					</Draggable>
					<div className="o-usercpcontent-padding">
						{tabButton}
					</div>
					<div className="o-container c-usercpcontent__form">	
						<div className="o-usercpcontent-padding">
							<div id="Profile" className="usercpcontent-tabcontent">
							 	<Profile
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
							<div id="FriendsFamily" className="usercpcontent-tabcontent">
							  	<FriendsFamily
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
							<div id="People" className="usercpcontent-tabcontent">
							  	<People
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
							<div id="FavMosque" className="usercpcontent-tabcontent">
							 	<FavMosque
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
							<div id="Settings" className="usercpcontent-tabcontent">
							  	<Settings
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
						</div>
					</div>
				</div>
			</InlineCss>
		);
	}


};

UserAccountsMain.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserAccountsMain;