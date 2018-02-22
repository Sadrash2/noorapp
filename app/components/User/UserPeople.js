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
import globalFunction from "../../components/GlobalFunction";
import toastr from 'toastr';
import css from "./userCss";

var id, stateCity, countryState, password,betaEmail,token;
var $ = require('jquery');
class UserPeople extends React.Component {

	constructor(args) {
		super(args);
	}

	fetchFriendRequest() {
		var opt = betaEmail;
		if(opt!=""){
			globalFunction.getUserFriendRequest(opt, function(data){
				var response = JSON.parse(data);
				$("#people-table li").remove();
       			$('#fallback-people').hide();

				if(response.state === 200) {

		            for(var i =0; i < response.success.length; i++){
		            	$('#people-table')
						         .append(
						         	'<li id="friendrequestContainer-'+i+'" class="c-usercpcontent">' +
										'<img class="c-usercpcontent__avatar" src="app/assets/images/content/promotional/users/default-profile.jpg" />' +
										'<div class="c-usercpcontent__wrap">' +
											'<h2>'+response.success[i].firstName+'</h2>' +
											'<p id="friendrequestName-'+i+'">'+response.success[i].emailSent+'</p>' +
											'<div class="u-select__wrapper">' +
												'<select id="relationrequest-'+i+'" class="c-selection has-dropdown" ref="relation" >' +
												'</select>' +
												'<i class="fa fa-angle-down"></i>' +
											'</div>' +
										'</div>' +
										'<div class="c-usercpcontent-button__wrap">' +
											'<button id="approveFriendRequest-'+i+'" type="button" class="c-actionfriend c-check" aria-haspopup="true" aria-expanded="false">' +
												'<i id="approveFriendRequestfa-'+i+'" class="fa fa-check"></i>' +
											'</button>' +
											'<button id="disapproveFriendRequest-'+i+'" type="button" class="c-actionfriend c-close" aria-haspopup="true" aria-expanded="false">' +
												'<i id="disapproveFriendRequestfa-'+i+'" class="fa fa-close"></i>' +
											'</button>' +
										'</div>' +
									'</li>');
						approveClick = approveClick.bind(this);
						$('#approveFriendRequest-'+i).click(approveClick);
						disapprovalClick = disapprovalClick.bind(this);
						$('#disapproveFriendRequest-'+i).click(disapprovalClick);
						changeRelation = changeRelation.bind(this);
						$('#relationrequest-'+i).change(changeRelation);
		            	callApi(response.success[i].relation, i);
		            }
				}else {
       				$('#fallback-people').show();

				}
	    	});
		}

		function callApi(relation, number) {
			var relationArray = ["Family", "Friend","Acquaintance"];
	        var i = 0;
	        $.each(relationArray, function(key, value) {
	            $('#relationrequest-'+number)
	                .append($("<option></option>")
	                .attr("value",relationArray[i])
	                .text(relationArray[i]));
	            if(relation == relationArray[i].toLowerCase()){
					$('#relationrequest-'+number+' option[value="'+relationArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
		}

		function approveClick(e){	
			var id = e.target.id;
			id = id.split("-");
			if(id[0] == "approveFriendRequestfa"){
				var friendId = e.target.parentNode.parentNode.parentNode.id;
			}else {				
				var friendId = e.target.parentNode.parentNode.id;
			}
			var emailRequest = $('#friendrequestName-'+id[1]).text();
			var opt = {"emailRequest": betaEmail,
						"emailSent": emailRequest
					}
			globalFunction.editFriendApproval(opt, function(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					$('#'+friendId).toggle( "slide" );
					toastr.success('Friend Approved');

				}
	    	});
		}

		function disapprovalClick(e){		
			var id = e.target.id;
			id = id.split("-");
			if(id[0] == "disapproveFriendRequestfa"){
				var friendId = e.target.parentNode.parentNode.parentNode.id;
			}else {				
				var friendId = e.target.parentNode.parentNode.id;
			}
			var emailRequest = $('#friendrequestName-'+id[1]).text();
			var opt = {"emailRequest": betaEmail,
						"emailSent": emailRequest
					}
			globalFunction.editFriendDisapproval(opt, function(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					toastr.success('Friend Removed');
					$('#'+friendId).toggle( "slide" );
				}
	    	});
		}

		function changeRelation(e){		
			var id = e.target.id;
			id = id.split("-");
			var emailRequest = $('#friendrequestName-'+id[1]).text();
			var opt = {"emailRequest": betaEmail,
						"emailSent": emailRequest,
						"relation": $('#'+e.target.id).val().toLowerCase()
					}
			globalFunction.editFriendRelation(opt);
			toastr.success('Relation Changed');
		}
	}

	fetchFriendInvite() {
		var opt = betaEmail;
		if(opt!=""){
			globalFunction.getUserFriendInvite(opt, function(data){
				var response = JSON.parse(data);
       			$('#fallback-people').hide();
				$("#people-table li").remove();
				if(response.state === 200) {
		            for(var i =0; i < response.success.length; i++){
		            	$('#people-table')
						         .append(
						         	'<li class="c-usercpcontent" id="inviteContainer-'+i+'">' +
										'<img class="c-usercpcontent__avatar" src="app/assets/images/content/promotional/users/default-profile.jpg" />' +
										'<div class="c-usercpcontent__wrap">' +
											'<h2 id="inviteFriendName-'+i+'">'+response.success[i].emailRequest+'</h2>' +
											'<div class="u-select__wrapper">' +
												'<select id="relationinvite-'+i+'" class="c-selection has-dropdown" ref="relation" >' +
												'</select>' +
												'<i class="fa fa-angle-down"></i>' +
											'</div>' +
										'</div>' +
										'<button id="removeInvitation-'+i+'" type="button" class="c-remove" aria-haspopup="true" aria-expanded="false">' +
											'<i id="removeInvitationfa-'+i+'" class="fa fa-close"></i>' +
										'</button>' +
									'</li>');
						deleteClick = deleteClick.bind(this);
						$('#removeInvitation-'+i).click(deleteClick);
						changeRelation = changeRelation.bind(this);
						$('#relationinvite-'+i).change(changeRelation);
		            	callApi(response.success[i].relation, i);
		            }
				}else {
       				$('#fallback-people').show();

				}
	    	});
		}

		function callApi(relation, number) {
			var relationArray = ["Family", "Friend","Acquaintance"];
	        var i = 0;
	        $.each(relationArray, function(key, value) {
	            $('#relationinvite-'+number)
	                .append($("<option></option>")
	                .attr("value",relationArray[i])
	                .text(relationArray[i]));
	            if(relation == relationArray[i].toLowerCase()){
					$('#relationinvite-'+number+' option[value="'+relationArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
		}

		function deleteClick(e){	
			var id = e.target.id;
			id = id.split("-");
			if(id[0] == "removeInvitationfa"){
				var friendId = e.target.parentNode.parentNode.id;
			}else {				
				var friendId = e.target.parentNode.id;
			}
			var emailRequest = $('#inviteFriendName-'+id[1]).text();
			var opt = {"emailSent": betaEmail,
						"emailRequest": emailRequest
					}
			globalFunction.editFriendDisapproval(opt, function(data){
				var response = JSON.parse(data);

				if(response.state === 200) {
					$('#'+friendId).toggle( "slide" );
					toastr.success('Friend Removed');
				}
	    	});
		}

		function changeRelation(e){
			var id = e.target.id;
			id = id.split("-");
			var emailRequest = $('#inviteFriendName-'+id[1]).text();
			var opt = {"emailSent": betaEmail,
						"emailRequest": emailRequest,
						"relation": $('#'+e.target.id).val().toLowerCase()
					}
			globalFunction.editFriendRelation(opt);
					toastr.success('Relation Changed');
		}
	}

	fetchFriendBlocked() {
		var opt = betaEmail;
		if(opt!=""){
			globalFunction.getBlockedFriendFetch(opt, function(data){
				var response = JSON.parse(data);
				$("#people-table li").remove();
       			$('#fallback-people').hide();
				var friendBlockedName, friendBlockedState;
				if(response.state === 200) {
		            for(var i =0; i < response.success.length; i++){
		            	if(opt == response.success[i].emailRequest){
		            		friendBlockedName = response.success[i].emailSent;
		            		friendBlockedState = "Sent";
		            	}else{
		            		friendBlockedName = response.success[i].emailRequest;
		            		friendBlockedState = "Request";
		            	}
		            	var friendDetail = {"friendBlockedState":friendBlockedState,"count":i}
		            	globalFunction.getUserCustomizeFetch(friendBlockedName, friendDetail, displayList);
		            }
				}else {
	       			$('#fallback-people').show();
	       		}
	    	});
		}

		function displayList(data, friendDetail){
			var response = JSON.parse(data);
			$('#people-table')
			         .append(
			         	'<li class="c-usercpcontent" id="blockedfriendsContainer-'+friendDetail.count+'">' +
							'<img class="c-usercpcontent__avatar" src="app/assets/images/content/promotional/users/default-profile.jpg" />' +
							'<div class="c-usercpcontent__wrap">' +
								'<h2 id="friendBlockedName-'+friendDetail.count+'">'+response.success.firstName+'</h2>' +
								'<p id="friendBlockedState-'+friendDetail.count+'">'+friendDetail.friendBlockedState+'</p>' +
								'<label id="friendBlockedEmail-'+friendDetail.count+'" class="c-usercpcontent__email">' +
									response.success.email +
								'</label>' +
							'</div>' +
							'<button id="unblockfriend-'+friendDetail.count+'" class="c-remove">' +
								'<i id="unblockfriendfa-'+friendDetail.count+'" class="fa fa-close"></i>' +
							'</button>' +
						'</li>');
			deleteClick = deleteClick.bind(this);
			$('#unblockfriend-'+friendDetail.count).click(deleteClick);
		}

		function deleteClick(e){		
			var id = e.target.id;
			id = id.split("-");
			if(id[0] == "removeInvitationfa"){
				var friendId = e.target.parentNode.parentNode.parentNode.id;
			}else {				
				var friendId = e.target.parentNode.parentNode.id;
			}
			var friendBlockedState = $('#friendBlockedState-'+id[1]).text();
			if(friendBlockedState == "Sent") {
				var emailSent = $('#friendBlockedEmail-'+id[1]).text();
				var emailRequest = betaEmail;
			}else {
				var emailRequest = $('#friendBlockedEmail-'+id[1]).text();
				var emailSent = betaEmail;
			}
			var opt = {"emailSent": emailSent,
						"emailRequest": emailRequest
					}
			globalFunction.editUnblockFriend(opt, function(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					$('#'+friendId).toggle( "slide" );
					toastr.success('Friend Unblocked');
				}
	    	});
		}
	}

	handleInviteClick(e){
		var email = this.refs.inviteInput.value;

		var validateFinal = validation.ForgetPasswordValidation(email);

		let emailSent = betaEmail;
		$('#fallbackmessageinvites li').remove();

		//email
		if (validateFinal.valid == false) {
			document.getElementById('inviteInput').className='is-required';
			$('#inviteInput').parent().parent().find('.alert').html(validateFinal.message);
			$('#inviteInput').parent().parent().find('.alert').show();
		} else {
			document.getElementById('inviteInput').className='c-usercpcontent-input';
			$('#inviteInput').parent().parent().find('.alert').hide();

			validateFriend = validateFriend.bind(this);
			validateFriend(email, emailSent);
		}

		//validate if friend request exists
		function validateFriend(email, emailSent){

			var opt = {"friendemail": email,
						"email": emailSent
					}

			var request =  [
					"UserFriend",
					"validateFriend",
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
							$('#inviteInput').parent().parent().find('.alert').html("Friend Existed");
							$('#inviteInput').parent().parent().find('.alert').show();
							
						} else {
							addFriend = addFriend.bind(this);
							addFriend(email, emailSent);
							$('#inviteInput').parent().parent().find('.alert').hide();
						}
					this.refs.inviteInput.value = null;


					}.bind(this)
				});
		}

		//Add Friend Request to user_friend table
		function addFriend(email, emailSent){

			var opt = {"emailRequest": email,
						"emailSent": emailSent
					}

			var request =  [
					"UserFriend",
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
							this.fetchFriendInvite();
							toastr.success('Friend Invition Sent');
						}
					}.bind(this)
				});
		}
	}

	handleSync(e) {
		window.location.reload();
		if(e.target.id == "fb"){
			window.location.replace("syncgoogle?email="+betaEmail+"&token="+token+"#fb");
		}else {
			window.location.replace("syncgoogle?email="+betaEmail+"&token="+token+"#google");
		}
	}

    componentDidMount(){
    	var $ = require ('jquery')
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
			$('#fallback-people').hide();
       		$('#invite-sync').hide();
       		$('#invite-bar').hide();
			this.fetchFriendRequest();
			$('#Requests-tab').addClass('active');
	   	}
       	
    }

    handleTab(e){
    	$('.c-userpeopletab__button').removeClass('active');
    	var id = e.target.id;
    	$('#'+id).addClass('active');
    	id = id.split('-');
    	var category = id[0];
    	if(category === "Requests"){
    		this.fetchFriendRequest();
    		$('#invite-sync').hide();
       		$('#invite-bar').hide();
    	}else if (category === "Invites"){
    		this.fetchFriendInvite();
    		$('#invite-sync').show();
       		$('#invite-bar').show();
    	}else {
    		this.fetchFriendBlocked();
    		$('#invite-sync').hide();
       		$('#invite-bar').hide();
    	}
    }

	render() {

		return (	
			<InlineCss stylesheet={css.userEmpty(this.props.arabic)} namespace="UserPeople">
				<div className="o-usercpcontent-container">
					<div className="o-userpeople__tab">							
						<button id="Requests-tab" className="c-userpeopletab__button" onClick={this.handleTab.bind(this)}>
							Requests
						</button>
						<button id="Invites-tab" className="c-userpeopletab__button" onClick={this.handleTab.bind(this)}>
							Invites
						</button>
						<button id="Blocked-tab" className="c-userpeopletab__button" onClick={this.handleTab.bind(this)}>
							Blocked
						</button>
					</div>
					<div className="o-usercpcontent-sync__form" id="invite-sync">
						<div className="o-userinvite-padding">
							<label>
								{lang(this.props.language, "inviteElementSync")}
							</label>
							<i className="fa fa-google-plus" id="google" onClick={this.handleSync.bind(this)}></i>
							<i className="fa fa-facebook-square" id="fb" onClick={this.handleSync.bind(this)}></i>
						</div>
					</div>
					<div className="o-usercpcontent-bar" id="invite-bar">
						<div className="o-userinvite-padding">
							<input className="c-usercpcontent-input" placeholder={lang(this.props.language, "invitePlaceholderEmail")} id="inviteInput" ref="inviteInput" />
							<button className="c-usercpcontent-input__action is-orangeprimary" onClick={this.handleInviteClick.bind(this)}>
								{lang(this.props.language, "inviteControlInvite")}
							</button>
						</div>
						<div className="alert text-danger"></div>
					</div>
					<div className="o-container c-usercpcontent__form">
						<div id="fallback-people" className="o-usercpcontent-padding o-usercpcontent-fallback">
							<label>{lang(this.props.language, "friendFamiyElementFallback")}</label>
						</div>
						<div className="c-usercpcontent-content">
							<div className="c-userfriend-has-padding">
								<div id="scroll-container">
									<ul className="o-usercpcontent-results" id="people-table">
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</InlineCss>
		);
	}


};

UserPeople.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserPeople;