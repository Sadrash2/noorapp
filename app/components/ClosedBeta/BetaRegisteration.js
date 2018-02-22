import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import Cookies from "../../components/Cookies";
import config from "../../config";
import globalFunction from "../../components/GlobalFunction";
import call from "../../components/apiCall";
import functions from "../../scss/styleFunctions";
import Draggable from 'react-draggable';
import reactdatepicker from "react-datepicker";
import validation from "../../components/GlobalValidation";
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";
import toastr from 'toastr';

var id, stateCity, countryState, password, positionY = 0, validAvatar = true, validBg = true, coverphotourl, coverAction, oricover, oripx;
var email, token;
var bgState = true, avatarState = true;
var DatePicker = require('react-datepicker');
var moment = require('moment');
class BetaRegisteration extends React.Component {
	constructor(){
		super();
	    this.state = {
	      startDate: moment()
	    };
  	}
 
  handleChangeDate(date) {
    this.setState({
	      startDate: date
	});
	//this.forceUpdate();
  }
	handle_final_signup_submit(){
// require('react-datepicker/dist/react-datepicker.css');
		var $ = require ('jquery')
		if(avatarState == false){
			this._handleAvatarSubmit();
		}
		if(bgState == false){
			this._handleBackgroundSubmit();
		}

		var isValid = this.validateForm();
		if (isValid == true && validAvatar == true && validBg == true) {
			var opt={
				"firstName": this.refs.fname.value,
				"email": this.refs.email.value,
				"lastName": this.refs.lname.value,
				"birthDate": $('.c-dob').val(),
				"gender": this.refs.gender.value,
				"nationality": this.refs.nationality.value
			};
			UserSignUp = UserSignUp.bind(this);
			call.passFormData("Users","edit_signup",opt,UserSignUp);
		}

		function UserSignUp(data){
			var response = JSON.parse(data);
			if(response.state === 200) {
				toastr.success('Your information is saved');
				var opts = { "steps": 3, "email": email}
				globalBetaFunction.editSteps(opts);
				this.context.router.push(config.root + "/StartSession?email="+email+"&token="+token);
			}
			if(response.state === "3003") {
				return;
			}
		}
	}
	validateForm() { //validate signup form
		var $ = require ('jquery')

		var fname = this.refs.fname.value;
		var lname = this.refs.lname.value;	
		var dob = $('.c-dob').val();	
		var gender = this.refs.gender.value;
		var nationality = this.refs.nationality.value;	
		
		var validateFinal = validation.signup_final_validation(fname,lname, dob, gender,nationality);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;
		var validChecker = true;
		var allErrorMessage = "";
		var $ = require ('jquery')
		/*'is-required = error' 'o-profileform__input = success'*/
		// fname
		if (validArray[0] == false) {
			document.getElementById('c-fname').className='is-required';
			validChecker = false;
			$('#c-fname').parent().find('.alert').html(messageArray[0]);
			$('#c-fname').parent().find('.alert').show();
		} else {
			document.getElementById('c-fname').className='c-fname c-input';
			$('#c-fname').parent().find('.alert').hide();
		}

		//last name
		if (validArray[1] == false) {
			document.getElementById('c-lname').className='is-required';
			validChecker = false;
			$('#c-lname').parent().find('.alert').html(messageArray[1]);
			$('#c-lname').parent().find('.alert').show();
		} else {
			document.getElementById('c-lname').className='c-lname c-input';
			$('#c-lname').parent().find('.alert').hide();
		}

		//dob
		if (validArray[2] == false) {
			document.getElementById('c-dob').className='is-required';
			validChecker = false;
			$('#c-dob').parents('li').find('.alert').html(messageArray[2]);
			$('#c-dob').parents('li').find('.alert').show();

		} else {
			document.getElementById('c-dob').className='c-dob c-input';
			$('#c-dob').parents('li').find('.alert').hide();

		}

		//gender
		if (validArray[3] == false) {
			document.getElementById('c-gender').className='is-required';
			$('#c-gender').parent().parent().find('.alert').show();
			$('#c-gender').parent().parent().find('.alert').html(messageArray[3]);

			validChecker = false;
		} else {
			$('#c-gender').parent().parent().find('.alert').hide();
			document.getElementById('c-gender').className='c-gender c-input';
		}
		//nation
		if (validArray[4] == false) {
			document.getElementById('c-nationality').className='is-required';
			$('#c-nationality').parent().parent().find('.alert').show();
			$('#c-nationality').parent().parent().find('.alert').html(messageArray[4]);

			validChecker = false;
		} else {
			$('#c-nationality').parent().parent().find('.alert').hide();
			document.getElementById('c-nationality').className='c-nationality c-input';
		}

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {
			return false;
		}
	}

	changeAvatar(){
		var $ = require ('jquery')
		if(avatarState){
			$('#picUpload').click();
		}else {
        	$('.c-avatar').attr('src', "");
			avatarState = true;
			validAvatar = true;
            $('.c-avatar').attr('src', "app/assets/images/content/promotional/users/avatar-default.png");
			document.getElementById("cameraButton").innerHTML = '<i class="fa fa-camera"></i>';
			$('#picUpload').parent().parent().find('.alert').hide();
		}
	}
	readURL(){
		var $ = require ('jquery')
		//globalFunction.userProfileEditClick("avatar");

		var input = document.getElementById('picUpload');
		if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $('.c-avatar').attr('src', e.target.result);
				globalFunction.userProfileEditClick("avatar");
				avatarState = false;
				document.getElementById("cameraButton").innerHTML = '<i class="fa fa-remove"></i>';
            }
    
            reader.readAsDataURL(input.files[0]);
        }
        $('#picUpload').hide();
	}

	readBgURL(){
		var $ = require ('jquery')
		var y1, y2;

		var input = document.getElementById('bgUpload');
		if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
        		$('.c-form__avatar').css('z-index','auto');
        		$('.c-bgUpdate__action').css('display','flex');
        		$('#picUpload').val("");
                $('#bgPic').attr('src', e.target.result);
                $('.c-img__background').css('transform', 'translate(0px, 0px)');
                $('.c-profileform__background').css('background-color', 'transparent');
                $('#bgPic').css('cursor','s-resize');
                $('#backgroundUpload').text("Cancel");
                bgState = false;
            }    
            reader.readAsDataURL(input.files[0]);
        }
        $('#bgUpload').hide();
	}

	//to get the y-axis pixel of the image drag
	dragImage(e, ui){		
		positionY = ui.deltaY+ui.y;
	}

	//upload new bg photo
	changeBg(){
		var $ = require ('jquery')
		if(bgState){
			$('#bgUpload').click();
		}else {
            bgState = true;
            validBg = true;
            $('#backgroundUpload').text("Upload a background picture");
			$('#bgUpload').val("");
			$("#bgUpload").hide();
		    $('.c-bgUpdate__action').css('display','none');
	        $('.c-uploadbg__form').css('opacity','1');
	        $('#bgPic').css('cursor','auto');
	        $('.c-uploadbg__form').css('z-index','99');
	        $('.c-form__avatar').css('z-index','98');
	        $('.c-profileform__background').css('background-color', '#ECE8E1');
	        $('.c-img__background').css('transform', 'translate(0px, 0px)');
			$('#bgUpload').parent().parent().find('.alert').hide();
	        $('#bgPic').attr('src', "");
		}
	}

	//submit form
	_handleAvatarSubmit() {
		var $ = require ('jquery')
		let firstName = this.refs.fname.value;
		var isValid = this.validateAvatar();
		if (isValid == true && firstName != "") {

			//form validation success
			let avatar = "";

			var opt = {"userid": id,
						"firstName": firstName,
						"avatar": avatar						
					}

			var request =  [
						"Users",
						"uploadAvatar",
						opt];
					
			var json = JSON.stringify(request);
			var form_data = new FormData();  
			form_data.append('request', json);
			var file_data = document.getElementById('picUpload').files[0];              
			form_data.append('avatar', file_data);

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
					  	$("#picUpload").hide();
					  	validAvatar = true;
					}
				}.bind(this)
			});
		}
	}

	validateAvatar() {
		let avatarFileData = document.getElementById('picUpload').value;		
		var validateFinal = validation.UserProfileAvatarValidation(avatarFileData);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;
		var validChecker = true;
		var allErrorMessage = "";
		var $ = require ('jquery')
		//avatar
		if (validArray[0] == false) {
			document.getElementById('picUpload').className='is-required  o-upload__field';
			validChecker = false;
			$('#fallbackmessage').append('<li>'+ messageArray[0] + '</li>');
		} else {
			document.getElementById('picUpload').className='o-upload__field';
		}

		if (validArray[0] == false) {
				document.getElementById('picUpload').className='is-required o-upload__field';
				validChecker = false;
				$('#picUpload').parent().parent().find('.alert').html(messageArray[0]);
				$('#picUpload').parent().parent().find('.alert').show();

			} else {
				document.getElementById('picUpload').className='o-upload__field';
				$('#picUpload').parent().parent().find('.alert').hide();
			}

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {
			//sadra - proper error message without using alert
			// alert("Error image")

			validAvatar = false;
			return false;
		}
	}

		//save bg photo click
	_handleBackgroundSubmit() {

		uploadCover = uploadCover.bind(this);
		uploadCover();

		//for upload new bg
		function uploadCover() {
			var $ = require ('jquery')
			let firstName = this.refs.fname.value;
			validateBackground = validateBackground.bind(this);
			var isValid = validateBackground();
			if (isValid == true && firstName != "") {
				//form validation success
				let background = "";

	
				var opt = {"userid": id,
							"firstName": firstName,
							"coverphoto": background,
							"positionY": positionY
						}
	
				var request =  [
							"Users",
							"uploadBackground",
							opt];
						
				var json = JSON.stringify(request);
				var form_data = new FormData();  
				form_data.append('request', json);
				var file_data = document.getElementById('bgUpload').files[0];
				form_data.append('cover', file_data);
	
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
						  	$("#bgUpload").hide();
	    	    			$('.c-bgUpdate__action').css('display','none');
        					$('.c-uploadbg__form').css('opacity','1');
        	    			$('#bgPic').css('cursor','auto');
        	    			$('.c-uploadbg__form').css('z-index','99');
        	    			$('.c-form__avatar').css('z-index','98');
        	    			$('#backgroundEdit').attr('disabled', false);
                			$('#backgroundRemove').attr('disabled', false);
                			oripx = positionY;
                			validBg = true;
						}
					}.bind(this)
				});
			} else {
				bgState = false;
			}
		}

		//to validate bg image
		function validateBackground() {
			let backgroundFileData = document.getElementById('bgUpload').value;		
			var validateFinal = validation.UserProfileBackgroundValidation(backgroundFileData);
			var validArray = validateFinal.valid;
			var messageArray = validateFinal.message;
			var validChecker = true;
			var allErrorMessage = "";
			var $ = require ('jquery')
			$('#fallbackmessage li').remove();
			//avatar

			if (validArray[0] == false) {
				document.getElementById('bgUpload').className='is-required c-img__background';
				validChecker = false;
				$('#bgUpload').parent().parent().find('#bgAlert').html(messageArray[0]);
				$('#bgUpload').parent().parent().find('#bgAlert').show();

			} else {
				document.getElementById('bgUpload').className='c-img__background';
				$('#bgUpload').parent().parent().find('#bgAlert').hide();
			}

			//FinalCheck if false show error message
			if (validChecker == true) {
				return true;
			} else {
				//sadra - proper alert without alert
				//alert("Error bg upload")

				validBg = false;
				return false;
			}
		}
	}

	exit(){
		this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
		this.context.router.push(config.root + "/graditude?email="+email+"&token="+token);
	}

	componentDidMount() {
		var $ = require ('jquery')
		// this.getInitialState();
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
	        	email = emailPairs[1];
	        	token = tokenPairs[1];
	        	email = email.replace("%40","@");
	        	//
	        	getUserData=getUserData.bind(this);
	        	var dataArray = { "email": email, "token": token}
	        	globalBetaFunction.getUserEmailToken(dataArray, getUserData);
	        	function getUserData(data){
	        		var response = JSON.parse(data);
					if(response.state === 200) {
						var array = response.success;
						comparefunction=comparefunction.bind(this);
						globalBetaFunction.compareTimeExpired(array[0].email, comparefunction);
						function comparefunction(data) {
							if (data == "timeremain") {
								$('#c-email').val(array[0].email);
								var genderArray = ["Male","Female"]
								$('#c-gender')
				                    .append($('<option value="0" selected disabled>-- Select an option --</option>'));
				                var i = 0;
				                $.each(genderArray, function(key, value) {
				                    $('#c-gender')
				                        .append($("<option></option>")
				                        .attr("value",genderArray[i])
				                        .text(genderArray[i]));
				                    i++;
				                });
                				$('.c-avatar').attr('src', "app/assets/images/content/promotional/users/avatar-default.png");
							} else {
								this.timeout();
							}
						}

						if (array[0].steps == 0) {
							email = email.replace("@","%40");
							this.context.router.push(config.root + "/SignUp?email="+email+"&token="+token);
						} else if (array[0].steps == 3) {
							email = email.replace("@","%40");
							this.context.router.push(config.root + "/StartSession?email="+email+"&token="+token);
						} else if (array[0].steps == 4) {
							email = email.replace("@","%40");
							this.context.router.push(config.root + "/AboutPage?email="+email+"&token="+token);
						} else if (array[0].steps == 5) {
							email = email.replace("@","%40");
							this.context.router.push(config.root + "/AppsPage?email="+email+"&token="+token);
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

		call.passRequest("Users","fetch",email,function(data){
			var response = JSON.parse(data);
			id = response.success.id;
		});

		globalFunction.getCountry(function(data) { 
	 		var response = JSON.parse(data);
	        $.each(response.success, function(key, value) {
	       	 	$('.c-nationality').append('<option value="'+value.name+'"> '+value.name+' </option>');
			});//get coutnries
		});
		globalFunction.differentiate_device(email,token); //get the u_id, right device?
		this.callApi();
	}

	callApi() {
		var user = email;
		var request =  [
				"Users",
				"fetch", user];
		var $ = require ('jquery');

		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: {request},
			cache: false,
			success: function(data) {
				var response = JSON.parse(data);
					console.log(response);

				if(response.state === 200) {
					id = response.success.id;
					console.log(id);
					Cookies.writeCookie('userid', id, 20*365);				
				} else {
					console.log("takde");
				}
			}.bind(this)
		});
	}


  	render() {
  		// $( "#c-dob" ).datepicker();
		var $ = require ('jquery');

// $('#c-dob').datepick({minDate: new Date(2014, 12-1, 25)});
    	return (
    	 	<InlineCss stylesheet={BetaRegisteration.css(this.props.arabic)}  namespace="BetaRegisteration">
    	 		<div className="o-betaregisteration-container">
    	 		<header>   				
		     		<h2 className="o-heading-betaregisteration">Tell us a little something about yourself. </h2>
		     		<h3 className="o-heading-secret">No worries, your information is safe with us. </h3>
		     	</header> 			
    	 			<div className="o-betaregisteration-form">
		     			<div>
		     				<div className = "c-profileform__background">
				     			<Draggable axis="y" bounds={{top: -350, bottom: 0}}  onStop={this.dragImage.bind(this)}>
				     				<img id="bgPic" className="c-img__background" /	>						        
							    </Draggable>
							</div>
							<div className="alert text-danger" id="bgAlert"></div>
							<div className="o-userprofile-padding c-uploadbg__form"	>							
								<button className="c-upload__background" id="backgroundUpload" onClick={this.changeBg.bind(this)}><i className="fa fa-upload"></i>Upload a background picture</button>
								<input className="c-uploadpicinput" id="bgUpload" 	type="file" accept="image/*"  onChange={this.readBgURL.bind(this)}/>
							</div>
							<div className="c-form__avatar">								
								<div className="u-icon__wrapper">
									<img className="c-avatar"/>
									<button className="o-upload__camera" id="cameraButton" onClick={this.changeAvatar.bind(this)}><i 	className="fa fa-camera"></i></button>
								</div>
								<div className="alert text-danger"></div>
								<input className="c-uploadpicinput" id="picUpload" 	type="file" accept="image/*" onChange={this.readURL.bind(this)} />
							</div>
		     			</div>
		     			
		     			<div className="o-betaregisteration-main"> 
		     				<h3 className="o-heading-about">About you</h3>  
			     			<ul>				
			     				<li><label>First Name *</label><input className="c-input c-fname" id="c-fname" type="o-text" ref="fname" /><div className="alert text-danger"></div></li>
			     				<li><label>Last Name*</label><input className="c-input c-lname"  id="c-lname" type="o-text" ref="lname" /><div className="alert text-danger"></div></li>
			     				<li><label>Date of Birth (MM/DD/YYYY) *</label>
			     		
			     				<DatePicker isClearable={true} className="c-dob c-input" id="c-dob" ref="dob"  selected={this.state.startDate} onChange={this.handleChangeDate.bind(this)} />
			     				<div className="alert text-danger"></div></li>
			     				
			     				<li><label>Gender *</label>
			     				<div className="u-select__wrapper">
									<select id="c-gender" className="c-input c-gender" ref="gender">
									</select>
									<i className="fa fa-angle-down"></i>
								</div><div className="alert text-danger"></div>
			     				</li>

			     			</ul>
		     			</div>
		     			<div className="o-betaregisteration-main"> 
		     				<h3 className="o-heading-about">Contact</h3>  
			     			<ul>				
			     				<li><label>Email Address *</label><input readOnly id="c-email" className="c-email c-input" type="o-text" ref="email"/></li>
			     				<li><label>Nationality*</label>
			     					<div className="u-select__wrapper">
										<select className=" c-input c-nationality" ref="nationality"  id="c-nationality" type="o-text">
				     						<option value=""> -- Choose an Option -- </option>
				     					</select>
										<i className="fa fa-angle-down"></i>
									</div><div className="alert text-danger"></div>
			     				</li>
			     			</ul>
		     				<div className="o-registeration-button-wrapper">
		     					<button type="button" id="c-start-button" className	="c-start-button" onClick={this.handle_final_signup_submit.bind(this)}>Next</button>

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
				.u-select__wrapper {
					position: relative;
					background-color: white;
					margin-bottom: 10px;
				}
				.u-select__wrapper > i {
					position: absolute;
					top: 0;
					right: 12px;
					height: 46px;
					line-height: 46px;
					font-size: inherit;
					color: inherit;
					z-index: 1;
				}

				.u-select__wrapper > i.active {
					position: absolute;
					top: 0;
					right: 12px;
					height: 46px;
					line-height: 46px;
					font-size: inherit;
					color: inherit;
					z-index: 0;
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
				.u-select__wrapper > select, .c-input,.c-fname,.c-lname,.c-dob,.c-nationality,.c-gender {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: transparent;
					border: 1px solid rgba(0,0,0,0.075);
					border-radius: 0;
					font-size: 1.4rem;
					font-weight: 600;
					line-height: 1.42857143;
					color: #746A5A!important;
					box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
					transition: border-color ease-in-out .15s;
					-webkit-appearance: none;
					-moz-appearance: none;
	    			appearance: none;
	    			font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				}

				.u-select__wrapper > select {
					position: relative;
	    			z-index: 0;
					
				}
				.u-select__wrapper > select.active {
					position: relative;
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: transparent;
					border: 1px solid rgba(0,0,0,0.075);
					border-radius: 0;
					font-size: 1.4rem;
					font-weight: 600;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
					transition: border-color ease-in-out .15s;
					-webkit-appearance: none;
					-moz-appearance: none;
	    			appearance: none;
	    			z-index: 1;
				}
				#c-email {
					background-color: #efefef;
				}
				.o-heading-betaregisteration {
					font-size: 2em;
					font-weight: 500;
					color: #4D4D4D;
				}
				.o-heading-secret {
					text-align: center;
					color: #4D4D4D;
					font-size: 1.2em;
				}
				.o-heading-about {
					padding-bottom: 2%;
					font-weight: 500;
					font-size: 1.4em;
					padding: 1%;
					color: #4D4D4D;
				}
				#c-date{
					width: 100%;
					padding: 2%; 
					height:39px;
					font-size: 1em;
					border: 1px solid #DDDDDD;
					outline: none;
				}
				.is-required {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: white;
					border: 1px solid #C54D4D!important;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(197,77,77,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				}
				.text-danger{
					color:red;
					font-size:12px;
				}
				.o-registeration-button-wrapper {
					margin: 1em;
					text-align: center;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
				}

				.c-start-button {
					padding: 0.5em 3em;
    				background-color: #C79269;
    				color: white;
    				border: none;
    				font-size: 1.2em;
    				outline: none;
    				margin-top: 0px;
    				float: right;
    				margin-left: 2%;
				}
				.c-start-button:hover {
					background-color: #DBA982;
				}

				.o-betaregisteration-main ul { 
					margin-bottom: 1em;
					padding-bottom: 1em;
					width: 100%;
					border-bottom: 1px solid #DDDDDD;
				}

				.o-betaregisteration-main ul li {
					margin-bottom: 0.7em;
					display: inline-table;
					width: 50%;
					list-style: none;
					padding: 1%;
				}
				.o-betaregisteration-main {
					width:100%;
					height: auto;
					font-size:1.0em;
					font-weight: 500;
				}
				& > .o-betaregisteration-container .o-betaregisteration-form {
					padding: 2em;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color: white;
				}

				& > .o-betaregisteration-container .o-betaregisteration-form label {
					color: #746A5A;
					font-size: 0.8em;
					line-height: 2.5em;
				}

				& > .o-betaregisteration-container {
					padding: 4% 25%;	
				}

				.o-betaregisteration-form > header > h2 {
					font-weight: 500;
					font-size: 2em;
					color: #4D4D4D;
				}

				.o-betaregisteration-form > p {
					word-wrap: break-word;
					width: 100%;
					
					margin-bottom: 10%;
					text-align: center;
					text-align: -webkit-center;
					text-align: -moz-center;
				}

				ul.c-updatebg-dropdown {
					list-style: none;
				}

				.c-bgUpdate__action {
					display: none;
					float: right;
				}
				.c-bgUpdate__action > button {
					margin: 0 5px;
				}
				.c-img__background {
					width:100%;
				}
				.c-uploadbg__form {
					margin-bottom: 3em;
					padding-bottom: 2em;
					position: relative;
					z-index: 99;
					display: flex;
					flex-direction: row;
				}
				.c-profileform__background {
					height: 250px;
					width: 100%;
					background-color: #ECE8E1;
					margin-bottom: 3%;
					overflow: hidden;
					position: absolute;
					z-index: 2;
					left: 0;
				}
				.c-profileform__background > div {
					height: 100%;
					padding-top: 10px;
				}
				.c-upload__background:disabled {
					cursor: auto;
					opacity: 0.2;
				}
				.c-upload__background > i {
					margin-right: 8px;
				}
				.c-upload__background {
					background-color: white;
					border: none;
					box-shadow: 1px 1px 1px 1px;
					outline: none;
					border-radius: 0;
					top: 55%;
					position: absolute;
					opacity:0.8;
					z-index: 98;
					margin:0;
				}
				.o-wrapper-dropdown {
					background-color: white;
					color: #4d4d4d;
					border: none;
					box-shadow: 0px 1px 3px #999999;
					outline: none;
					border-radius: 0;
					top: 38%;
					opacity:0.8;
					z-index: 99;
					margin:0;
					position:absolute;
					padding: 5px 10px;
					cursor: pointer;
					width: 200px;
					font-size: 1.2rem;
				}
				.o-wrapper-dropdown:hover {
					opacity: 1;
				}
				.o-wrapper-dropdown.active.on {
					opacity: 1!important;
				}
				.o-wrapper-dropdown:after {
					content: "";
				    width: 0;
				    height: 0;
				    position: absolute;
				    right: 15px;
				    top: 50%;
				    margin-top: -3px;
				    border-width: 6px 6px 0 6px;
				    border-style: solid;
				    border-color: #8aa8bd transparent;
				}
				.o-wrapper-dropdown .c-updatebg-dropdown {
				  /* Size & position */
				    position: absolute;
				    top: 140%;
				    left: 0;
				    right: 0;

				    /* Styles */
				    background: white;
				    border-radius: inherit;
				    border: 1px solid rgba(0,0,0,0.17);
				    box-shadow: 0 0 5px rgba(0,0,0,0.1);
				    font-weight: normal;
				    transition: all 0.5s ease-in;
				    list-style: none;

				    /* Hiding */
				    opacity: 0;
				    pointer-events: none;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown li button {
				    display: block;
				    padding: 10px;
				    text-decoration: none;
				    color: #e8d0bd;
				    border-bottom: 1px solid #e6e8ea;
				    box-shadow: inset 0 1px 0 rgba(255,255,255,1);
				    transition: all 0.3s ease-out;
					z-index: 99;
				    width: 100%;
				    text-align: left;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown li:first-of-type button {
				    border-radius: 7px 7px 0 0;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown li:last-of-type button {
				    border-radius: 0 0 7px 7px;
				    border: none;
				}

				/* Hover state */

				.o-wrapper-dropdown .c-updatebg-dropdown li button:hover{
				    color: #C79269;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown:after {
				    content: "";
				    width: 0;
				    height: 0;
				    position: absolute;
				    bottom: 100%;
				    right: 15px;
				    border-width: 0 6px 6px 6px;
				    border-style: solid;
				    border-color: #fff transparent;    
				}

				.o-wrapper-dropdown .c-updatebg-dropdown:before {
				    content: "";
				    width: 0;
				    height: 0;
				    position: absolute;
				    bottom: 100%;
				    right: 13px;
				    border-width: 0 8px 8px 8px;
				    border-style: solid;
				    border-color: rgba(0,0,0,0.1) transparent;    
				}

				.o-wrapper-dropdown.active .c-updatebg-dropdown {
				    opacity: 1;
				    pointer-events: auto;
				}

				.c-form__avatar {
					position: relative;
					display: flex;
					justify-content: center;
					align-items:center;
					flex-direction: column;
					z-index:98;
					margin-bottom: 4em;
				}
				.c-avatar {
				    width: 13em;
				    height: 13em;
				    display: block;
				    border-radius: 50%;
				    padding: 30px;
				    box-shadow: 1px 1px 1px 1px;
				    background-color: white;
				}
				.u-icon__wrapper {
					z-index: 98;
					position: relative;
				}
				.o-upload__camera {
					position: absolute;
					left: 35%;
					bottom: 5px;
					border: none;
					font-size: 3.5rem;
					outline: none;
					background-color: transparent;
					opacity: 0.6;
				}
				.o-upload__camera:hover {
					opacity: 1;
				}

				.c-uploadpicinput {
					display: none;
				}
				.react-datepicker__tether-element-attached-top .react-datepicker__triangle, .react-datepicker__tether-element-attached-bottom .react-datepicker__triangle, .react-datepicker__year-read-view--down-arrow {
		  margin-left: -8px;
		  position: absolute;
		}
#c-date{
	
}


				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 180px) and (max-width: 767px) {
					& > .o-betaregisteration-container {
						padding: 5% 2% 5%;	
					}

					.o-betaregisteration-main ul li {
						width: 100%;
					}

					.c-avatar {
					    width: 13em;
					    height: 13em;
					    display: block;
					    border-radius: 50%;
					    padding: 30px;
					    box-shadow: 1px 1px 1px 1px;
					    background-color: white;
					}
					.c-uploadbg__form {
						margin-bottom: 7em;
					}
					.c-avatar {
					    width: 8em;
					    height: 8em;
					}
					.o-upload__camera {
					    left: 31%;
					    bottom: 0px;
					    font-size: 2.5rem;
					}
					.o-heading-betaregisteration {
						font-size: 1.5em;
					}
					.o-heading-secret {
						font-size: 1.0em;
					}
					.c-start-button {
					    margin-right: 2.0em;
					}
					.o-registeration-button-wrapper {
						width: 100%;
						display: flex;
						flex-direction: row;
						padding: 0.7em 0;
					}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-betaregisteration-container {
						padding: 5% 22% 5%;		
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

BetaRegisteration.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default BetaRegisteration;