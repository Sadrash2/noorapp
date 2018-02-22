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

var id, stateCity, countryState, password, betaEmail;
var $ = require('jquery');

class UserFriendsFamily extends React.Component {

	constructor(args) {
		super(args);
	}

    fetchFriend(friendsfamilyrelation){
		var user = betaEmail;
		var opt = { "email" : user,
					"filter": friendsfamilyrelation};
		if(opt!=""){
			globalFunction.getUserFriendFetch(opt, function(data){
				var response = JSON.parse(data);
				$("#friendsfamily-table li").remove();
       			$('#fallback').hide();
				var friendFamilyName, friendFamilyState;
				if(response.state === 200) {
		            for(var i = 0; i < response.success.length; i++){
		            	if(user == response.success[i].emailRequest){
		            		friendFamilyName = response.success[i].emailSent;
		            		friendFamilyState = "Sent";
		            	}else{
		            		friendFamilyName = response.success[i].emailRequest;
		            		friendFamilyState = "Request";
		            	}
						var friendDetail = {"friendFamilyState":friendFamilyState,"count":i,"friendsfamilyrelation":response.success[i].relation}
		            	globalFunction.getUserCustomizeFetch(friendFamilyName, friendDetail, displayList);
		            }
				}else {
       				$('#fallback').show();

				}
	    	});
		}

		function displayList(data, friendDetail){
			var response = JSON.parse(data);
			$('#friendsfamily-table')
			         .append(
			         	'<li class="c-usercpcontent" id="friendsfamilyContainer-'+friendDetail.count+'">' +
							'<img class="c-usercpcontent__avatar" src="app/assets/images/content/promotional/users/default-profile.jpg" />' +
							'<div class="c-usercpcontent__wrap">' +
								'<h2 id="friendFamilyName-'+friendDetail.count+'">'+response.success.firstName+'</h2>' +
								'<p id="friendFamilyState-'+friendDetail.count+'">'+friendDetail.friendFamilyState+'</p>' +
								'<p id="friendFamilyEmail-'+friendDetail.count+'">'+response.success.email+'</p>' +
								'<div class="u-select__wrapper">' +
									'<select id="friendsfamilyrelation-'+friendDetail.count+'" class="c-selection has-dropdown" ref="friendsfamilyrelation" >' +
									'</select>' +
									'<i class="fa fa-angle-down"></i>' +
								'</div>' +
							'</div>' +
							'<button id="blockFriendsFamilyRequest-'+friendDetail.count+'" type="button" class="c-remove" aria-haspopup="true" aria-expanded="false">' +
								'<i id="blockFriendsFamilyRequestfa-'+friendDetail.count+'" class="fa fa-close"></i>' +
							'</button>' +
						'</li>');
			deleteClick = deleteClick.bind(this);
			$('#blockFriendsFamilyRequest-'+friendDetail.count).click(deleteClick);
			changeRelation = changeRelation.bind(this);
			$('#friendsfamilyrelation-'+friendDetail.count).change(changeRelation);
			callApi(friendDetail.friendsfamilyrelation, friendDetail.count);
		}

		function callApi(friendsfamilyrelation, number) {
			var friendsfamilyrelationArray = ["Family", "Friend","Acquaintance"];
	        var i = 0;
	        $.each(friendsfamilyrelationArray, function(key, value) {
	            $('#friendsfamilyrelation-'+number)
	                .append($("<option></option>")
	                .attr("value",friendsfamilyrelationArray[i])
	                .text(friendsfamilyrelationArray[i]));
	            if(friendsfamilyrelation == friendsfamilyrelationArray[i].toLowerCase()){
					$('#friendsfamilyrelation-'+number+' option[value="'+friendsfamilyrelationArray[i]+'"]').attr("selected",true);
				}
	            i++;
	        });
		}

		function deleteClick(e){		
			var id = e.target.id;
			id = id.split("-");
			if(id[0] == "blockFriendsFamilyRequestfa"){
				var friendId = e.target.parentNode.parentNode.id;
			}else {				
				var friendId = e.target.parentNode.id;
			}
			var friendFamilyState = $('#friendFamilyState-'+id[1]).text();
			if(friendFamilyState == "Sent") {
				var emailSent = $('#friendFamilyEmail-'+id[1]).text();
				var emailRequest = betaEmail;
			}else {
				var emailRequest = $('#friendFamilyEmail-'+id[1]).text();
				var emailSent = betaEmail;
			}
			var opt = {"emailSent": emailSent,
						"emailRequest": emailRequest
					}
			globalFunction.editFriendDisapproval(opt, function(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					$('#'+friendId).toggle( "slide" );

					toastr.success($('#friendsfamilyrelation-'+id[1]).val() + ' Blocked');
				}
	    	});
		}

		function changeRelation(e){		
			var id = e.target.id;
			id = id.split("-");
			var friendFamilyState = $('#friendFamilyState-'+id[1]).text();
			if(friendFamilyState == "Sent") {
				var emailSent = $('#friendFamilyEmail-'+id[1]).text();
				var emailRequest = betaEmail;
			}else {
				var emailRequest = $('#friendFamilyEmail-'+id[1]).text();
				var emailSent = betaEmail;
			}
			var opt = {"emailSent": emailSent,
						"emailRequest": emailRequest,
						"relation": $('#'+e.target.id).val().toLowerCase()
					}
			globalFunction.editFriendRelation(opt);
					toastr.success('Relation Changed');
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
			$('#fallback').hide();
			this.fetchFriend("family");
			$('#family-tab').addClass('active');				
	    }       	
    }

    handleTab(e){
    	$('.c-userfriendsfamilytab__button').removeClass('active');
    	var id = e.target.id;
    	$('#'+id).addClass('active');
    	id = id.split('-');
    	var friendsfamilyrelation = id[0];
    	this.fetchFriend(friendsfamilyrelation);
    }

	render() {

		return (	
			<InlineCss stylesheet={css.userEmpty(this.props.arabic)} namespace="UserFriendsFamily">
				<div className="o-usercpcontent-container">
					<div className="o-userfriendsfamily__tab">							
						<button id="family-tab" className="c-userfriendsfamilytab__button" onClick={this.handleTab.bind(this)}>
							{lang(this.props.language, "friendFamiyControlFamily")}
						</button>
						<button id="friend-tab" className="c-userfriendsfamilytab__button" onClick={this.handleTab.bind(this)}>
							{lang(this.props.language, "friendFamiyControlFriends")}
						</button>
						<button id="acquintance-tab" className="c-userfriendsfamilytab__button" onClick={this.handleTab.bind(this)}>
							Acquaintance 
						</button>
						<button id="-tab" className="c-userfriendsfamilytab__button" onClick={this.handleTab.bind(this)}>
							{lang(this.props.language, "friendFamiyControlAll")}
						</button>
					</div>
					<div className="o-container c-usercpcontent__form">
						<div id="fallback" className="o-usercpcontent-fallback">
							<label>{lang(this.props.language, "friendFamiyElementFallback")}</label>
						</div>
						<div className="c-usercpcontent-content">
							<div className="c-userfriend-has-padding">
								<div id="scroll-container">
									<ul className="o-usercpcontent-results" id="friendsfamily-table">
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

UserFriendsFamily.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserFriendsFamily;