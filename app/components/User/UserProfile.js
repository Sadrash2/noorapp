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
import call from "../../components/apiCall";
import toastr from 'toastr';
import css from "./userCss";
import Draggable from 'react-draggable';
var DatePicker = require('react-datepicker');
var moment = require('moment');

var id, stateCity, countryState, password, positionY = 0, valid = true, coverphotourl, coverAction, oricover, oripx, betaEmail, avatarState = true, bgState = true;
var $ =  require('jquery');

class UserProfile extends React.Component {

	constructor(args) {
		super(args);
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

	_handleSubmit(e){
		$('#fallbackmessage li').remove();
		if(avatarState == false){
			this._handleAvatarSubmit();
		}
		if(bgState == false) {
			this._handleBackgroundSubmit();
		}
		var isValid = this.validateForm();
		if (isValid == true) {
			//form validation success
			let nickname = "";
			let firstName = this.refs.firstname.value;
			let lastName = this.refs.lastname.value;
			let email = this.refs.email.value;
			let phone = "";
			var dateOfBirth = $('#c-dob').val();
			let gender = "";
			let maritalStatus = "";
			let nationality = "";
			let address1 = "";
			let address2 = "";
			let PostCode = "";
			let country = "";
			let state = "";
			let city = "";

			if (document.getElementById("c-gender").value != "-- Select an option --") {
				gender = this.refs.gender.value;
			}
			if (this.refs.nationality.value != "") {
				nationality = this.refs.nationality.value;
			}

			var opt = {"userid": id,
						"nickname": nickname,
						"firstName": firstName,
						"lastName": lastName,
						"email": email,
						"phone": phone,
						"birthDate": dateOfBirth,
						"gender": gender,
						"marital": maritalStatus,
						"nationality": nationality,
						"addressline1": address1,
						"addressline2": address2,
						"country": country,
						"state": state,
						"city": city,
						"postcode": PostCode
					}

			var request =  [
						"Users",
						"edit",
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
							if(valid) {
								$(".u-profileselect__wrapper > input").prop("disabled", true);
							    $("select").prop("disabled", true);
							  	$("#editButton").hide();
								$(".fa-angle-down").hide();
							  	$(".fa-edit").show();
								$("i").removeClass("active");
								$("select").removeClass("active");
								$(".overlay-date").css("z-index","1");
								$(".react-datepicker__input-container").css("z-index","0");
								toastr.success('Profile Updated');
								this.forceUpdate();
							}
							
						}
					}.bind(this)
					 });
			}
	}

	validateForm() {
		var nickname = "";
		var firstName = this.refs.firstname.value;
		var lastName = this.refs.lastname.value;
		var email = this.refs.email.value;
		let phone = "";
		let nationality = this.refs.nationality.value;
		nationality = nationality.replace(" ", "");
		let address1 = "";
		let address2 = "";
		let postCode = "";
		var dob = $('#c-dob').val();
		
		var validateFinal = validation.UserProfileValidation(email, firstName, lastName, phone, nationality, address1, address2, postCode, nickname, dob);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;

		var validChecker = true;
		var allErrorMessage = "";

		//firstName
		if (validArray[1] == false) {
			document.getElementById('c-firstname').className='is-required';
			validChecker = false;
			$('#c-firstname').parent().parent().find('.alert').html(messageArray[1]);
			$('#c-firstname').parent().parent().find('.alert').show();
			
		} else {
			document.getElementById('c-firstname').className='o-profileform__input';
			$('#c-firstname').parent().parent().find('.alert').hide();
		}

		//lastName
		if (validArray[2] == false) {
			document.getElementById('c-lastname').className='is-required';
			validChecker = false;
			$('#c-lastname').parent().parent().find('.alert').html(messageArray[2]);
			$('#c-lastname').parent().parent().find('.alert').show();
			
		} else {
			document.getElementById('c-lastname').className='o-profileform__input';
			$('#c-lastname').parent().parent().find('.alert').hide();
		}
		
		

		//nationality
		if (validArray[4] == false) {
			document.getElementById('c-nationality').className='is-required';
			validChecker = false;
			$('#c-nationality').parent().parent().find('.alert').html(messageArray[4]);
			$('#c-nationality').parent().parent().find('.alert').show();
			
		} else {
			document.getElementById('c-nationality').className='o-profileform__input';
			$('#c-nationality').parent().parent().find('.alert').hide();
		}

		//gender
		if (validArray[8] == false) {
			document.getElementById('c-dob').className='is-required';
			validChecker = false;
			$('#c-dob').parent().parent().find('.alert').html(messageArray[8]);
			$('#c-dob').parent().parent().find('.alert').show();
			
		} else {
			document.getElementById('c-dob').className='o-profileform__input';
			$('#c-dob').parent().parent().parent().find('.alert').hide();
		}

		

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {

			return false;
		}
	}

	_handleAvatarSubmit() {
		var isValid = this.validateAvatar();
		if (isValid == true) {
			//form validation success
			let avatar = "";
			let firstName = this.refs.firstname.value;

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
					  	valid = true;
						$('#picUpload').parent().parent().find('.alert').hide();
					  	avatarState = true;
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
		//avatar
		if (validArray[0] == false) {
			document.getElementById('picUpload').className='is-required  o-upload__field';
			validChecker = false;
			$('#picUpload').parent().parent().find('.alertpic').html(messageArray[0]);
			$('#picUpload').parent().parent().find('.alertpic').show();
		} else {
			document.getElementById('picUpload').className='o-upload__field';
			$('#picUpload').parent().parent().find('.alertpic').hide();
		}

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {

			valid = false;
			return false;
		}
	}

	//load data
	callApi() {
		var genderArray = ["Male", "Female"];
		loadGender(genderArray);
		var user = betaEmail;
		var request =  [
				"Users",
				"fetch", user];

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
					id = response.success.id;
					Cookies.writeCookie('userid', id, 20*365);
					$("#c-firstname").val(response.success.firstName);
					$("#c-lastname").val(response.success.lastName);
					$("#c-email").val(response.success.email);

					if (response.success.birthDate != 0) {
						var dateContent = new Date(response.success.birthDate*1000);
						let year = dateContent.getFullYear();
						let month = ('0' + (dateContent.getMonth() + 1)).slice(-2);
						let day = ('0' + dateContent.getDate()).slice(-2);
						var date = month+"/"+day+"/"+year;
						$('#c-dob').val(date);
					}

					$("#c-nationality").val(response.success.nationality);
					password = response.success.password;
					
                	
                	$('#picUpload').hide();
                	avatarState = true;
                	var avatar = response.success.avatar;
                	if(avatar != ""){
                		avatar = avatar.split('/');
                		avatar = avatar[avatar.length-1];

                		$('#removeAvatarButton').show();
                		$('.c-avatar').attr('src', "app/bridge/avatarUploads/"+avatar);
                	}else {
                		$('#removeAvatarButton').hide();
                		$('.c-avatar').attr('src', "app/assets/images/content/promotional/users/avatar-default.png");
                	}

					if (response.success.gender != "") {
						$("#c-gender").val(response.success.gender);
					}

            		var background = response.success.coverphoto;
            		if(background != ""){

            			coverphotourl = background.split('&');
            			coverphotourl = coverphotourl[0];

            			background = background.split('/');
            			background = background[background.length-1];
            			background = background.split('&');
            			$('.c-profileform__background').css('background-color', 'transparent');
            			$('.c-img__background').css('transform', 'translate(0px, '+background[1]+'px)');
            			$('#bgPic').attr('src', "app/bridge/avatarUploads/"+background[0]);
            			oricover = "app/bridge/avatarUploads/"+background[0];
            			oripx = background[1];

            			$('#backgroundEdit').attr('disabled', false);
            			$('#backgroundRemove').attr('disabled', false);
            		}else {
            			oricover = "";
            			coverphotourl = "";
            			oripx = "";
            			$('.c-profileform__background').css('background-color', '#ECE8E1');
            			$('.c-img__background').css('transform', 'translate(0px, 0px)');
            			$('#bgPic').attr('src', "");
            			$('#backgroundEdit').attr('disabled', true);
            			$('#backgroundRemove').attr('disabled', true);
            		}

					$("#editButton").hide();
					$(".fa-angle-down").hide();

					$("#firstname").click(function(){
					    globalFunction.userProfileEditClick("firstname");
					});
					$("#lastname").click(function(){
					    globalFunction.userProfileEditClick("lastname");
					});
					$("#email").click(function(){
					    globalFunction.userProfileEditClick("email");
					});
					$("#dob").click(function(){
					    globalFunction.userProfileEditClick("dob");
					});
					$("#gender").click(function(){
					    globalFunction.userProfileEditClick("gender");
					});
					$("#nationality").click(function(){
					    globalFunction.userProfileEditClick("nationality");	
					});
				}
			}.bind(this)
		});
	
		function loadGender(gender){
			$('#c-gender')
                .append($("<option selected disabled>-- Select an option --</option>"));
            var i = 0;
            $.each(gender, function(key, value) {
                $('#c-gender')
                    .append($("<option></option>")
                    .attr("value",gender[i])
                    .text(gender[i]));
                i++;
            });
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
			$('#bgUpload').hide();
			this.callApi();
	    }        
	}

	//camera button click
	changeAvatar(){
		$('#picUpload').click();
	}

	//new avatar selected
	readURL(){
		//globalFunction.userProfileEditClick("avatar");

		var input = document.getElementById('picUpload');
		if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $('.c-avatar').attr('src', e.target.result);
                $('#removeAvatarButton').show();
				globalFunction.userProfileEditClick("avatar");
				avatarState = false;
            }
    
            reader.readAsDataURL(input.files[0]);
        }
        $('#picUpload').hide();
	}

	//upload new bg photo
	changeBg(){
		$('#bgUpload').click();		
	}

	//save bg photo click
	_handleBackgroundSubmit() {

		let coverLink;

		if(coverAction == "upload"){
			uploadCover = uploadCover.bind(this);
			uploadCover();
		}else {
			if(coverAction == "remove"){
				coverLink = "";

			} else {
				coverLink = coverphotourl + "&" + positionY;

			}
			editCover = editCover.bind(this)
			editCover();
		}
		bgState = true;

		//for reposition and remove
		function editCover() {
			validateBackground = validateBackground.bind(this);
			var isValid = validateBackground();
			if (isValid == true) {
				//form validation success
				let background = "";
				let email = this.refs.email.value;
	
				var opt = {"email": email,
							"coverLink": coverLink
						}
	
				var request =  [
							"Users",
							"editBackground",
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
						  	$("#bgUpload").hide();
	    	    			$('.c-bgUpdate__action').css('display','none');
        					$('.c-uploadbg__form').css('opacity','1');
        	    			$('#bgPic').css('cursor','auto');
        	    			$('.c-uploadbg__form').css('z-index','19');
        	    			$('.c-form__avatar').css('z-index','18');
							$('#bgUpload').parent().parent().find('#bgAlert').hide();
                			oripx = positionY;
						}
					}.bind(this)
				});
			}
		}
		
		//for upload new bg
		function uploadCover() {
			validateBackground = validateBackground.bind(this);
			var isValid = validateBackground();
			if (isValid == true) {
				//form validation success
				let background = "";
				let firstName = this.refs.firstname.value;
	
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
        	    			$('.c-uploadbg__form').css('z-index','19');
        	    			$('#backgroundEdit').attr('disabled', false);
                			$('#backgroundRemove').attr('disabled', false);
							$('#bgUpload').parent().parent().find('#bgAlert').hide();
                			oripx = positionY;
						}
					}.bind(this)
				});
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
				valid = false;
				return false;
			}
		}
	}
		
	//new bg selected
	readBgURL(){
		var y1, y2;

		var input = document.getElementById('bgUpload');
		if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $('#bgPic').attr('src', e.target.result);
                $('.c-img__background').css('transform', 'translate(0px, 0px)');
                $('.c-profileform__background').css('background-color', 'transparent');
                $('#bgPic').css('cursor','s-resize');
                $("#bgUpload").prop("disabled", false);
				globalFunction.userProfileEditClick("bgPic");
		        $('.c-form__avatar').css('z-index','auto');
		        coverAction = "upload";
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

	//drop down for update bg picture
	handleDropDown(e){
		var $ = require ('jquery')
		if($('#updateBg').hasClass('active')){
			$('#updateBg').removeClass('active');
			$('#updateBg').removeClass('on');
			$('#updateBg').addClass('off');
			
		}else {
			$('#updateBg').addClass('active');
			$('#updateBg').addClass('on');
			$('#updateBg').removeClass('off');
		}
	}

	//drag current cover photo
	reposition(e) {
		var $ = require ('jquery')
		$('.c-uploadbg__form').css('z-index','auto');
        $('#bgPic').css('cursor','s-resize');
        $('.c-form__avatar').css('z-index','auto');
        $('.c-bgUpdate__action').css('display','flex');
        coverAction = "edit";
		globalFunction.userProfileEditClick("bgPic");
		bgState = false;
        $('.c-uploadbg__form').css('opacity','0');
	}

	//remove current cover photo
	remove(e) {
		var $= require ('jquery')
        coverAction = "remove";
		$('#backgroundSave').click();
		$('.c-profileform__background').css('background-color', '#ECE8E1');
        $('.c-img__background').css('transform', 'translate(0px, 0px)');
        $('#bgPic').attr('src', "");
        $('#backgroundEdit').attr('disabled', true);
		bgState = false;
        $('#backgroundRemove').attr('disabled', true);
        coverphotourl = "";
        oripx = "";
		globalFunction.userProfileEditClick("bgPic");
        oricover = "";
	}

	removeAvatar(e){
		var $= require ('jquery')
        $('.c-avatar').attr('src', "app/assets/images/content/promotional/users/avatar-default.png");
        $('#removeAvatarButton').hide();
        $('.c-avatar').val("");
		$('#picUpload').parent().parent().find('.alertpic').hide();
        avatarState = true;
        call.passFormDataWithoutCallback("Users","removeAvatar",{"email":betaEmail,"avatarLink":""});
	}

	render() {

		return (	
			<InlineCss stylesheet={css.userProfileContent(this.props.arabic)} namespace="UserProfile">
				<div className="o-userprofile-container">
					<div className="c-userprofile__form">
			     		<div className = "c-profileform__background">
			     			<Draggable axis="y" bounds={{top: -350, bottom: 0}} onStop={this.dragImage.bind(this)}>
			     				<img id="bgPic" className="c-img__background" />						        
						    </Draggable>
						</div>
						<div className="alert text-danger" id="bgAlert"></div>
						<div className="o-userprofile-padding c-uploadbg__form">							
							<div id="updateBg" className="o-wrapper-dropdown off" tabIndex="1" onClick={this.handleDropDown.bind(this)}>
								<span>Update Background Picture</span>
								<ul className="c-updatebg-dropdown">
									<li><button className="c-upload__background" id="backgroundUpload" onClick={this.changeBg.bind(this)}><i className="fa fa-upload"></i>Upload picture</button></li>
									<li><button className="c-upload__background" id="backgroundEdit" onClick={this.reposition.bind(this)}><i className="fa fa-arrows-v"></i>Reposition</button></li>
									<li><button className="c-upload__background" id="backgroundRemove" onClick={this.remove.bind(this)}><i className="fa fa-remove"></i>Remove background picture</button></li>
								</ul>
							</div>
							<input id="bgUpload" type="file" accept="image/*" onChange={this.readBgURL.bind(this)} />
						</div>
						<div className="c-form__avatar">							
							<div className="u-icon__wrapper">
								<img className="c-avatar" id="avatar"/>
								<button className="o-remove__avatar" id="removeAvatarButton" onClick={this.removeAvatar.bind(this)}><i className="fa fa-remove"></i></button>
								<button className="o-upload__camera" onClick={this.changeAvatar.bind(this)}><i className="fa fa-camera"></i></button>
							</div>
							<div className="alertpic text-danger"></div>
							<input id="picUpload" type="file" accept="image/*" onChange={this.readURL.bind(this)} />
						</div>
						<div className="o-userprofile-padding">
							<div className="o-container__content">
								<section className="o-profilecontainer__section">
									<h2>Personal Information</h2>
									<div className="o-profilecontainer__row">
										<div className="c-profileform__group">
											<label htmlFor="c-firstname">{lang(this.props.language, "userProfileElementFirstName")}</label>
											<div className="u-profileselect__wrapper">
												<input id="c-firstname" className="o-profileform__input" type="text" ref="firstname" disabled />
												<i className="fa fa-edit" id="firstname"></i>
											</div><div className="alert text-danger"></div>
										</div>
										<div className="c-profileform__group">
											<label htmlFor="c-lastname">{lang(this.props.language, "userProfileElementLastName")}</label>
											<div className="u-profileselect__wrapper">
												<input id="c-lastname" className="o-profileform__input" type="text" ref="lastname" disabled/>
												<i className="fa fa-edit" id="lastname"></i>
											</div><div className="alert text-danger"></div>
										</div>
									</div>
									<div className="o-profilecontainer__row">
										<div className="c-profileform__group">
											<label htmlFor="c-dateofbirth">{lang(this.props.language, "userProfileElementDateofBirth")}</label>
											<div className="u-profileselect__wrapper">
												<input className="overlay__date o-profileform__input" disabled/>
												<DatePicker className="o-profileform__input" id="c-dob" ref="dob"  selected={this.state.startDate} onChange={this.handleChangeDate.bind(this)} />
												<i className="fa fa-angle-down"></i>
												<i className="fa fa-edit" id="dob"></i>
											</div><div className="alert text-danger"></div>
										</div>
										<div className="c-profileform__group">
											<label htmlFor="c-gender">{lang(this.props.language, "userProfileElementGender")}</label>
											<div className="u-profileselect__wrapper">
												<select id="c-gender" className="c-selection has-dropdown" ref="gender" disabled>
												</select>
												<i className="fa fa-angle-down"></i>
												<i className="fa fa-edit" id="gender"></i>
											</div><div className="alert text-danger"></div>
										</div>
										
									</div>
								</section>
								<section className="o-profilecontainer__section">
									<h2>Contact Information</h2>
									<div className="o-profilecontainer__row">
										<div className="c-profileform__group">
											<label htmlFor="c-email">{lang(this.props.language, "userProfileElementEmail")}</label>
											<div className="u-profileselect__wrapper">
												<input id="c-email" className="o-profileform__input" type="text" ref="email" disabled/>
												{/*<i className="fa fa-edit" id="email"></i>*/}
											</div>
										</div>
										
										<div className="c-profileform__group">
											<label htmlFor="c-nationality">{lang(this.props.language, "userProfileElementNationality")}</label>
											<div className="u-profileselect__wrapper">
												<input id="c-nationality" className="o-profileform__input" type="o-text" ref="nationality" disabled/>
												<i className="fa fa-edit" id="nationality"></i>
											</div><div className="alert text-danger"></div>
										</div>
									</div>									
								</section>						
								<footer className="o-container__footer" id="editButton">
									<div className="o-profilecontainer__row c-submit__form">
										<button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect c-submit is-submit" onClick={this._handleSubmit.bind(this)} >Save Changes</button>
									</div>
								</footer>
							</div>
						</div>
					</div>					
				</div>
			</InlineCss>
		);
	}

};

UserProfile.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserProfile;