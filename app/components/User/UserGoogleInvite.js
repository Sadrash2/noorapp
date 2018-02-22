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
import css from "./userCss";

var name, betaEmail, token;
var fbnamesql;
var fbFriendEmail = [];
class UserGoogleInvite extends React.Component {

	constructor(args) {
		super(args);
	}

	//get Connected with FB
	connectFacebook(){

		window.fbAsyncInit = function() {
		    FB.init({
		      	appId      : '1538018636506662',
		      	xfbml      : true,
		      	cookie     : true,
		      	oauth      : true,
		      	version    : 'v2.6'
		    });

		    function updateButton(response){
		    	var $ = require('jquery')
		    	var button = document.getElementById('fb-auth');
		    	
		    	if(response.authResponse){
		    		FB.api('/me', function(response) {
		    			name = response.name;
        				updateUserData();
		    		});

		    		// get friends
                    FB.api(
                    "/me/friends", function(response) {
                    	fbnamesql = "fbname = "
                    	for(var i = 0; i<response.data.length; i++) {
                    		fbnamesql += "'"+response.data[i].name+"'";
                    		if(response.data.length-1 != i){
                    			fbnamesql += " OR fbname = "
                    		}
                    	}
                    	globalFunction.getEmailByFB(fbnamesql, function(data){
                    		fbFriendEmail = []
        					$('#syncinvite-table li').remove();
                    		var email = betaEmail;
                    		var response = JSON.parse(data);
                    		var c = 0;
                    		if(response.state === 200){
	                    		for(var i = 0; i< response.success.length; i++){
	                    			var opt = {"email":email,"friendemail":response.success[i].email};
	                    			globalFunction.validFriend(opt, i, response.success[i].fbname, function(data, i, fbname){
	                    				var response = JSON.parse(data);
	                    				if(response.state == "3011"){
       										$('#btnInvite').show();
       										$('#fallback').hide();

	                    					if(fbFriendEmail.includes(response.error)){
	                    						
	                    					}else {
	                    						fbFriendEmail.push(response.error);
	                    						$('#syncinvite-table')
									    	     .append(
									    	     	'<li class="c-usercpcontent">' +
														'<img class="c-usercpcontent__avatar" src="app/assets/images/content/promotional/users/default-profile.jpg" />' +
														'<div class="c-usercpcontent__wrap">' +
															'<h2>'+fbname+'</h2>' +
															'<label class="c-usercpcontent__email">' +
																response.error +
															'</label>' +															
														'</div>' +
														'<div class="c-usercpcontent__confirmation">' +
																'<label class="checkbox-inline">' +
																	'<input type="checkbox" id="friend-'+c+'" value="'+response.error+'" />' +
																	'<span htmlFor="friend-'+c+'">' +
																	'</span>' +
																'</label>' +
															'</div>' +
													'</li>');
									    	     c++;
									    	}
	                    				}
	                    			});
	                    		}
	                    	}
                    	});
                    }, {scope: 'email,user_friends'});
                } else {
                	button.onclick = function() {
                		FB.login(function(response) {
                			if (response.authResponse) {
	                			window.location.reload();
	                		}
                		}, {scope: 'email,user_friends'});
                	}
        			$("#fb-auth").click();
                }
                function sortMethod(a, b) {
		            var x = a.name.toLowerCase();
		            var y = b.name.toLowerCase();
		            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		        }
		    }
		    FB.getLoginStatus(updateButton);
		    FB.Event.subscribe('auth.statusChange',updateButton);
		};

		(function(d, s, id){
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) {return;}
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		(function() {
            var e = document.createElement('script'); e.async = true;
            e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        }());

        //updateFacebookUserName
		function updateUserData() {
			var opt = {
				"email" : betaEmail,
				"fbname" : name
			}
			globalFunction.editFBName(opt);			
		}
	}

	//Google Contact API - Test in 127.0.0.1/<folderName>/usercp
	connectGoogle() {
        var config = {
          'client_id': '711728861702-4bb9df53j3bpporrapkfpciqsecg2abq.apps.googleusercontent.com',
          'scope': 'https://www.google.com/m8/feeds'
        };
        gapi.auth.authorize(config, function() {        	
          fetch(gapi.auth.getToken());
        });

        function fetch(token) {
        	var $ = require ('jquery')
		    $.ajax({
		        url: "https://www.google.com/m8/feeds/contacts/default/full?access_token=" + token.access_token + "&alt=json",
		        dataType: "jsonp",
		        success:function(data) {
		            for(var i =0; i < data.feed.entry.length; i++){
		            	if(data.feed.entry[i].gd$email != null) {
		            		$('#btnInvite').show();
       						$('#fallback').hide();
       						var opt = {"email" : betaEmail,
       									"friendemail": data.feed.entry[i].gd$email[0].address};
       						globalFunction.validFriend(opt, 1, "", function(data){
       							var response = JSON.parse(data);
					
								if(response.state == "3011") {
									fbFriendEmail.push(response.error)
									$('.o-usercpcontent-results')
									.append('<li class="c-usercpcontent">' +
												'<img class="c-usercpcontent__avatar" src="app/assets/images/content/promotional/users/default-profile.jpg" />' +
												'<div class="c-usercpcontent__wrap">' +
													'<h2></h2>' +
													'<label class="c-usercpcontent__email">' +
														response.error +
													'</label>' +													
												'</div>' +
												'<div class="c-usercpcontent__confirmation">' +
														'<label class="checkbox-inline">' +
															'<input type="checkbox" id="friend-'+(fbFriendEmail.length-1)+'" value="'+response.error+'" />' +
															'<span htmlFor="friend-'+(fbFriendEmail.length-1)+'">'+
															'</span>' +
														'</label>' +
													'</div>' +
											'</li>');
								}
       						});
		            	}
		            }
		            
		        }
		    });
		}
    }

	componentDidMount() {
		var $ = require ('jquery')
		var url = window.location.search;
		var queryStart = url.indexOf("?") + 1;
	        var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	        var query = url.slice(queryStart, queryEnd - 1);
	        var pairs = query.replace(/\+/g, " ").split("&"),
	        emailPairs = pairs[0].replace(/\+/g, " ").split("="),
	        tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
	        parms = {}, i, n, v, nv;
	        betaEmail = emailPairs[1];
	        token = tokenPairs[1];
	        betaEmail = betaEmail.replace("%40","@");
		var urlIn = window.location.hash;

        $('#syncinvite-table li').remove();
		$('#fallback').show();
        $('#btnInvite').hide();
		if(urlIn=="#fb") {
			this.connectFacebook();
		} else {
			this.connectGoogle();        	
		}
	}

	handleInviteClick(e){
		var $ = require ('jquery')
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1);

		let user = betaEmail;
		let checkList = [];
		for(var i = 0; i < fbFriendEmail.length; i++){
			var friend = document.getElementById("friend-"+i);
			if(friend.checked){
				checkList.push(friend.value);
			}
		}

		for(var i = 0; i < checkList.length; i++){
			var opt = {"emailRequest": checkList[i],
						"emailSent": user
					};

			if(query=="fb") {
				globalFunction.addFriend(opt)
				let link = "http://noor.me/friendrequest";
				sendMail(checkList[i], "identify", link, user);
			} else {
				globalFunction.addFriend(opt)
				globalFunction.getUserFetch(checkList[i], function(data){
					var response = JSON.parse(response);

					if(response.state === 200){
						let link = "http://noor.me/friendrequest";
						sendMail(checkList[i], "identify", link, user);
					}
				});
			}		
		}

		window.location.replace("accounts?email="+betaEmail+"&token="+token);	
		
		//Send Email Function 
		function sendMail(guestEmail,format, link, emailSent){
			var $ = require ('jquery')

			var opt = {"firstName": emailSent,
						"email": guestEmail,
						"link": link,
						"format":format
					}

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
						globalFunction.generalModalBox("Invitation Sent Successful");

					} else {
						globalFunction.generalModalBox("Invalid Email address");
					}
				}.bind(this)
			});
		}
	}

	render() {

		return (	
			<InlineCss stylesheet={css.userContent(this.props.arabic)} namespace="UserGoogleInvite">
				<button className="c-facebook__hidden" id="fb-auth" ></button>
				<div className="o-usercpcontent-result o-usercpcontent-container">
					<div id="fallback" className="o-usercpcontent-padding o-usercpcontent-fallback">
						<label>{lang(this.props.language, "googleInviteFallback")}</label>
					</div>
					<div className="o-usercpcontent-padding">
						<ul className="o-usercpcontent-results" id="syncinvite-table">
							<li className="c-usercpcontent">								
							</li>
						</ul>
					</div>
					<div className="o-usercpcontent-action__form">
						<div className="o-usercpcontent-padding">
							<button className="o-form__button is-orangeprimary" id="btnInvite" onClick={this.handleInviteClick.bind(this)} >
								{lang(this.props.language, "googleInviteControlInvite")}
							</button>
						</div>
					</div>					
				</div>
				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<div>
			    	<div id="myModal" className="modal">
			    		<div className="modal-content">
			    			<div className="modal-header">
			    				<span className="close">×</span>
			    				<h2>Congratulation ...<i className="fa fa-meh-o"></i></h2>
			    			</div>
			    			<div className="modal-body" id="myModalMessage">
			    				<p>Some text in the Modal Body</p>
			    				<p>Some other text...</p>
			    			</div>
			    			<div className="modal-footer">
			    			  <h3>No Emotion</h3>
			    			</div>
			    		</div>
			    	</div>
			    </div>
			</InlineCss>
		);
	}

};

UserGoogleInvite.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserGoogleInvite;