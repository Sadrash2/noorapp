//////////////export functions///////////////////
let ValidationFunction = {

	//Regex for validation
	isNameValid: function(name) {
		//accept only alpha characters and space character
		// var re = /^[A-Za-z ]+$/;
		var re = /([^\u0000-\u007F]|^[A-Za-z ]+$)+/;
		return re.test(name);
	},

	isICValid: function(ic) {
		//malaysia IC verification
		var re = /^\d{6}\d{2}\d{4}$/;
		return re.test(ic);
	},

	isEmailValid: function(email) {
		//email address verification
		var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(email);
	},

	onlyAlphabet: function(string) {
		//accept only alphabet
		var re = /^[A-Za-z]+$/;
		return re.test(string);
	},

	onlyAlphaNumeric: function(string) {
		//accept only alphabet
		var re = /^[A-Za-z0-9]+$/;
		return re.test(string);
	},

	onlyDigit: function(string) {
		//accept only numbers
		var re = /^\+?[0-9]+$/;
		return re.test(string);
	},

	//validate mosque name
	validateMosqueName: function(mosqueName)  {
		var mosqueNameValid = false;
		var errorMessage = "";

		if (mosqueName.length == 0) {
			mosqueNameValid = false;
			errorMessage = "Mosque Name error: Please enter your Mosque Name!";
		} else if (mosqueName.length > 50) {
			mosqueNameValid = false;
			errorMessage = "Mosque Name error: Mosque Name maximum 50 characters! current length: " + mosqueName.length;
		} 
		else if (!(this.isNameValid(mosqueName))) {
			mosqueNameValid = false;
			errorMessage = "Mosque Name error: Please enter only Alpha characters!";
		} 
		else {
			mosqueNameValid = true;
			errorMessage = ""
		}

		return [mosqueNameValid, errorMessage];
	},

	//firstName validation
	validateFirstName: function(firstName)  {
		var firstNameValid = false;
		var errorMessage = "";
		if (firstName.length == 0) {
			firstNameValid = false;
			errorMessage = " Please enter your First Name!";
		} else if (firstName.length > 50) {
			firstNameValid = false;
			errorMessage = " First Name maximum 50 characters! current length: " + firstName.length;
		} else if (!(this.isNameValid(firstName))) {
			firstNameValid = false;
			errorMessage = " Please enter only Alphabetic characters!";
		} else {
			// document.getElementById('c-firstname').className='o-form__input';
			firstNameValid = true;
			errorMessage = ""
		}

		return [firstNameValid, errorMessage];
	},

	//lastName validation
	validateLastName: function(lastName) {
		var lastNameValid = false;
		var errorMessage = "";

		if (lastName.length == 0) {
			lastNameValid = false;
			errorMessage = "Please enter your Last Name!";
		} else if (lastName.length > 50) {
			lastNameValid = false;
			errorMessage = "Last Name maximum 50 characters! current length: " + lastName.length;
		} else if (!(this.isNameValid(lastName))) {
			lastNameValid = false;
			errorMessage = "Please enter only Alphabetic characters!";
		} else {
			lastNameValid = true;
			errorMessage = "";
		}

		return [lastNameValid, errorMessage];
	},

	//email validation  
	validateEmail: function(email) {
		var emailValid = false;
		var errorMessage = "";

		if(this.isEmailValid(email)) {
			emailValid = true;
			errorMessage = "";
		} else {
			emailValid = false;
			errorMessage = " Please enter a valid email address!";
		}
		
		return [emailValid, errorMessage];
	},

	//email validation not required
	validateEmailNotRequired: function(email) {
		var emailValid = false;
		var errorMessage = "";

		if (email.length !=0) {
			if(this.isEmailValid(email)) {
				emailValid = true;
				errorMessage = "";
			} else {
				emailValid = false;
				errorMessage = "Email address error: Please enter a valid email address!";
			}
		} else {
			emailValid = true;
			errorMessage = "";
		}
		
		return [emailValid, errorMessage];
	},

	//phone validation
	validatePhone: function(phone){
		var phoneValid = false;
		var errorMessage = "";

		if (phone.length == 0) {
			phoneValid = false;
			errorMessage = "Phone number error: Please enter your Phone number!";
		} else if (!(this.onlyDigit(phone))) {
			phoneValid = false;
			errorMessage = "Phone number error: Please enter only numeric characters!";
		} else {
			phoneValid = true;
			errorMessage = "";
		}

		return [phoneValid, errorMessage];
	},

	//phone validation not required
	validatePhoneNotRequired: function(phone){
		var phoneValid = false;
		var errorMessage = "";

		if (phone.length !=0) {
			if (!(this.onlyDigit(phone))) {
				phoneValid = false;
				errorMessage = "Phone number error: Please enter only numeric characters!";
			} else {
				phoneValid = true;
				errorMessage = "";
			}
		} else {
			phoneValid = true;
			errorMessage = "";
		}

		return [phoneValid, errorMessage];
	},

	//imamname validation not required
	validateImamNameNotRequired: function(imamname) {
		var imamnameValid = false;
		var errorMessage = "";

		if (imamname.length != 0) {
			if (imamname.length > 30) {
				imamnameValid = false;
				errorMessage = "Imam Name error: Imam Name maximum 30 characters! current length: " + imamname.length;
			} else if (!(this.onlyAlphabet(imamname))) {
				imamnameValid = false;
				errorMessage = "Imam Name error: Please enter only Alphabetic characters!";
			} else {
				imamnameValid = true;
				errorMessage = "";
			}
		} else {
			imamnameValid = true;
			errorMessage = "";
		}

		return [imamnameValid, errorMessage];
	},

	//website validation not required
	validateWebsiteNotRequired: function(website) {
		var websiteValid = false;
		var errorMessage = "";

		if (website.length != 0) {
			if (website.length > 90) {
				websiteValid = false;
				errorMessage = "Website error: Website maximum 90 characters! current length: " + website.length;
			} else {
				websiteValid = true;
				errorMessage = "";
			}
		} else {
			websiteValid = true;
			errorMessage = "";
		}

		return [websiteValid, errorMessage];
	},

	//dob validation
	validateDOB: function(dob) {
		var dobValid = false;
		var errorMessage = "";

		if (dob.length == 0) {

			dobValid = false;
			errorMessage = "Please enter valid Date of Birth!";
		} else {
			var date = new Date();
			var dob = new Date(dob);

			if(dob > date) {
				dobValid = false;
				errorMessage = "Please enter valid Date of Birth!";
			}else {
				dobValid = true;
				errorMessage = "";
			}
			
		}

		return [dobValid, errorMessage];
	},

	//ICPassport validation
	validateIcPassport: function(icPassport) {
		var icPassportValid = false;
		var errorMessage = "";

		if (icPassport.length == 0) {
			icPassportValid = false;
			errorMessage = "IC/Passport Number error: Please enter your IC/Passport Number!";
		} else if (!(this.onlyAlphaNumeric(icPassport)) ) {
			icPassportValid = false;
			errorMessage = "IC/Passport Number error: Please enter only Alpha-numeric characters";
		} 
		else {
			icPassportValid = true;
			errorMessage = "";
		}

		return [icPassportValid, errorMessage];
	},

	//ICPassport validation not required
	validateIcPassportNotRequired: function(icPassport) {
		var icPassportValid = false;
		var errorMessage = "";

		if (icPassport.length !=0) {
			if (!(this.onlyAlphaNumeric(icPassport)) ) {
				icPassportValid = false;
				errorMessage = "IC/Passport Number error: Please enter only Alpha-numeric characters";
			} else {
				icPassportValid = true;
				errorMessage = "";
			}
		} else {
			icPassportValid = true;
			errorMessage = "";
		}

		return [icPassportValid, errorMessage];
	},


	//nationality validation
	validateNationality: function(nationality) {
		var nationalityValid = false;
		var errorMessage = "";

		if (nationality.length == 0) {
			nationalityValid = false;
			errorMessage = "Please enter your nationality!";
		} else if (nationality.length > 30) {
			nationalityValid = false;
			errorMessage = " Nationality maximum 30 characters! current length: " + nationality.length;
		} else if (!(this.onlyAlphabet(nationality))) {
			nationalityValid = false;
			errorMessage = " Please enter only Alphabetic characters!";
		} else {
			nationalityValid = true;
			errorMessage = "";
		}

		return [nationalityValid, errorMessage];
	},
	//nationality validation not required
	validateNationalityRequired: function(nationality) {
		var nationalityValid = false;
		var errorMessage = "";

		if (nationality.length != "") {
			nationalityValid = true;
			errorMessage = "";
		} else {
			nationalityValid = false;
			errorMessage = "Please choose one";
		}

		return [nationalityValid, errorMessage];
	},

	//nationality validation not required
	validateNationalityNotRequired: function(nationality) {
		var nationalityValid = false;
		var errorMessage = "";

		if (nationality.length != 0) {
			if (nationality.length > 30) {
				nationalityValid = false;
				errorMessage = "Nationality error: Nationality maximum 30 characters! current length: " + nationality.length;
			} else if (!(this.onlyAlphabet(nationality))) {
				nationalityValid = false;
				errorMessage = "Nationality error: Please enter only Alphabetic characters!";
			} else {
				nationalityValid = true;
				errorMessage = "";
			}
		} else {
			nationalityValid = true;
			errorMessage = "";
		}

		return [nationalityValid, errorMessage];
	},

	//address validation
	validateAddress: function(address1, address2) {
		var addressValid = false;
		var errorMessage = "";

		if (address1.length == 0) {	
			addressValid = false;
			errorMessage = "Address error: Please enter your address!";
		} else if (address1.length > 80) {	
			addressValid = false;
			errorMessage = "Address error: Address first text-box maximum 45 characters! current length: " + address1.length;
		} else if (address2.length > 80) {
			addressValid = false;
			errorMessage = "Address error: Address second text-box maximum 45 characters! current length: " + address2.length;
		} else {
			addressValid = true;
			errorMessage = "";
		}

		return [addressValid, errorMessage];
	},

	//address validation not required
	validateAddressNotRequired: function(address1, address2) {
		var addressValid = false;
		var errorMessage = "";

		if (address1.length != 0) {
			if (address1.length > 80) {	
				addressValid = false;
				errorMessage = "Address error: Address first text-box maximum 45 characters! current length: " + address1.length;
			} else if (address2.length > 80) {
				addressValid = false;
				errorMessage = "Address error: Address second text-box maximum 45 characters! current length: " + address2.length;
			} else {
				addressValid = true;
				errorMessage = "";
			}
		} else {
			addressValid = true;
			errorMessage = "";
		}

		return [addressValid, errorMessage];
	},

	//nickname validation not required
	validateNickNameNotRequired: function(nickname) {
		var nicknameValid = false;
		var errorMessage = "";

		if (nickname.length != 0) {
			if (nickname.length > 30) {
				nicknameValid = false;
				errorMessage = "Nickname error: Nickname maximum 30 characters! current length: " + nickname.length;
			} else if (!(this.onlyAlphabet(nickname))) {
				nicknameValid = false;
				errorMessage = "Nickname error: Please enter only Alphabetic characters!";
			} else {
				nicknameValid = true;
				errorMessage = "";
			}
		} else {
			nicknameValid = true;
			errorMessage = "";
		}

		return [nicknameValid, errorMessage];
	},

	//post validation
	validatePostcode : function(postcode) {
		var postCodeValid = false;
		var errorMessage = "";

		if ((!(postcode.length == 5) && !(postcode.length == 4))) {
			postCodeValid = false;
			errorMessage = "Postcode error: Postcode maximum 4 or 5 numeric characters! current length: " + postcode.length;
		} else if (!(this.onlyDigit(postcode))) {
			postCodeValid = false;
			errorMessage = "Postcode error: Please enter only numeric characters!";
		} else {
			postCodeValid = true;
			errorMessage = "";
		}

		return [postCodeValid, errorMessage];
	},

	//post validation not required
	validatePostcodeNotRequired : function(postcode) {
		var postCodeValid = false;
		var errorMessage = "";

		if (postcode.length != 0) {
			if ((!(postcode.length == 5) && !(postcode.length == 4))) {
				postCodeValid = false;
				errorMessage = "Postcode error: Postcode maximum 4 or 5 numeric characters! current length: " + postcode.length;
			} 
			else if (!(this.onlyDigit(postcode))) {
				postCodeValid = false;
				errorMessage = "Postcode error: Please enter only numeric characters!";
			} else {
				postCodeValid = true;
				errorMessage = "";
			}
		} else {
			postCodeValid = true;
			errorMessage = "";
		}

		return [postCodeValid, errorMessage];
	},

	//cv validatiohn
	validateCV : function(cvFileData) {
		var cvValid = false;
		var errorMessage = "";

		if (cvFileData == '') {
			cvValid = false;
			errorMessage= "CV attachement error: Please attach your CV!";
		} else {
	   		var cvFileExtension = cvFileData.slice(-3); 
	  		if (cvFileExtension == "pdf") {
				cvValid = true;
				errorMessage= "";
	  		} else {
				cvValid = false;
				errorMessage= "CV attachement error: Please attach your CV in .PDF form!";
	  		}
		}

		return [cvValid, errorMessage];
	},

	//resume validation
	validateResume: function(resumeFileData) {
		var resumeValid = false;
		var errorMessage = "";

		if (resumeFileData == '') {
			resumeValid = false;
			errorMessage = "Resume attachement error: Please attach your Resume!";
		} else {
	   		var resumeFileExtension = resumeFileData.slice(-3);
	  		if (resumeFileExtension == "pdf") {
				resumeValid = true;
				errorMessage= "";
	  		} else {
				resumeValid = false;
				errorMessage= "Resume attachement error: Please attach your Resume in .PDF form!";
	  		}
		}

		return [resumeValid, errorMessage];
	},

	//portfolio validation
	validatePortfolio: function(portfolioFileData) {
		var portfolioValid = false;
		var errorMessage = "";

		if (portfolioFileData == '') {
			portfolioValid = false;
			errorMessage= "Portfolio attachement error: Please attach your Portfolio!";
		} else {
	   		var portfolioFileExtension = portfolioFileData.slice(-3);
	  		if (portfolioFileExtension == "pdf") {
				portfolioValid = true;
				errorMessage= "";
	  		} else {
				portfolioValid = false;
				errorMessage= "Portfolio attachement error: Please attach your Portfolio in .PDF form!";
	  		}
		}

		return [portfolioValid, errorMessage];
	},

	//avatar validation
	validateAvatar: function(avatarFileData) {
		var avatarValid = false;
		var errorMessage = "";

		if (avatarFileData == '') {
			avatarValid = true;
		} else {
	   		var avatarFileExtension = avatarFileData.slice(-3).toLowerCase();
	  		if (avatarFileExtension == "png" || avatarFileExtension == "jpg" || avatarFileExtension == "jpeg" || avatarFileExtension == "gif") {
				avatarValid = true;
				errorMessage= "";
	  		} else {
				avatarValid = false;
				errorMessage= "Avatar attachement error: Please attach your Avatar in .png / .jpg / .jpeg / .gif form!";
	  		}
		}

		return [avatarValid, errorMessage];
	},

	//background validation
	validateBackground: function(backgroundFileData) {
		var backgroundValid = false;
		var errorMessage = "";

		if (backgroundFileData == '') {
			backgroundValid = true;
		} else {
	   		var backgroundFileExtension = backgroundFileData.slice(-3).toLowerCase();
	  		if (backgroundFileExtension == "png" || backgroundFileExtension == "jpg" || backgroundFileExtension == "jpeg" || backgroundFileExtension == "gif") {
				backgroundValid = true;
				errorMessage= "";
	  		} else {
				backgroundValid = false;
				errorMessage= "Background Photo attachement error: Please attach your Background Photo in .png / .jpg / .jpeg / .gif form!";
	  		}
		}
		return [backgroundValid, errorMessage];
	},

	//mosque picture validation
	validateMosquePic: function(mosqueFileData) {
		var mosqueValid = false;
		var errorMessage = "";

		if (mosqueFileData == '') {
			mosqueValid = false;
			errorMessage= "Mosque attachement error: Please attach your Mosque in .png / .jpg / .jpeg / .gif form!";
		} else {
	   		var mosqueFileExtension = mosqueFileData.slice(-3).toLowerCase();
	  		if (mosqueFileExtension == "png" || mosqueFileExtension == "jpg" || mosqueFileExtension == "jpeg" || mosqueFileExtension == "gif") {
				mosqueValid = true;
				errorMessage= "";
	  		} else {
				mosqueValid = false;
				errorMessage= "Mosque attachement error: Please attach your Mosque in .png / .jpg / .jpeg / .gif form!";
	  		}
		}

		return [mosqueValid, errorMessage];
	},

	validatePassword1: function(password1) {
		var password1Valid = false;
		var errorMessage = "";

		if (password1.length == 0) {
			password1Valid = false;
			errorMessage = "Please enter your new password.";
		} 
		else {
			
			var checkA = false, checkD = false;
			for(var i = 0; i < password1.length; i++) {
				if(password1.charAt(i).match(/^[A-Za-z]+$/)) {
					checkA = true;
					break;
				}
			}
			for(var i = 0; i < password1.length; i++) {
				if(password1.charAt(i).match(/^\+?[	0-9]+$/)) {
					checkD = true;
					break;
				}
			}

			var passLength = (password1.length >= 8)? true:false;

			
			
			if(passLength && checkA && checkD) {
				password1Valid = true;
				errorMessage = "";
			}else{
				password1Valid = false;
				if(!checkA){
				errorMessage += "Should contain at least one letter. <br/>";
				}
				if(!checkD){
					errorMessage += "Should contain at least one number. <br/>";
				}
				if(!passLength){
					errorMessage += "Should contain a total of eight characters. <br/>";
				}
			}
	   		
		}
		return [password1Valid, errorMessage]
	},

	validatePassword2: function(password1, password2) {
		var password2Valid = false;
		var errorMessage = "";

		if (password2.length == 0) {
			password2Valid = false;
			errorMessage= "Please confirm your password.";
		} else if(password1 != password2){
			password2Valid = false;
			errorMessage= "Passwords do not match.";
		} else {
	   		password2Valid = true;
			errorMessage = "";
		}

		return [password2Valid, errorMessage]
	},

	validateGender: function(gender) {
		var genderValid = false;
		var errorMessage = "";

		if (gender == 0) {
			genderValid = false;
			errorMessage= "Please select an option!";
		} else {
	   		genderValid = true;
			errorMessage = "";
		}

		return [genderValid, errorMessage]
	},

	validateMaritalStatus: function(maritalstatus) {
		var maritalStatusValid = false;
		var errorMessage = "";

		if (maritalstatus == 0) {
			maritalStatusValid = false;
			errorMessage= "Please select an option!";
		} else {
	   		maritalStatusValid = true;
			errorMessage = "";
		}

		return [maritalStatusValid, errorMessage]
	},
	
	validateCountry: function(country) {
		var countryValid = false;
		var errorMessage = "";

		if (country == 0) {
			countryValid = false;
			errorMessage= "Please select an option!";
		} else {
	   		countryValid = true;
			errorMessage = "";
		}

		return [countryValid, errorMessage]
	},
	
	validateState: function(state) {
		var stateValid = false;
		var errorMessage = "";

		if (state == 0) {
			stateValid = false;
			errorMessage= "State error: Please select an option!";
		} else {
	   		stateValid = true;
			errorMessage = "";
		}

		return [stateValid, errorMessage]
	},
	
	validateCity: function(city) {
		var cityValid = false;
		var errorMessage = "";

		if (city == 0) {
			cityValid = false;
			errorMessage= "City error: Please select an option!";
		} else {
	   		cityValid = true;
			errorMessage = "";
		}

		return [cityValid, errorMessage]
	},

	sendApplicationValidation: function(email, firstName, lastName, phone, dob, nationality, address1, address2, postcode, icPassport, cv, resume, portfolio, gender, maritalstatus, country, state, city) { 
		var emailArray = this.validateEmail(email);
		var firstNameArray = this.validateFirstName(firstName);
		var lastNameArray = this.validateLastName(lastName);
		var phoneArray = this.validatePhone(phone);
		var dobArray = this.validateDOB(dob);
		var nationalityArray = this.validateNationality(nationality);
		var addressArray = this.validateAddress(address1, address2);
		var postcodeArray = this.validatePostcode(postcode);
		var icPassportArray = this.validateIcPassport(icPassport);
		var cvArray = this.validateCV(cv);
		var resumeArray = this.validateResume(resume);
		var portfolioArray = this.validatePortfolio(portfolio);
		var genderArray = this.validateGender(gender);
		var maritalstatusArray = this.validateMaritalStatus(maritalstatus);
		var countryArray = this.validateCountry(country);
		var stateArray = this.validateState(state);
		var cityArray = this.validateCity(city);

		var validArray = [emailArray[0], firstNameArray[0], lastNameArray[0], phoneArray[0], dobArray[0], nationalityArray[0], addressArray[0], postcodeArray[0], icPassportArray[0], cvArray[0], resumeArray[0], portfolioArray[0], genderArray[0], maritalstatusArray[0], countryArray[0], stateArray[0], cityArray[0]];
		var messageArray = [emailArray[1], firstNameArray[1], lastNameArray[1], phoneArray[1], dobArray[1], nationalityArray[1], addressArray[1], postcodeArray[1], icPassportArray[1], cvArray[1], resumeArray[1], portfolioArray[1], genderArray[1], maritalstatusArray[1], countryArray[1], stateArray[1], cityArray[1]];
		return {valid:validArray, message:messageArray};
	},

	PasswordsValidation: function(pass, pass_repeat) {
		var password=pass;
		var pass = this.validatePassword1(pass);
		if (pass_repeat!=""){
			var pass_repeat = this.validatePassword2(password,pass_repeat);
			var validArray = [pass[0], pass_repeat[0]];
			var messageArray = [pass[1], pass_repeat[1]];
			return {valid:validArray, message:messageArray};
		}
		else{
			var validArray = [pass[0]];
			var messageArray = [pass[1]];
			return {valid:validArray, message:messageArray};
		}
	},

	LoginValidation: function(email, password) {
		var emailArray = this.validateEmail(email);
		var passwordArray = this.validatePassword1(password);

		var validArray = [emailArray[0], passwordArray[0]];
		var messageArray = [emailArray[1], passwordArray[1]];

		return {valid:validArray, message:messageArray};
	},

	ForgetPasswordValidation: function(email) {
		var emailArray = this.validateEmail(email);

		return {valid:emailArray[0], message:emailArray[1]};
	},

	UserRegistrationValidation: function(firstName, lastName, email, password1, password2) { 
		var firstNameArray = this.validateFirstName(firstName);
		var lastNameArray = this.validateLastName(lastName);
		var emailArray = this.validateEmail(email);
		var password1Array = this.validatePassword1(password1);
		var password2Array = this.validatePassword2(password1, password2);

		var validArray = [firstNameArray[0], lastNameArray[0], emailArray[0], password1Array[0], password2Array[0]];
		var messageArray = [firstNameArray[1], lastNameArray[1], emailArray[1], password1Array[1], password2Array[1]];
		return {valid:validArray, message:messageArray};
	},
	signup_validation: function(email, pass, pass_r){ 
		var emailArray = this.validateEmail(email);
		var passArray = this.validatePassword1(pass);
		var pass_rArray = this.validatePassword2(pass,pass_r);
		var validArray = [emailArray[0], passArray[0], pass_rArray[0]];
		var messageArray = [emailArray[1], passArray[1], pass_rArray[1]];
		return {valid:validArray, message:messageArray};
	},
	forget_validation_Mobile: function(pass, pass_r){ 
		var emailArray = this.validateEmail(email);
		var passArray = this.validatePassword1(pass);
		var pass_rArray = this.validatePassword2(pass,pass_r);
		var validArray = [emailArray[0], passArray[0], pass_rArray[0]];
		var messageArray = [emailArray[1], passArray[1], pass_rArray[1]];
		return {valid:validArray, message:messageArray};
	},
	signup_final_validation: function(fname,lname, dob,gender,nationality){ 
		var fnameArray = this.validateFirstName(fname);
		var lnameArray = this.validateLastName(lname);
		var dobArray = this.validateDOB(dob);
		var genderArray = this.validateGender(gender);
		var nationalityArray = this.validateNationalityRequired(nationality);
		var validArray = [fnameArray[0], lnameArray[0],dobArray[0], genderArray[0], nationalityArray[0]];
		var messageArray = [fnameArray[1], lnameArray[1],dobArray[1], genderArray[1], nationalityArray[1]];
		return {valid:validArray, message:messageArray};
	},
	UserProfileValidation: function(email, firstName, lastName, phone, nationality, address1, address2, postcode, nickname,dob) { 
		var emailArray = this.validateEmail(email);
		var firstNameArray = this.validateFirstName(firstName);
		var lastNameArray = this.validateLastName(lastName);
		var phoneArray = this.validatePhoneNotRequired(phone);
		var nationalityArray = this.validateNationalityNotRequired(nationality);
		var addressArray = this.validateAddressNotRequired(address1, address2);
		var postcodeArray = this.validatePostcodeNotRequired(postcode);
		var nicknameArray = this.validateNickNameNotRequired(nickname);
		var dobArray = this.validateDOB(dob);

		var validArray = [emailArray[0], firstNameArray[0], lastNameArray[0], phoneArray[0], nationalityArray[0], addressArray[0], postcodeArray[0], nicknameArray[0], dobArray[0]];
		var messageArray = [emailArray[1], firstNameArray[1], lastNameArray[1], phoneArray[1], nationalityArray[1], addressArray[1], postcodeArray[1], nicknameArray[1], dobArray[1]];
		return {valid:validArray, message:messageArray};
	},

	UserProfileAvatarValidation: function(avatarFileData) { 
		var avatarArray = this.validateAvatar(avatarFileData);
		

		var validArray = [avatarArray[0]];
		var messageArray = [avatarArray[1]];
		return {valid:validArray, message:messageArray};
	},

	UserProfileBackgroundValidation: function(backgroundFileData) { 
		var backgroundArray = this.validateBackground(backgroundFileData);
		

		var validArray = [backgroundArray[0]];
		var messageArray = [backgroundArray[1]];
		return {valid:validArray, message:messageArray};
	},

	UserChangePassword: function(currectpassword, password1, password2) {
		var currentPasswordArray = this.validatePassword1(currectpassword);
		var password1Array = this.validatePassword1(password1);
		var password2Array = this.validatePassword2(password1, password2);

		var validArray = [currentPasswordArray[0], password1Array[0], password2Array[0]];
		var messageArray = [currentPasswordArray[1], password1Array[1], password2Array[1]];
		return {valid:validArray, message:messageArray};
	},
	MosqueEntryFormValidation: function(mosqueFileData, mosquename, imamname, phone, email, website) { 
		var mosquePicArray = this.validateMosquePic(mosqueFileData);
		var mosqueArray = this.validateMosqueName(mosquename);
		var phoneArray = this.validatePhoneNotRequired(phone);
		var imamnameArray = this.validateImamNameNotRequired(imamname);
		var emailArray = this.validateEmailNotRequired(email);
		var websiteArray = this.validateWebsiteNotRequired(website);

		var validArray = [mosquePicArray[0],mosqueArray[0],phoneArray[0],imamnameArray[0],emailArray[0],websiteArray[0]];
		var messageArray = [mosquePicArray[1],mosqueArray[1],phoneArray[1],imamnameArray[1],emailArray[1],websiteArray[1]];
		return {valid:validArray, message:messageArray};
	}


};
export default ValidationFunction;