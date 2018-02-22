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

var questionArray = ["Function Not Working", "Invalid Data", "Spelling Mistakes", "Browser Compatibality", "Logic", "Crashing Issues", "General"];
var priorityArray = ["Low", "Medium", "High","Urgent","Critical"];
var betaEmail, token;
var mosqueCount =false, quranCount = false, accountCount = false;
var generalCount =false, isAnswer =false;
class FeedbackSummary extends React.Component {

	fetchMosqueFeedback() {
		var $ = require ('jquery')
		var opt = {"email": betaEmail,
					"category": "mosque"};
		if(opt!=""){
			call.passFormData("BetaFeedback", "fetchAll", opt, function(data){
				var response = JSON.parse(data);
				$("#mosque-table li").remove();
				if(response.state === 200) {

		            for(var i =0; i < response.success.length; i++){
		            	$('#mosque-table')
						         .append(
						         	'<li class="c-summarylistinner" id="'+response.success[i].id+'">' +
		     							'<label>' + (i+1) + '.</label>' +
		     							'<div class="u-select__wrapper">' +
											'<select id="mosquequestion-'+response.success[i].id+'" class="c-selection has-dropdown" ref="mosquequestion">' +
											'</select>' +
											'<i class="fa fa-angle-down"></i>' +
										'</div>' +
		     							'<input id="mosqueanswer-'+response.success[i].id+'" class="o-form__input" type="text" />' +
		     							'<div class="u-select__wrapper">' +
											'<select id="mosquepriority-'+response.success[i].id+'" class="c-selection has-dropdown" ref="mosquepriority">' +
											'</select>' +
											'<i class="fa fa-angle-down"></i>' +
										'</div>' +
		     						'</li>');
						changeQuestion = changeQuestion.bind(this);
						$('#mosquequestion-'+response.success[i].id).change(changeQuestion);
						changePriority = changePriority.bind(this);
						$('#mosquepriority-'+response.success[i].id).change(changePriority);
		            	callApi(response.success[i].question, response.success[i].priority, response.success[i].id);
		            	$('#mosqueanswer-'+response.success[i].id).val(response.success[i].answer);
		            	mosqueCount = true;
		            }
				} else {
					$('#mosque-table')
						 .append(
						 	'<li class="c-summarylistinner">' +
		     					'<label>No feedback submission.</label>' +
		     				'</li>');
						 mosqueCount = false;
				}
	    	});
		}

		function callApi(question, priority, number) {
			var $ = require ('jquery')
	        var i = 0;
	        $.each(questionArray, function(key, value) {
	            $('#mosquequestion-'+number)
	                .append($("<option></option>")
	                .attr("value",questionArray[i])
	                .text(questionArray[i]));
	            if(question.toLowerCase() == questionArray[i].toLowerCase()){
					$('#mosquequestion-'+number+' option[value="'+questionArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
	        i = 0;
	        $.each(priorityArray, function(key, value) {
	            $('#mosquepriority-'+number)
	                .append($("<option></option>")
	                .attr("value",priorityArray[i])
	                .text(priorityArray[i]));
	            if(priority.toLowerCase() == priorityArray[i].toLowerCase()){
					$('#mosquepriority-'+number+' option[value="'+priorityArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
		}

		function changeQuestion(e){
			var $ = require ('jquery')			
			var id = e.target.id;
			id = id.split("-");
			var question = $('#mosquequestion-'+id[1]).val();
			var id = e.target.parentNode.parentNode.id;

			id=parseInt(id);
			var opt = {"id": id,
						"question": question
					}
			
			call.passFormDataWithoutCallback("BetaFeedback","editQuestion",opt);
		}

		function changePriority(e){
			var $ = require ('jquery')			
			var id = e.target.id;
			id = id.split("-");
			var priority = $('#mosquepriority-'+id[1]).val();
			var id = e.target.parentNode.parentNode.id;

			id=parseInt(id);
			var opt = {"id": id,
						"priority": priority
					}
			
			call.passFormDataWithoutCallback("BetaFeedback","editPriority",opt);
		}
	}

	fetchGeneralFeedback() {
		var $ = require ('jquery')
		var opt = {"email": betaEmail,
					"category": "general"};
		if(opt!=""){
			call.passFormData("BetaFeedback", "fetchAll", opt, function(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					isAnswer = true;
					$('#general-table').slideUp();
					for(var i =0; i < response.success.length; i++){
						if(response.success[i].question == "General othercomments") {
							$('#generalQuestion-6').val(response.success[i].answer);
							$('#generalQ6').attr("id",response.success[i].id);
						} else if(response.success[i].question == "General question1") {
							$('#generalQuestion-1').val(response.success[i].answer);
							$('#generalQ1').attr("id",response.success[i].id);							
						} else if(response.success[i].question == "General question2") {
							$('#generalQuestion-2').val(response.success[i].answer);
							$('#generalQ2').attr("id",response.success[i].id);							
						} else if(response.success[i].question == "General question3") {
							$('#generalQuestion-3').val(response.success[i].answer);
							$('#generalQ3').attr("id",response.success[i].id);							
						} else if(response.success[i].question == "General question4") {
							$('#generalQuestion-4').val(response.success[i].answer);
							$('#generalQ4').attr("id",response.success[i].id);							
						} else if(response.success[i].question == "General question5") {
							$('#generalQuestion-5').val(response.success[i].answer);
							$('#generalQ5').attr("id",response.success[i].id);
						}
		            	generalCount = true;
		            }
				} else {
					$('#general-table').slideToggle();
				}
	    	});
		}
	}

	fetchQuranFeedback() {
		var $ = require ('jquery')
		var opt = {"email": betaEmail,
					"category": "quran"};
		if(opt!=""){
			call.passFormData("BetaFeedback", "fetchAll", opt, function(data){
				var response = JSON.parse(data);
				$("#quran-table li").remove();
				if(response.state === 200) {

		            for(var i =0; i < response.success.length; i++){
		            	$('#quran-table')
						         .append(
						         	'<li class="c-summarylistinner" id="'+response.success[i].id+'">' +
		     							'<label>' + (i+1) + '.</label>' +
		     							'<div class="u-select__wrapper">' +
											'<select id="quranquestion-'+response.success[i].id+'" class="c-selection has-dropdown" ref="quranquestion">' +
											'</select>' +
											'<i class="fa fa-angle-down"></i>' +
										'</div>' +
		     							'<input id="qurananswer-'+response.success[i].id+'" class="o-form__input" type="text" />' +
		     							'<div class="u-select__wrapper">' +
											'<select id="quranpriority-'+response.success[i].id+'" class="c-selection has-dropdown" ref="quranpriority">' +
											'</select>' +
											'<i class="fa fa-angle-down"></i>' +
										'</div>' +
		     						'</li>');
						changeQuestion = changeQuestion.bind(this);
						$('#quranquestion-'+response.success[i].id).change(changeQuestion);
						changePriority = changePriority.bind(this);
						$('#quranpriority-'+response.success[i].id).change(changePriority);
		            	callApi(response.success[i].question, response.success[i].priority, response.success[i].id);
		            	$('#qurananswer-'+response.success[i].id).val(response.success[i].answer);
		            	quranCount=true;
		            }
				} else {
					$('#quran-table')
						 .append(
						 	'<li class="c-summarylistinner">' +
		     					'<label>No feedback submission.</label>' +
		     				'</li>');
		            	quranCount=false;
				}
	    	});
		}

		function callApi(question, priority, number) {
			var $ = require ('jquery')
	        var i = 0;
	        $.each(questionArray, function(key, value) {
	            $('#quranquestion-'+number)
	                .append($("<option></option>")
	                .attr("value",questionArray[i])
	                .text(questionArray[i]));
	            if(question.toLowerCase() == questionArray[i].toLowerCase()){
					$('#quranquestion-'+number+' option[value="'+questionArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
	        i = 0;
	        $.each(priorityArray, function(key, value) {
	            $('#quranpriority-'+number)
	                .append($("<option></option>")
	                .attr("value",priorityArray[i])
	                .text(priorityArray[i]));
	            if(priority.toLowerCase() == priorityArray[i].toLowerCase()){
					$('#quranpriority-'+number+' option[value="'+priorityArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
		}

		function changeQuestion(e){
			var $ = require ('jquery')			
			var id = e.target.id;
			id = id.split("-");
			var question = $('#quranquestion-'+id[1]).val();
			var id = e.target.parentNode.parentNode.id;

			id=parseInt(id);
			var opt = {"id": id,
						"question": question
					}
			
			call.passFormDataWithoutCallback("BetaFeedback","editQuestion",opt);
		}

		function changePriority(e){
			var $ = require ('jquery')			
			var id = e.target.id;
			id = id.split("-");
			var priority = $('#quranpriority-'+id[1]).val();
			var id = e.target.parentNode.parentNode.id;

			id=parseInt(id);
			var opt = {"id": id,
						"priority": priority
					}


			call.passFormDataWithoutCallback("BetaFeedback","editPriority",opt);
		}
	}

	fetchUserFeedback() {
		var $ = require ('jquery')
		var opt = {"email": betaEmail,
					"category": "account"};
		if(opt!=""){
			call.passFormData("BetaFeedback", "fetchAll", opt, function(data){
				var response = JSON.parse(data);
				$("#account-table li").remove();
				if(response.state === 200) {

		            for(var i =0; i < response.success.length; i++){
		            	$('#account-table')
						         .append(
						         	'<li class="c-summarylistinner" id="'+response.success[i].id+'">' +
		     							'<label>' + (i+1) + '.</label>' +
		     							'<div class="u-select__wrapper">' +
											'<select id="accountquestion-'+response.success[i].id+'" class="c-selection has-dropdown" ref="accountquestion">' +
											'</select>' +
											'<i class="fa fa-angle-down"></i>' +
										'</div>' +
		     							'<input id="accountanswer-'+response.success[i].id+'" class="o-form__input" type="text" />' +
		     							'<div class="u-select__wrapper">' +
											'<select id="accountpriority-'+response.success[i].id+'" class="c-selection has-dropdown" ref="accountpriority">' +
											'</select>' +
											'<i class="fa fa-angle-down"></i>' +
										'</div>' +
		     						'</li>');
						changeQuestion = changeQuestion.bind(this);
						$('#accountquestion-'+response.success[i].id).change(changeQuestion);
						changePriority = changePriority.bind(this);
						$('#accountpriority-'+response.success[i].id).change(changePriority);
		            	callApi(response.success[i].question, response.success[i].priority, response.success[i].id);
		            	$('#accountanswer-'+response.success[i].id).val(response.success[i].answer);
		            	accountCount=true;
		            }
				} else {
					$('#account-table')
						 .append(
						 	'<li class="c-summarylistinner">' +
		     					'<label>No feedback submission.</label>' +
		     				'</li>');
		            	accountCount=false;
				}
	    	});
		}

		function callApi(question, priority, number) {
			
			var $ = require ('jquery')
	        var i = 0;
	        $.each(questionArray, function(key, value) {
	            $('#accountquestion-'+number)
	                .append($("<option></option>")
	                .attr("value",questionArray[i])
	                .text(questionArray[i]));
	            if(question.toLowerCase() == questionArray[i].toLowerCase()){
					$('#accountquestion-'+number+' option[value="'+questionArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
	        i = 0;
	        $.each(priorityArray, function(key, value) {
	            $('#accountpriority-'+number)
	                .append($("<option></option>")
	                .attr("value",priorityArray[i])
	                .text(priorityArray[i]));
	            if(priority.toLowerCase() == priorityArray[i].toLowerCase()){
					$('#accountpriority-'+number+' option[value="'+priorityArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
		}

		function changeQuestion(e){
			var $ = require ('jquery')			
			var id = e.target.id;
			id = id.split("-");
			var question = $('#accountquestion-'+id[1]).val();
			var id = e.target.parentNode.parentNode.id;

			id=parseInt(id);
			var opt = {"id": id,
						"question": question
					}
			
			call.passFormDataWithoutCallback("BetaFeedback","editQuestion",opt);
		}

		function changePriority(e){
			var $ = require ('jquery')			
			var id = e.target.id;
			id = id.split("-");
			var priority = $('#accountpriority-'+id[1]).val();
			var id = e.target.parentNode.parentNode.id;

			id=parseInt(id);
			var opt = {"id": id,
						"priority": priority
					}
			

			call.passFormDataWithoutCallback("BetaFeedback","editPriority",opt);
		}
	}

	exit() {
		this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
		this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}

	handleAccordion(e) {
		var id = e.target.id;
		var $ = require ('jquery');
		var isVisible = $('#'+id+'table').is(':visible');
		if(isVisible){
			$('#'+id+'table').slideToggle();
			$('#'+id).children().children().removeClass("rotate");	
		}else {
			$('.o-summary-innerresults').slideUp();
			$('#'+id).children().children().removeClass("rotate");			
			$('#'+id+'table').slideToggle();
			$('#'+id).children().children().addClass("rotate");			
		}
	}

	componentDidMount() {
		var $ = require('jquery')
		$('#UserCPMenu').addClass('logout');
		$('.c-application-button').css('display','none');
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

		this.fetchMosqueFeedback();
		this.fetchQuranFeedback();
		this.fetchUserFeedback();
		this.fetchGeneralFeedback();
		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?
	}


	handleSubmit(e) {
		var $ = require ('jquery')
		var mosqueSummaryTotal = mosqueCount?$('#mosque-table').children().length:0;
		var quranSummaryTotal = quranCount?$('#quran-table').children().length:0;
		var accountSummaryTotal = accountCount?$('#account-table').children().length:0;
		for(var i = 0; i < mosqueSummaryTotal; i++) {
			var id=$('#mosque-table').children()[i].id;
			var opt = {
				"id": id,
				"answer": $('#mosqueanswer-'+id).val()
			}
			call.passFormData("BetaFeedback","editAnswer",opt,function(data){
				var response = JSON.parse(data)
			});
		}

		for(var i = 0; i < quranSummaryTotal; i++) {
			var id=$('#quran-table').children()[i].id;
			var opt = {
				"id": id,
				"answer": $('#qurananswer-'+id).val()
			}

			call.passFormData("BetaFeedback","editAnswer",opt,function(data){
				var response = JSON.parse(data)
			});
		}

		for(var i = 0; i < accountSummaryTotal; i++) {
			var id=$('#account-table').children()[i].id;
			var opt = {
				"id": id,
				"answer": $('#accountanswer-'+id).val()
			}

			call.passFormData("BetaFeedback","editAnswer",opt,function(data){
				var response = JSON.parse(data)
			});
		}
		if(!isAnswer) {
			var question1 = this.refs.generalQuestion1.value;
			var question2 = this.refs.generalQuestion2.value;
			var question3 = this.refs.generalQuestion3.value;
			var question4 = this.refs.generalQuestion4.value;
			var question5 = this.refs.generalQuestion5.value;
			var otherComments = this.refs.generalOtherComments.value;
			if(otherComments != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": otherComments,
					"priority": "Medium",
					"question": "General othercomments"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question1 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question1,
					"priority": "Medium",
					"question": "General question1"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question2 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question2,
					"priority": "Medium",
					"question": "General question2"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question3 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question3,
					"priority": "Medium",
					"question": "General question3"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question4 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question4,
					"priority": "Medium",
					"question": "General question4"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question5 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question5,
					"priority": "Medium",
					"question": "General question5"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
		} else {
			var generalSummaryTotal = generalCount?$('#general-table').children().length:0;
			for(var i = 0; i < generalSummaryTotal; i++) {
				var id=$('#general-table').children()[i].id;
				var opt = {
					"id": id,
					"answer": $('#generalQuestion-'+(i+1)).val()
				}

				call.passFormData("BetaFeedback","editAnswer",opt,function(data){
					var response = JSON.parse(data)
				});
			}
		}

		this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
	}

	handleFinish(e) {
		var $ = require ('jquery')
		var mosqueSummaryTotal = mosqueCount?$('#mosque-table').children().length:0;
		var quranSummaryTotal = quranCount?$('#quran-table').children().length:0;
		var accountSummaryTotal = accountCount?$('#account-table').children().length:0;

		for(var i = 0; i < mosqueSummaryTotal; i++) {
			var id=$('#mosque-table').children()[i].id;
			var opt = {
				"id": id,
				"answer": $('#mosqueanswer-'+id).val()
			}
			call.passFormData("BetaFeedback","editAnswer",opt,function(data){
				var response = JSON.parse(data)
			});
		}

		for(var i = 0; i < quranSummaryTotal; i++) {
			var id=$('#quran-table').children()[i].id;
			var opt = {
				"id": id,
				"answer": $('#qurananswer-'+id).val()
			}

			call.passFormData("BetaFeedback","editAnswer",opt,function(data){
				var response = JSON.parse(data)
			});
		}

		for(var i = 0; i < accountSummaryTotal; i++) {
			var id=$('#account-table').children()[i].id;
			var opt = {
				"id": id,
				"answer": $('#accountanswer-'+id).val()
			}

			call.passFormData("BetaFeedback","editAnswer",opt,function(data){
				var response = JSON.parse(data)
			});
		}

		if(!isAnswer) {
			var question1 = this.refs.generalQuestion1.value;
			var question2 = this.refs.generalQuestion2.value;
			var question3 = this.refs.generalQuestion3.value;
			var question4 = this.refs.generalQuestion4.value;
			var question5 = this.refs.generalQuestion5.value;
			var otherComments = this.refs.generalOtherComments.value;
			if(otherComments != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": otherComments,
					"priority": "Medium",
					"question": "General othercomments"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question1 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question1,
					"priority": "Medium",
					"question": "General question1"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question2 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question2,
					"priority": "Medium",
					"question": "General question2"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question3 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question3,
					"priority": "Medium",
					"question": "General question3"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question4 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question4,
					"priority": "Medium",
					"question": "General question4"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
			if(question5 != "") {
				var opt = {
					"email": betaEmail,
					"category": "General",
					"answer": question5,
					"priority": "Medium",
					"question": "General question5"
				}
				call.passFormData("BetaFeedback","add",opt,function(data){
					var response = JSON.parse(data)
				});
			}
		} else {
			var generalSummaryTotal = generalCount?$('#general-table').children().length:0;
			for(var i = 0; i < generalSummaryTotal; i++) {
				var id=$('#general-table').children()[i].id;
				var opt = {
					"id": id,
					"answer": $('#generalQuestion-'+(i+1)).val()
				}

				call.passFormData("BetaFeedback","editAnswer",opt,function(data){
					var response = JSON.parse(data)
				});
			}
		}

		this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}


  render() {
    return (
     	<InlineCss stylesheet={FeedbackSummary.css(this.props.arabic)} namespace="FeedbackSummary">
     		<div className="o-background-color"></div>  
     		<div className="o-summary-container">   			
     			<div className="o-summary-form">
	     			<header>   				
	     				<h3>Feedback Summary</h3>
	     			</header>
	     			<div className="o-summary-wrapper">
	     				<ul className="o-summary-results">
	     					<li className="c-summarylist">
	     						<div className="c-summarylist-container">
	     							<h4 id="general-" onClick={this.handleAccordion.bind(this)}>General Question <span className="accordian-arrow"><i className="fa fa-angle-right"></i></span></h4>
	     							<ul className="o-summary-innerresults" id="general-table">
		     							<li className="c-summarylistinner" id="generalQ1">
		     								<div className="o-summarycomments__form">
						     					<label>What is your first impression of Noor? Please explain.</label>
												<textarea ref="generalQuestion1" id="generalQuestion-1"/>
						     				</div>
		     							</li>
		     							<li className="c-summarylistinner" id="generalQ2">
		     								<div className="o-summarycomments__form">
						     					<label>Do you think Noor would be of benefit to you or make your life easier? Please explain.</label>
												<textarea ref="generalQuestion2" id="generalQuestion-2"/>
						     				</div>
		     							</li>
		     							<li className="c-summarylistinner" id="generalQ3">
		     								<div className="o-summarycomments__form">
						     					<label>Would you download the Noor app, and why/why not? Yes or No. Please explain.</label>
												<textarea ref="generalQuestion3" id="generalQuestion-3"/>
						     				</div>
		     							</li>
		     							<li className="c-summarylistinner" id="generalQ4">
		     								<div className="o-summarycomments__form">
						     					<label>What is your favorite of the three features presented in the beta run? Please explain.</label>
												<textarea ref="generalQuestion4" id="generalQuestion-4"/>
						     				</div>
		     							</li>
		     							<li className="c-summarylistinner" id="generalQ5">
		     								<div className="o-summarycomments__form">
						     					<label>What is your least favorite feature, and why?</label>
												<textarea ref="generalQuestion5" id="generalQuestion-5"/>
						     				</div>
		     							</li>
		     							<li className="c-summarylistinner" id="generalQ6">
		     								<div className="o-summarycomments__form">
						     					<label>Any other comment?</label>
												<textarea ref="generalOtherComments" id="generalQuestion-6"/>
						     				</div>
		     							</li>
		     						</ul>
	     						</div>
	     					</li>
	     					<li className="c-summarylist">
	     						<div className="c-summarylist-container">
	     							<h4 id="mosque-" onClick={this.handleAccordion.bind(this)}>Mosque Finder <span id="mosque-" className="accordian-arrow"><i className="fa fa-angle-right"></i></span></h4>
	     							<ul className="o-summary-innerresults" id="mosque-table">
		     							<li className="c-summarylistinner">
		     								
		     							</li>
		     						</ul>
	     						</div>
	     					</li>
	     					<li className="c-summarylist">
	     						<div className="c-summarylist-container">
	     							<h4 id="quran-" onClick={this.handleAccordion.bind(this)}>The Holy Qu'ran <span id="quran-" className="accordian-arrow"><i className="fa fa-angle-right"></i></span></h4>
	     							<ul className="o-summary-innerresults" id="quran-table">
		     							<li className="c-summarylistinner">
		     								
		     							</li>
		     						</ul>
	     						</div>
	     					</li>
	     					<li className="c-summarylist">
	     						<div className="c-summarylist-container">
	     							<h4 id="account-" onClick={this.handleAccordion.bind(this)}>My Account <span id="account-" className="accordian-arrow"><i className="fa fa-angle-right"></i></span></h4>
	     							<ul className="o-summary-innerresults" id="account-table">
		     							<li className="c-summarylistinner">
		     								
		     							</li>
		     						</ul>
	     						</div>
	     					</li>
	     				</ul>	     				
	     				<div className="o-summary__action">
	     					<button className="is-save" onClick={this.handleSubmit.bind(this)}>Save & Exit</button>
	     					<button className="is-finish" onClick={this.handleFinish.bind(this)}>Finish & Submit</button>
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

				.o-summary__action > button {
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

				.o-summary__action {
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					padding: 0 20%;
				}

				.o-summarycomments__form {
					display: flex;
				    flex-direction: column;
				    color: #4D4D4D;
				    padding: 1em 0;
				    width: 100%;
				}

				.o-summarycomments__form label {
					padding-bottom: 0.5em;
				}

				.o-summarycomments__form > textarea {
					margin: 0px;
				    width: 100%;
				    border: 1px solid rgba(0,0,0,0.075);
				    background-color: rgba(255,255,255,0.66);
				    min-height: 140px;
				}

				ul.o-summary-innerresults li {
					display: flex;
					font-size: 0.8em;
					padding-bottom: 11px;
				}

				li.c-summarylistinner > .u-select__wrapper {
					margin: 0 8px;
				}

				li.c-summarylistinner > input, li.c-summarylistinner > .u-select__wrapper > select{
					border: 1px solid rgba(0,0,0,0.075);
					box-shadow: 0 1px 3px rgba(0,0,0,0.075);
				}

				.c-summarylist-container > h4 {
					font-weight: 500;
					font-size: 1em;
					color: #4D4D4D;
				}

				.c-summarylist-container > h4 > span{
					margin-left: 5px;
				}

				#mosque-, #quran-, #account-, #general- {
					cursor: pointer;
				}

				#mosque-table, #quran-table, #account-table, #general-table{
					display: none;
					padding-top: 16px;
				}

				.rotate {
					-webkit-transform: rotate(90deg);
					-moz-transform: rotate(90deg);
					-ms-transform: rotate(90deg);
					-o-transform: rotate(90deg);
					transform: rotate(90deg);
				}

				.o-form__input {
					display: block;
					width: 100%;
					padding: 6px 12px;
					background-color: white;
					border: 1px solid rgba(0,0,0,0.075);
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.2rem;
					font-weight: 500;
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

				select {
					padding: 6px 21px 6px 11px;
					display: block;
					background-color: transparent;
					color: #4D4D4D!important;
					border: 1px solid rgba(0,0,0,0.075);
					border-radius: 2px;
					font-size: 1.2rem;
					line-height: 1.42857143;
					transition: border-color ease-in-out .15s;
					-webkit-appearance: none;
					-moz-appearance: none;
	    			appearance: none;
	    			z-index: 1;
	    			outline: none;
				}
				select:hover, select:focus {
					border-color: #E0DDD6;
				}

				.u-select__wrapper {
					position: relative;
					background-color: white;
					height: 1em;
					margin-bottom: 1em;
				}
				.u-select__wrapper > i {
					position: absolute;
					top: -7px;
					right: 10px;
					height: 46px;
					line-height: 46px;
					font-size: inherit;
					color: #4D4D4D;
					z-index: 1;
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

				ul { 
					list-style:none;
				}
				.o-summary-wrapper {
					width:100%;
					height: auto;
					font-size:1.0em;
					font-weight: 500;
				}

				.o-summary-wrapper ul li.c-summarylist{
					padding: 1em 0;
					border-bottom: 1px solid #DDDDDD;
				}
				.o-background-color {
					background-color: #ECE8E1;
					width: 100%;
					height: 30em;
    				z-index: -1;
    				position: absolute;
				}	
				& > .o-summary-container .o-summary-form {
					padding: 2em;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color:white;
					box-shadow: 0px 1px 3px #999999;
				}

				& > .o-summary-container {
					padding: 5% 22% 5%;		
				}

				.o-summary-form > header > h3 {
					font-weight: 600;
					font-size: 2.0em;
					line-height: 1em;
					color: #4D4D4D;
					padding-bottom: 1em;
					text-align: -webkit-center;
					text-align: center;
					text-align: -moz-center;
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 180px) and (max-width: 767px) {
					& > .o-summary-container {
						padding: 5% 12% 5%;		
					}

					.o-summary__action {
						flex-direction: column;
						padding: 0 0;
					}

					.o-summary__action > button {
						width: 100%;
					}

					.o-summary-form > header > h3 {
						font-size: 1.0em;
					}

					ul.o-summary-innerresults li {
						flex-direction: column;
					}

					li.c-summarylistinner > .u-select__wrapper {
						width: 100%;
						flex-basis: 40px;
					}

					li.c-summarylistinner > .u-select__wrapper > select {
						width: 100%;
					}

					li.c-summarylistinner > input {
						margin: 0px 8px 11px 8px;
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-summary-container {
						padding: 5% 22% 5%;		
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

FeedbackSummary.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default FeedbackSummary;