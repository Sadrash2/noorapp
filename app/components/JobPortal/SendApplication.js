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

var countryState, stateCity;

class SendApplication extends React.Component {

	constructor(args) {
		super(args);
	}

    handleCountryChange (e) {
    	var $ = require ('jquery')
    	var CountryId = document.getElementById("c-country").value;
		var getId = CountryId.split("-");

		globalFunction.countryChange(getId[0], function(data){
			var response = JSON.parse(data);
				if(response.state === 200) {	

					$("#c-state option").remove();	
					document.getElementById("c-state").disabled=false;

					var i = 0;
					$('#c-city')
		                .append($("<option selected disabled>-- Select a state --</option>"));
		            $('#c-state')
		                .append($("<option selected disabled>-- Select an option --</option>"));
					$.each(response.success, function(key, value) {
						$('#c-state')
							.append($("<option></option>")
							    .attr("value",response.success[i].id+"-"+response.success[i].name)
							    .text(response.success[i].name));

						if(response.success[i].name == e){
							$('#c-state option[value="'+response.success[i].id+"-"+response.success[i].name+'"]').attr("selected",true);
						}
						i++;
					});	

							
					loadCity(document.getElementById("c-state").value);

				}
				else {
					$("#c-state option").remove();
					$('#c-state').append("<option> - </option>");
					document.getElementById("c-state").disabled=true;
					$("#c-city option").remove();
					$('#c-city').append("<option> - </option>");
					document.getElementById("c-city").disabled=true;

				}
		});

		function loadCity(StateId){
			var $ = require ('jquery')
			var getId = StateId.split("-");

			globalFunction.stateChange(getId[0], function(data){
				var response = JSON.parse(data);
					if(response.state === 200) {	

						$("#c-city option").remove();
						document.getElementById("c-city").disabled=false;
						$('#c-city')
		                .append($("<option selected disabled>-- Select an option --</option>"));

						var i = 0;
						$.each(response.success, function(key, value) {
							$('#c-city')
							    .append($("<option></option>")
							        .attr("value",response.success[i].id+"-"+response.success[i].name)
							        .text(response.success[i].name));

							if(response.success[i].name == stateCity){
								$('#c-city option[value="'+response.success[i].id+"-"+response.success[i].name+'"]').attr("selected",true);

							}

							i++;
						});	
							         
					}
					else {
						$("#c-city option").remove();
						if(stateCity != "-"){
							$('#c-city')
								.append($("<option selected disabled>-- Select a state --</option>"));
							$('#c-city').append("<option> - </option>");

						}else{
							$('#c-city')
								.append($("<option disabled>-- Select a state --</option>"));
							$('#c-city').append("<option selected> - </option>");
						}
						
						document.getElementById("c-city").disabled=true;

					}
			});
		}
    }

    handleStateChange (e) {
    	var $ = require ('jquery')
    	var StateId = document.getElementById("c-state").value;
		var getId = StateId.split("-");

		globalFunction.stateChange(getId[0], function(data){
			var response = JSON.parse(data);
					if(response.state === 200) {	

						$("#c-city option").remove();
						document.getElementById("c-city").disabled=false;
						$('#c-city')
		                .append($("<option selected disabled>-- Select an option --</option>"));

						var i = 0;
						$.each(response.success, function(key, value) {
							$('#c-city')
							    .append($("<option></option>")
							        .attr("value",response.success[i].id+"-"+response.success[i].name)
							        .text(response.success[i].name));


							i++;
						});	
							         
					}
					else {
						$("#c-city option").remove();
						$('#c-city').append("<option> - </option>");
						document.getElementById("c-city").disabled=true;
					}
		});
    }

	//handle SubmitButton
	_handleSubmit(e) {
		var isValid = this.validateForm();

		if (isValid == true) {
			//form validation success
			let firstName = this.refs.firstname.value;
			let lastName = this.refs.lastname.value;
			let email = this.refs.email.value;
			let phone = this.refs.phone.value;
			let dateOfBirth = this.refs.dateofbirth.value;
			let maritalStatus = document.getElementById("c-maritalstatus").value;
			let gender = document.getElementById("c-gender").value;
			let icPassport = this.refs.icpassport.value;
			let nationality = this.refs.nationality.value;
			let address1 = this.refs.address1.value;
			let address2 = this.refs.address2.value;
			let cityValue = document.getElementById("c-city").value;
			var city = cityValue.split("-");
			let countryValue = document.getElementById("c-country").value;
			var country = countryValue.split("-");
			let stateValue = document.getElementById("c-state").value;
			var state = stateValue.split("-");

			let postCode = this.refs.postcode.value;
			let categories = document.getElementById("c-categories").value;
			let position = document.getElementById("c-position").value;
			let cvLink = "";
			let resumeLink = "";
			let portfolioLink = "";
			var $ = require ('jquery')
			var opt = {"firstName": firstName,
					"lastName": lastName,
					"email": email,
					"phone": phone,
					"birthDate": dateOfBirth,
					"marital": maritalStatus,
					"gender": gender,
					"passportNr": icPassport,
					"nationality": nationality,
					"addressline1": address1,
					"addressline2": address2,
					"city": city[1],
					"state": state[1],
					"country": country[1],
					"postcode": postCode,
					"category": categories,
					"position": position,
					"cv": cvLink,
					"resume": resumeLink,
					"portfolio": portfolioLink};

				var request =  [
					"Applications",
					"enter",
					opt];

				var json = JSON.stringify(request);  

				var form_data = new FormData();  
			    form_data.append('request', json); 
			    var file_data = document.getElementById('cvButton').files[0];              
			    form_data.append('cv', file_data);
			    file_data = document.getElementById('resumeButton').files[0]; 
			    form_data.append('resume', file_data);
			    file_data = document.getElementById('portfolioButton').files[0]; 
			    form_data.append('portfolio', file_data);

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
							this.context.router.push(config.root + "/applicationConfirmation");

						}
						else {
							alert("Unable to reach database, please try again later.");
						}
					}.bind(this)
					 });
		 } else {
	    } 
	}
	
	//Validate Form
	validateForm() {
		let icPassport = this.refs.icpassport.value;
		let firstName = this.refs.firstname.value;
		let lastName = this.refs.lastname.value;
		let email = this.refs.email.value;
		let phone = this.refs.phone.value;
		let dateOfBirth = this.refs.dateofbirth.value;
		let nationality = this.refs.nationality.value;
		let address1 = this.refs.address1.value;
		let address2 = this.refs.address2.value;
		let postCode = this.refs.postcode.value;
		let cvFileData = document.getElementById('cvButton').value;
		let resumeFileData = document.getElementById('resumeButton').value;
		let portfolioFileData = document.getElementById('portfolioButton').value;
		let gender = document.getElementById('c-gender').selectedIndex;
		let maritalstatus = document.getElementById('c-maritalstatus').selectedIndex;
		let country = document.getElementById('c-country').selectedIndex;
		let state = document.getElementById('c-state').selectedIndex;
		let city = document.getElementById('c-city').selectedIndex;

		//globalvalidation function
		var validateFinal = validation.sendApplicationValidation(email, firstName, lastName, phone, dateOfBirth,
																 nationality, address1, address2, postCode, icPassport,
																 cvFileData, resumeFileData, portfolioFileData,
																 gender, maritalstatus, country, state, city);
		var validArray = validateFinal.valid;
		var messageArray = validateFinal.message;

		var validChecker = true;
		var allErrorMessage = "";

		/*'is-required = error' 'o-form__input = success'*/
		//email
		if (validArray[0] == false) {
			document.getElementById('c-email').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[0] + "\n";
		} else {
			document.getElementById('c-email').className='o-form__input';
		}

		//firstName
		if (validArray[1] == false) {
			document.getElementById('c-firstname').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[1] + "\n";
		} else {
			document.getElementById('c-firstname').className='o-form__input';
		}

		//lastName
		if (validArray[2] == false) {
			document.getElementById('c-lastname').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[2] + "\n";
		} else {
			document.getElementById('c-lastname').className='o-form__input';
		}

		//phone
		if (validArray[3] == false) {
			document.getElementById('c-phone').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[3] + "\n";
		} else {
			document.getElementById('c-phone').className='o-form__input';
		}

		//dob
		if (validArray[4] == false) {
			document.getElementById('c-dateofbirth').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[4] + "\n";
		} else {
			document.getElementById('c-dateofbirth').className='o-form__input';
		}

		//nationality
		if (validArray[5] == false) {
			document.getElementById('c-nationality').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[5] + "\n";
		} else {
			document.getElementById('c-nationality').className='o-form__input';
		}

		//address
		if (validArray[6] == false) {
			if (messageArray[6] == "Address error: Address second text-box maximum 45 characters! current length: " + address2.length) {
				document.getElementById('c-address2').className='is-required';
			} else {
				document.getElementById('c-address1').className='is-required';
			}
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[6] + "\n";
		} else {
			document.getElementById('c-address1').className='o-form__input';
			document.getElementById('c-address2').className='o-form__input';
		}

		//postCode
		if (validArray[7] == false) {
			document.getElementById('c-postcode').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[7] + "\n";
		} else {
			document.getElementById('c-postcode').className='o-form__input';
		}

		//icPassport
		if (validArray[8] == false) {
			document.getElementById('c-icpassport').className='is-required';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[8] + "\n";
		} else {
			document.getElementById('c-icpassport').className='o-form__input';
		}

		//cv
		if (validArray[9] == false) {
			document.getElementById('cvButton').className='c-cvButton is-required_upload_field';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[9] + "\n";
		} else {
			document.getElementById('cvButton').className='c-cvButton o-upload__field';
		}

		//resume
		if (validArray[10] == false) {
			document.getElementById('resumeButton').className='c-resumeButton is-required_upload_field';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[10] + "\n";
		} else {
			document.getElementById('resumeButton').className='c-resumeButton o-upload__field';
		}

		//portfolio
		if (validArray[11] == false) {
			document.getElementById('portfolioButton').className='c-portfolioButton is-required_upload_field';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[11] + "\n";
		} else {
			document.getElementById('portfolioButton').className='c-portfolioButton o-upload__field';
		}

		//gender
		if (validArray[12] == false) {
			document.getElementById('c-gender').className='c-application__form has-dropdown is-required_dropdown';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[12] + "\n";
		} else {
			document.getElementById('c-gender').className='c-application__form has-dropdown';
		}

		//portfolio
		if (validArray[13] == false) {
			document.getElementById('c-maritalstatus').className='c-application__form has-dropdown is-required_dropdown';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[13] + "\n";
		} else {
			document.getElementById('c-maritalstatus').className='c-application__form has-dropdown';
		}

		//portfolio
		if (validArray[14] == false) {
			document.getElementById('c-country').className='c-application__form has-dropdown is-required_dropdown';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[14] + "\n";
		} else {
			document.getElementById('c-country').className='c-application__form has-dropdown';
		}

		//portfolio
		if (validArray[15] == false) {
			document.getElementById('c-state').className='c-application__form has-dropdown is-required_dropdown';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[15] + "\n";
		} else {
			document.getElementById('c-state').className='c-application__form has-dropdown';
		}

		//portfolio
		if (validArray[16] == false) {
			document.getElementById('c-city').className='c-application__form has-dropdown is-required_dropdown';
			validChecker = false;
			allErrorMessage = allErrorMessage + messageArray[16] + "\n";
		} else {
			document.getElementById('c-city').className='c-application__form has-dropdown';
		}

		//FinalCheck if false show error message
		if (validChecker == true) {
			return true;
		} else {
			alert(allErrorMessage);
			return false;
		}
	}

	//load Field of Expertise and Job Drop Down 
	loadOption(){
		var $ = require ('jquery')
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
			queryEnd   = url.indexOf("?") + 1 || url.length + 1,
			query = url.slice(queryStart, queryEnd - 1),
			pairs = query.replace(/\+/g, " ").split("&"),
			parms = {}, i, n, v, nv;

		globalFunction.getJobFetchAll(function(data){
			var response = JSON.parse(data);
					if(response.state === 200) {				

						var i = 0;
						$.each(response.success, function(key, value) {
						    $('#c-position')
						         .append($("<option></option>")
						                    .attr("value",response.success[i].title)
						                    .text(response.success[i].title));

						    if(response.success[i].id == query){
								$('#c-position option[value="'+response.success[i].title+'"]').attr("selected",true);
								loadCategory(response.success[i].category);
								
						    }

						    i++;
						});			
						var gender = ["Male", "Female"];
						var maritalStatusCategories = ["Single", "Married", "Separated", "Divorced", "Widower"];
						loadGender(gender);
						loadMarital(maritalStatusCategories);	

					}
					else {
					}
		});	

			function loadCategory(category){
				globalFunction.getCategories(function(data){
					var response = JSON.parse(data);
						if(response.state === 200) {				

							var i = 0;
							$.each(response.success, function(key, value) {   
							     $('#c-categories')
							         .append($("<option></option>")
							                    .attr("value",response.success[i])
							                    .text(response.success[i])); 

							    i++;
							});

							$('#c-categories option[value="'+category+'"]').attr("selected",true);
							
						}
						else {
						}
				});
			}

			function loadGender(gender){
				var $ = require ('jquery')
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

            function loadMarital(marital){
				var $ = require ('jquery')
				$('#c-maritalstatus')
                             .append($("<option selected disabled>-- Select an option --</option>"));
                var i = 0;
                $.each(marital, function(key, value) {
                    $('#c-maritalstatus')
                             .append($("<option></option>")
                            .attr("value",marital[i])
                            .text(marital[i]));

                    i++;
                });                
            }

		}

	checkLogIn(){
		var status = Cookies.readCookie('loggedIn');
		var user = Cookies.readCookie('user');
		if(status == "true"){
			if(user != ""){
				var $ = require ('jquery')
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
						$("#c-firstname").val(response.success.firstName);
						$("#c-lastname").val(response.success.lastName);
						$("#c-email").val(response.success.email);
						$("#c-phone").val(response.success.phone);
						$("#c-icpassport").val(response.success.passportNr);
						$("#c-nationality").val(response.success.nationality);
						$("#c-address1").val(response.success.addressline1);
						$("#c-address2").val(response.success.addressline2);
						$("#c-postcode").val(response.success.postcode);

						if(response.success.birthDate != "0"){
						 	var dateContent = new Date(response.success.birthDate*1000);
                            let year = dateContent.getFullYear();
                            let month = ('0' + (dateContent.getMonth() + 1)).slice(-2);
                            let day = ('0' + dateContent.getDate()).slice(-2) ;
                            var date = year+"-"+month+"-"+day;
						 	$("#c-dateofbirth").val(date);
							 	
						}

						if(response.success.gender != ""){
						 	$('#c-gender option[value="'+response.success.gender+'"]').attr("selected",true);
						}

						if(response.success.marital != ""){
							$('#c-maritalstatus option[value="'+response.success.marital+'"]').attr("selected",true);
						}

						if(response.success.country != ""){
						 	$('#c-country option[text="'+response.success.country+'"]').attr("selected",true);
						 	stateCity = response.success.city;
						 	countryState = response.success.state;
						 	this.handleCountryChange(response.success.state);
						}

					}
					else {
					}

				}.bind(this)
			});
			}

		} else {
			
		}
	}

	componentDidMount() {
		this.loadOption();
		this.loadCountry();
		this.checkLogIn();
		/*Set maximum input date to today.*/
		var today = globalFunction.setMaxDate();
		document.getElementById("c-dateofbirth").setAttribute("max", today);
	}

	loadCountry(){
		var $ = require ('jquery')
			globalFunction.getCountry(function(data) {
				var response = JSON.parse(data);
					if(response.state === 200) {				

						var i = 0;
						$('#c-country')
                             .append($("<option selected disabled>-- Select an option --</option>"));
		                    $('#c-city')
		                             .append($("<option selected disabled>-- Select a country --</option>"));
		                    $('#c-state')
		                             .append($("<option selected disabled>-- Select a country --</option>"));
						$.each(response.success, function(key, value) {
						    $('#c-country')
						         .append($("<option></option>")
						                    .attr("value",response.success[i].id+"-"+response.success[i].name)
						                    .attr("text",response.success[i].name)
						                    .text(response.success[i].name));

						    i++;
						});	
					}
					else {
					}
			});	
		}

	render() {
		
		var Recaptcha = require('react-gcaptcha');

		return (	
			<InlineCss stylesheet={SendApplication.css(this.props.arabic)} namespace="SendApplication">
				<div className="o-sendapplication-container">
					<header className="o-sendapplication__header">
						<div className="o-sendapplication-padding">
							<h1 className="c-page__title o-sendapplication__title u-center-alignment">{lang(this.props.language, "sendApplicationTitle")}</h1>
							<p className="c-page__description o-sendapplication__description u-center-alignment">{lang(this.props.language, "sendApplicationDescription")}</p>
						</div>
					</header>
					<div className="o-container c-sendapplication__form">
						<div className="o-sendapplication-padding">
							<div className="o-container__content">
								<section className="o-container__section">
									<h3>{lang(this.props.language, "sendApplicationTitlePosition")}</h3>
									<div className="o-container__row">
										<div className="c-form__group">
											<label htmlFor="c-categories">{lang(this.props.language, "sendApplicationElementCategories")}*</label>
											<div className="u-select__wrapper">
												
												<select id="c-categories">
												</select>
												<i className="fa fa-angle-down"></i>
											</div>
										</div>
										<div className="c-form__group">
											<label htmlFor="c-position">{lang(this.props.language, "sendApplicationElementPosition")}</label>
											<div className="u-select__wrapper">
												<select id="c-position" className="c-selection has-dropdown">
												</select>
												<i className="fa fa-angle-down"></i>
											</div>
										</div>
									</div>
								</section>
								<section className="o-container__section">
									<h3>{lang(this.props.language, "sendApplicationTitleBasic")}</h3>
									<div className="o-container__row">
										<div className="c-form__group">
											<label htmlFor="firstname">{lang(this.props.language, "sendApplicationElementFirstName")}</label>
											<input id="c-firstname" className="o-form__input" type="o-text" ref="firstname" />
										</div>
										<div className="c-form__group">
											<label htmlFor="c-lastname">{lang(this.props.language, "sendApplicationElementLastName")}</label>
											<input id="c-lastname" className="o-form__input" type="o-text" ref="lastname" />
										</div>
									</div>
									<div className="o-container__row">
										<div className="c-form__group">
											<label htmlFor="c-email">{lang(this.props.language, "sendApplicationElementEmail")}</label>
											<input id="c-email" className="o-form__input" type="o-text" ref="email" />
										</div>
										<div className="c-form__group">
											<label htmlFor="c-phone">{lang(this.props.language, "sendApplicationElementPhone")}</label>
											<input id="c-phone" className="o-form__input" type="o-text" ref="phone" />
										</div>
									</div>
									<div className="o-container__row has-three-elements">
										<div className="c-form__group">
											<label htmlFor="c-dateofbirth">{lang(this.props.language, "sendApplicationElementDateOfBirth")}</label>
											<input id="c-dateofbirth" className="o-form__input" type="Date" max='2000-13-13' onClick={this.setMaxDate} ref="dateofbirth" />
										</div>
										<div className="c-form__group">
											<label htmlFor="c-gender">{lang(this.props.language, "sendApplicationElementGender")}</label>
											<div className="u-select__wrapper">
												<select id="c-gender" className="c-application__form has-dropdown" ref="gender">
												</select>
												<i className="fa fa-angle-down"></i>
											</div>
										</div>
										<div className="c-form__group">
											<label htmlFor="c-maritalstatus">{lang(this.props.language, "sendApplicationElementMaritalStatus")}</label>
											<div className="u-select__wrapper">
												<select id="c-maritalstatus" className="c-selection has-dropdown" ref="maritalstatus">
												</select>
												<i className="fa fa-angle-down"></i>
											</div>
										</div>
									</div>
									<div className="o-container__row">
										<div className="c-form__group">
											<label htmlFor="c-icpassport">{lang(this.props.language, "sendApplicationElementIC")}</label>
											<input id="c-icpassport" className="o-form__input" type="o-text" ref="icpassport" />
										</div>
										<div className="c-form__group">
											<label htmlFor="c-nationality">{lang(this.props.language, "sendApplicationElementNationality")}</label>
											<input id="c-nationality" className="o-form__input" type="o-text" ref="nationality" />
										</div>
									</div>
									
									<div className="o-container__row">

										<div className="o-container__row o-half__row">
											<div className="c-form__group">
												<label htmlFor="c-address1">{lang(this.props.language, "sendApplicationElementAdress")}</label>
												<input id="c-address1" className="o-form__input" type="o-text" ref="address1" />
												<input id="c-address2" className="o-form__input" type="o-text" ref="address2" />
											</div>
											<div className="c-form__group">
												<label htmlFor="c-country">{lang(this.props.language, "sendApplicationElementCountry")}</label>
												<div className="u-select__wrapper">
													<select id="c-country" className="c-selection has-dropdown" onChange={this.handleCountryChange.bind(this)}>
													</select>
													<i className="fa fa-angle-down"></i>
												</div>
											</div>										
											<div className="c-form__group">
												<label htmlFor="c-state">{lang(this.props.language, "sendApplicationElementState")}</label>
												<div className="u-select__wrapper">
													<select id="c-state" className="c-selection has-dropdown" onChange={this.handleStateChange.bind(this)}>
													</select>
													<i className="fa fa-angle-down"></i>
												</div>
											</div>
											<div className="c-form__group">
												<label htmlFor="c-city">{lang(this.props.language, "sendApplicationElementCity")}</label>
												<div className="u-select__wrapper">
													<select id="c-city" className="c-selection has-dropdown">
													</select>
													<i className="fa fa-angle-down"></i>
												</div>
											</div>
											<div className="c-form__group">
												<label htmlFor="c-postcode">{lang(this.props.language, "sendApplicationElementPostCode")}</label>
												<input id="c-postcode" className="o-form__input" type="o-text" ref="postcode" />
											</div>
										</div>
										<div className="o-container__row o-half__row">
											<section className="o-container__section">
												<h3>{lang(this.props.language, "sendApplicationTitleAttachements")}</h3>
												<div className="o-container__row o-half__row">
													<div className="c-form__group">
														<label htmlFor="c-cv">{lang(this.props.language, "sendApplicationElementCV")}</label>
														<input name="cv" className="c-cvButton o-upload__field" type="file" id="cvButton" accept=".pdf" />
													</div>
													<div className="c-form__group">
														<label htmlFor="c-resume">{lang(this.props.language, "sendApplicationElementResume")}</label>
														<input name="resume" className="c-resumeButton o-upload__field" type="file" id="resumeButton" accept=".pdf" />
													</div>
													<div className="c-form__group">
														<label htmlFor="c-file">{lang(this.props.language, "sendApplicationElementPortfolio")}</label>
														<input name="portfolio" className="c-portfolioButton o-upload__field" type="file" id="portfolioButton" accept=".pdf"	/>
													</div>
												</div>
											</section>
										</div>
									</div>
								</section>
								
								<footer className="o-container__footer">
									<div className="o-container__row">
										{/*<div><Recaptcha sitekey=-"your key" /></div>*/}
										<button type="button" className="c-submit o-form__button is-primary is-right" onClick={this._handleSubmit.bind(this)}>{lang(this.props.language, "sendApplicationControlSubmit")}</button>
									</div>
								</footer>
							</div>
						</div>
					</div>
				</div>
				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `
			.clearfix() {
			  &:before,
			  &:after {
			    content: " ";
			    display: table;
			  }
			  &:after {
			    clear: both;
			  }
			}
			.u-small-font-size {
				font-size: 1.4rem;
			}
			.is-required {
				display: block;
				width: 100%;
				padding: 12px 12px 8px;
				background-color: white;
				border: 1px solid #C54D4D;
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
			.is-required_dropdown{
				border: 1px solid #C54D4D;
				transition: border-color .25s ease-in-out;
			}
			.c-form__group > label {
				display: block;
				font-size: 1.4rem;
			}
			.o-form__input {
				display: block;
				width: 100%;
				padding: 12px 12px 8px;
				background-color: white;
				border: 1px solid rgba(0,0,0,0.075);
				font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				font-size: 1.4rem;
				font-weight: 600;
				text-indent: 0;
				line-height: 1.42857143;
				color: #746A5A;
				box-shadow: inset 0 2px 1px 0 rgba(0,0,0,0.075);
				transition: border-color .25s ease-in-out;
				-webkit-appearance: none;
			    -moz-appearance: none;
			    appearance: none;
			}
			{/*o-form__input:hover, .o-form__input:focus  {
				border-color: #E0DDD6;
				color: #E0DDD6;
			}*/}
			.o-form__input:focus, select:focus {
				box-shadow: 0px;
  				outline: 0 none;
			}
			.u-select__wrapper {
				position: relative;
				background-color: white;
			}
			.u-select__wrapper > i {
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
			select {
				position: relative;
				display: block;
				width: 100%;
				padding: 12px 21px;
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
			select::-ms-expand {
			    display: none;
			}
			select:hover, select:focus {
				border-color: #E0DDD6;
			}
			.o-form__button {
				padding: 16px 23px;
				font-size: 1.6rem;
				font-weight: 600;
				letter-spacing: 0.6px;
			}
			button.is-primary {
				border: 0px;
				background-color: #C79269;
				color: white;
			}
			.is-large {
				padding: 23px 32px;
				font-size: 1.9rem;
			}
			.is-block {
				display: block;
				width: 100%;
			}
			.is-left {
				float: left !important;
			}
			.is-right {
				float: right !important;
			}




			& {
				padding-top: 66px;
			}

			& > .o-sendapplication-container header {
				padding: 64px 0;
			}

			& > .o-sendapplication-container header >.o-sendapplication-padding h1 {
				margin-bottonm: 32px;
				font-size: 2.4rem;
				line-height: 33px;
				font-weight: 500;
				letter-spacing: 0.57px;
			}

			& > .o-sendapplication-container header >.o-sendapplication-padding p {
				font-size: 2.0rem;
				line-height: 28px;
			}

			& div.o-container__content > section.o-container__section {

			}

			& div.o-container__content > section.o-container__section:first-child {
				background-color: #F2F0ED;
			}

			& div.o-container__content > section.o-container__section:nth-child(2) {
				border-bottom: 1px solid #F2F0ED;
			}

			& section.o-container__section {
				padding: 23px;
			}

			& section.o-container__section > h3 {
				margin-bottom: 16px;
				font-size: 2.0rem;
				line-height: 23px;
				color: black;
				font-weight: 500;
			}

			.c-form__group {
				margin-bottom: 32px;
			}

			.o-upload__field {
				padding: 16px 23px;
				background-color: #E0DDD6;
				font-size: 1.4rem;
				font-weight: 600;
				cursor: pointer;
				transition: opacity .25s ease-in-out;
			}

			.is-required_upload_field {
				padding: 15px 22px;
				background-color: #E0DDD6;
				font-size: 1.4rem;
				font-weight: 600;
				cursor: pointer;
				transition: opacity .25s ease-in-out;
				border: 1px solid #C54D4D;
				transition: border-color .25s ease-in-out;
			}

			.o-upload__field:hover {
				opacity: 0.75;
			}

			.o-upload__field > i {
				margin-right: 16px;
			}

			footer.o-container__footer {
				padding: 23px;
			}
			@media (min-width: 768px) {
				& > .o-sendapplication-container header >.o-sendapplication-padding h1 {
					font-size: 3.6rem;
					line-height: 48px;
					letter-spacing: 0.85px;
				}
				& > .o-sendapplication-container .c-sendapplication__form >.o-sendapplication-padding .o-container__content {
					background-color: white;
					box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
				}
				& > .o-sendapplication-container .c-sendapplication__form {
					padding: 0;
				}
				.o-half__row {
					width: 50% !important;
				}
				.o-half__row > .c-form__group {
					width: 100% !important;
				}
				.o-container__row {
					display: flex;
					flex-flow: row wrap;
					justify-content: space-between;
				}
				.o-container__row > .c-form__group {
					width: 49%;
				}
				.has-three-elements > .c-form__group {
					width: 32% !important;
				}
			}
		` + functions.responsivePadding(".o-sendapplication-padding");

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

SendApplication.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default SendApplication;