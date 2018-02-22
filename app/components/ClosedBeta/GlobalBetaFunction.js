import toastr from 'toastr';

//////////////export functions///////////////////
let GlobalBetaFunction = {

	editSteps: function(opts) {
		var $ = require ('jquery')

		var request =  [
					"BetaUserData",
					"editSteps",
					opts];

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
					else {
					}
				}.bind(this)
		});
	},


	compareTimeStart: function(email, callback) {
		var $ = require ('jquery')
		var request =  [
					"BetaUserData",
					"compareTimeStart",
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
						callback(response.success);
					}
					else {
					}
				}.bind(this)
		});
	},

	compareTimeExpired: function(email, callback) {
		var $ = require ('jquery')
		var request =  [
					"BetaUserData",
					"compareTimeExpired",
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
						callback(response.success);

					}
					else {
					}
				}.bind(this)
		});
	},

	addBetaUserTimeStart: function(email, callback) {
		var $ = require ('jquery')
		var request =  [
					"BetaUserData",
					"addTimeStart",
					email];
		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getUserEmailToken: function(opts, callback) {
		var $ = require ('jquery')
		var request =  [
					"BetaUserData",
					"fetch",
					opts];		
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
					callback(data);
				}.bind(this)
		});
	},

	getFeedbackModal: function(category, callback) {
		var $ = require ('jquery')
		var request =  [
					"BetaQuestion",
					"fetchByCategory",
					category];

		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					var modalQuestion = 
					'<div id="myModal" class="modal">' +
						'<div class="modal-content">' +
							'<button class="closeModalBtn"><i class="material-icons">close</i></button>' +
							'<div class="o-question-wrapper">' +
			     				'<ul class="o-question-container">' +			     					
			     					'<li class="c-questionlist">' +
			     						'<div class="c-questionlist-container">' +
			     							'<h1>Questions &amp; Comments</h1>' +
			     							'<div class="c-errorClass"></div>' +
			     							'<ol class="o-question-inner" id="question-table">' +
				     							'<li class="c-questionlistener">' +
				     								'<label>1.</label>' +
				     								'<div class="u-select__wrapper">' +
														'<select id="'+category+'-question-1" class="c-selection has-dropdown" ref="'+category+'question">' +
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
					     								'<input id="'+category+'answer1" class="o-form__input" type="text" placeholder="Comment..." />' +
					     							'<div class="u-select__wrapper">' +
														'<select id="'+category+'-priority-1" class="c-selection has-dropdown" ref="'+category+'priority">' +
															'<option selected disabled>-- Choose Priority --</option>' +
															'<option value="Low">Low</option>' +
															'<option value="Medium">Medium</option>' +
															'<option value="High">High</option>' +
															'<option value="Urgent">Urgent</option>' +
															'<option value="Critical">Critical</option>' +
														'</select>' +
														'<i class="fa fa-angle-down"></i>' +
													'</div>' + 
				     							'</li>' +
				     							'<li class="c-questionlistener">' +
				     								'<label>2.</label>' +
				     								'<div class="u-select__wrapper">' +
														'<select id="'+category+'-question-2" class="c-selection has-dropdown" ref="'+category+'question">' +
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
					     								'<input id="'+category+'answer2" class="o-form__input" type="text" placeholder="Comment..." />' +
					     							'<div class="u-select__wrapper">' +
														'<select id="'+category+'-priority-2" class="c-selection has-dropdown" ref="'+category+'priority">' +
															'<option selected disabled>-- Choose Priority --</option>' +
															'<option value="Low">Low</option>' +
															'<option value="Medium">Medium</option>' +
															'<option value="High">High</option>' +
															'<option value="Urgent">Urgent</option>' +
															'<option value="Critical">Critical</option>' +
														'</select>' +
														'<i class="fa fa-angle-down"></i>' +
													'</div>' + 
				     							'</li>' +'<li class="c-questionlistener">' +
				     								'<label>3.</label>' +
				     								'<div class="u-select__wrapper">' +
														'<select id="'+category+'-question-3" class="c-selection has-dropdown" ref="'+category+'question">' +
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
					     								'<input id="'+category+'answer3" class="o-form__input" type="text" placeholder="Comment..." />' +
					     							'<div class="u-select__wrapper">' +
														'<select id="'+category+'-priority-3" class="c-selection has-dropdown" ref="'+category+'priority">' +
															'<option selected disabled>-- Choose Priority --</option>' +
															'<option value="Low">Low</option>' +
															'<option value="Medium">Medium</option>' +
															'<option value="High">High</option>' +
															'<option value="Urgent">Urgent</option>' +
															'<option value="Critical">Critical</option>' +
														'</select>' +
														'<i class="fa fa-angle-down"></i>' +
													'</div>' + 
				     							'</li>' +
				     						'</ol>' +
			     						'</div>' +
			     					'</li>' +
			     					'<div class="o-newquestion-list">' +
			     						'<button class="add-new">+ Another comment</button>' +
			     					'</div>' +
			     					'<hr></hr>' +	     					
			     					'<li class="c-questionlist">' +
			     						'<div class="o-summarycomments__form">' +
					     					'<label>Any other comment?</label>' +
											'<textarea id="othercomment" ref="othercomments" />' +
					     				'</div>' +
			     					'</li>' +
			     					'<li class="c-questionlist">' +
			     						'<div class="o-summary__action">' +
					     					'<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent is-save">Save & Exit</button>' +
					     				'</div>' +
			     					'</li>' +
			     				'</ul>' +
			     			'</div>'
						'</div>' +
					'</div>';
					callback(modalQuestion);					
				}.bind(this)
		});
	},

	addUserFeedback: function(feedback) {
		var $ = require ('jquery')
		var request =  [
					"BetaFeedback",
					"add",
					feedback];

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
					else {
						toastr.error("Error in loading database!");
					}
					
					
				}.bind(this)
		});
	},

	isCommentValid: function(comment) {
		var re = /([\u0600-\u06FF]|^[A-Za-z ]+$)+/;
		return re.test(comment);
	},

	validateFeedbackForm: function(category) {
		var comment=0;
		var extraComment = false;
		var errorText = "";
		var $ = require('jquery');
		var totalField = $('.o-question-inner').children().length+1;
		for(var i=1; i<totalField; i++) {

			if($('#'+category+'answer'+i).val() != "") {
				comment++;
				if($('#'+category+'-question-'+i).val() == "" || $('#'+category+'-question-'+i).val() == null) {
					errorText = "Please choose type of bug you would like to comment.";
				}  
				else if($('#'+category+'-priority-'+i).val() == "" || $('#'+category+'-priority-'+i).val() == null) {
					errorText = "Please choose the priority of your comment.";
				}
				if(!this.isCommentValid($('#'+category+'answer'+i).val())) {
					errorText = "English and Arabic character only.";
				}
			} 
		}
		
		if($("#othercomment").val() == "" && comment == 0) {
			errorText = "Please fill out at least one comment to save.";
		} else if($("#othercomment").val() != "" && errorText == "") {
			if(this.isCommentValid($("#othercomment").val())) {
				extraComment = true;
			} else {
				errorText = "English and Arabic character only.";
			}			
		}		
		
		var validateArray = {
		  answerFill: comment,
		  extraFill: extraComment,
		  errorMsg: errorText
		};
		return validateArray;
	}

};
export default GlobalBetaFunction;