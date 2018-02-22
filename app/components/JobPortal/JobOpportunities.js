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

var jobList = [];
var jobCount = 0;
var startCount = 0;
var endCount = 10;

class JobOpportunities extends React.Component {

		constructor(args) {
			super(args);
		}
		onClickSearch() {
			
			var jobCategory = document.getElementById("jobCategoryDL").value;
			var jobCategoryValue = jobCategory == "All Fields" ? "":jobCategory;
			var expOne = document.getElementById("inlineCheckboxExperience1");
			var expOneValue = expOne.checked? expOne.value: "";
			var expTwo = document.getElementById("inlineCheckboxExperience2");
			var expTwoValue = expTwo.checked? expTwo.value:"";
			var expThree = document.getElementById("inlineCheckboxExperience3");
			var expThreeValue = expThree.checked? expThree.value:"";
			var expFour = document.getElementById("inlineCheckboxExperience4");
			var expFourValue = expFour.checked? expFour.value:"";
			var kl = document.getElementById("inlineCheckboxLocation1");
			var klValue = kl.checked? kl.value:"";
			var worldwide = document.getElementById("inlineCheckboxLocation2");
			var worldwideValue = worldwide.checked? worldwide.value:"";
			var fullTime = document.getElementById("inlineCheckboxType1");
			var fullTimeValue = fullTime.checked? fullTime.value:"";
			var halfTime = document.getElementById("inlineCheckboxType2");
			var halftimeValue = halfTime.checked? halfTime.value:"";
			var intern = document.getElementById("inlineCheckboxType3");
			var internValue = intern.checked? intern.value:"";
			var freelance = document.getElementById("inlineCheckboxType4");
			var freelanceValue = freelance.checked? freelance.value:"";

			var $ = require ('jquery')
			var experience = [expTwoValue, expThreeValue, expFourValue, expOneValue];
			var category = [jobCategoryValue];
			var location = [klValue, worldwideValue];
			var type = [freelanceValue, fullTimeValue, halftimeValue, internValue];
			var searchArray = {experience, category, location, type};

			globalFunction.getJobSearch(searchArray, function(data){
				var response = JSON.parse(data);
					$("#jobopportunity-table li").remove();
					var link = config.root + "/jobsOffer";

					if(response.state === 200) {
						document.getElementById("fallback").textContent = "We have found " + response.success.length + " Job offers";
						if(category == ""){
								document.getElementById("fallback-title").textContent = "";

							}else{
								document.getElementById("fallback-title").textContent = response.success[0].category;

							}

						$('#fallback-header').hide();
						$('#fallback').show();
						$('#fallback-title').show();
						startCount = 0;
						endCount = 10;
						var type = "";
						var jobType = "";
						var count = response.success.length> 10? 10 : response.success.length;
						jobList = [];
						jobList.push(response.success);
						jobCount = response.success.length;

						for(var i =0; i<count; i++) {
							
							type = response.success[i].type;
							jobType = "";
							type = type.split(/,| /);
							for(var j=0; j < type.length; j++){
								if(type[j] == "Full" || type[j] == "Part"){
									jobType += type[j] + " " + type[j+1];
									if(j+2 < type.length){
										jobType += ", ";
									}
								}else if(type[j] == "Time"){
								}else{
									jobType += type[j];
									if(j+1 < type.length){
										jobType += ", ";
									}
								}
								
							}
							
							$('#jobopportunity-table')
						         .append('<li class="c-jobopportunity">' +
									'<div class="c-jobopportunity-container">' +
										'<header>' +
											'<h2>'+response.success[i].title+'</h2>' +
											'<div class="c-jobopportunity-informal">' +
												'<ul>' +
													'<li><i class="fa fa-map-marker"></i>'+response.success[i].city + ", " + response.success[i].country+'</li>' +
													'<li><i class="fa fa-clock-o"></i>'+jobType+'</li>' +
												'</ul>' +
											'</div>' +
										'</header>' +
										'<div class="c-jobopportunity-content">' +
											'<p></p>' +
											'<div class="c-jobopportunity-action">' +
												'<a href='+link+'#'+response.success[i].id+'>' +
												 '<button type="button" class="c-submit o-form__button is-primary is-right" aria-haspopup="true" aria-expanded="false">' +
												 'More Information' +
												 '</button></a>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>');
								startCount++;
								endCount++;
						}
						
					}
					else {
						//console.log("Unable to reach database, please try again later.");
						getSimilar(jobCategoryValue);

					}
			});

			function getSimilar(jobCategoryValue){
				var $ = require ('jquery')
				var experience = ["", "", "", ""];
				var category = [jobCategoryValue];
				var location = ["", ""];
				var type = ["", "", "", ""];
				var searcArray = {experience, category, location, type};

				globalFunction.getJobSearch(searchArray, function(data){
					var response = JSON.parse(data);
						$("#jobopportunity-table li").remove();
						var link = config.root + "/jobsOffer";

						if(response.state === 200) {
							document.getElementById("fallback").textContent = "We have found " + response.success.length + " Job offers";
							
							if(category == ""){
								document.getElementById("fallback-title").textContent = "More Jobs for All Fields";

							}else{
								document.getElementById("fallback-title").textContent = "More Jobs for " + response.success[0].category;

							}

							$('#fallback-header').show();
						$('#fallback').show();
						$('#fallback-title').show();
							startCount = 0;
						endCount = 10;
						var type = "";
						var jobType = "";
						var count = response.success.length> 10? 10 : response.success.length;
						jobList = [];
						jobList.push(response.success);
						jobCount = response.success.length;

						for(var i =0; i<count; i++) {
							
							type = response.success[i].type;
							jobType = "";
							type = type.split(/,| /);
							for(var j=0; j < type.length; j++){
								if(type[j] == "Full" || type[j] == "Part"){
									jobType += type[j] + " " + type[j+1];
									if(j+2 < type.length){
										jobType += ", ";
									}
								}else if(type[j] == "Time"){
								}else{
									jobType += type[j];
									if(j+1 < type.length){
										jobType += ", ";
									}
								}
								
							}
							
							$('#jobopportunity-table')
						         .append('<li class="c-jobopportunity">' +
									'<div class="c-jobopportunity-container">' +
										'<header>' +
											'<h2>'+response.success[i].title+'</h2>' +
											'<div class="c-jobopportunity-informal">' +
												'<ul>' +
													'<li><i class="fa fa-map-marker"></i>'+response.success[i].city + ", " + response.success[i].country+'</li>' +
													'<li><i class="fa fa-clock-o"></i>'+jobType+'</li>' +
												'</ul>' +
											'</div>' +
										'</header>' +
										'<div class="c-jobopportunity-content">' +
											'<p>'+response.success[i].jobdesc+'</p>' +
											'<div class="c-jobopportunity-action">' +
												'<a href='+link+'#'+response.success[i].id+'>' +
												 '<button type="button" class="c-submit o-form__button is-primary is-right" aria-haspopup="true" aria-expanded="false">' +
												 'More Information' +
												 '</button></a>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>');
								startCount++;
								endCount++;
						}
						}
						else {
							//console.log("Unable to reach database, please try again later.");
						$('#fallback-header').show();
						$('#fallback').hide();
						$('#fallback-title').hide();
							
					}
				});
			}
		}

		callApi() {
			var url = window.location.hash;
			var queryStart = url.indexOf("#") + 1,
		        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
		        query = url.slice(queryStart, queryEnd - 1),
		        pairs = query.replace(/\+/g, " ").split("&"),
		        parms = {}, i, n, v, nv;

		    var q = query.replace("%20", " ");

		    if(query != ""){
				var experience = ["", "", "", ""];
				var category = [q];
				var location = ["", ""];
				var type = ["", "", "", ""];
				var searcArray = {experience, category, location, type};

				var request =  [
					"Jobs",
					"search",
					searcArray];
		    }else{
		    	var request =  [
				"Jobs",
				"fetch",
				"all"];
		    }

			var $ = require ('jquery')
			
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					var response = JSON.parse(data);
					$("#jobopportunity-table li").remove();
					var link = config.root + "/jobsOffer";
					if(response.state === 200) {
						document.getElementById("fallback").textContent = "We have found " + response.success.length + " Job offers";
						$('#fallback-header').hide();

						startCount = 0;
						endCount = 10;
						var type = "";
						var jobType = "";
						var count = response.success.length> 10? 10 : response.success.length;
						jobList.push(response.success);
						jobCount = response.success.length;

						for(var i =0; i<count; i++) {
							
							type = response.success[i].type;
							jobType = "";
							type = type.split(/,| /);
							for(var j=0; j < type.length; j++){
								if(type[j] == "Full" || type[j] == "Part"){
									jobType += type[j] + " " + type[j+1];
									if(j+2 < type.length){
										jobType += ", ";
									}
								}else if(type[j] == "Time"){
								}else{
									jobType += type[j];
									if(j+1 < type.length){
										jobType += ", ";
									}
								}
								
							}
							
							$('#jobopportunity-table')
						         .append('<li class="c-jobopportunity">' +
									'<div class="c-jobopportunity-container">' +
										'<header>' +
											'<h2>'+response.success[i].title+'</h2>' +
											'<div class="c-jobopportunity-informal">' +
												'<ul>' +
													'<li><i class="fa fa-map-marker"></i>'+response.success[i].city + ", " + response.success[i].country+'</li>' +
													'<li><i class="fa fa-clock-o"></i>'+jobType+'</li>' +
												'</ul>' +
											'</div>' +
										'</header>' +
										'<div class="c-jobopportunity-content">' +
											'<p></p>' +
											'<div class="c-jobopportunity-action">' +
												'<a href='+link+'#'+response.success[i].id+'>' +
												 '<button type="button" class="c-submit o-form__button is-primary is-right" aria-haspopup="true" aria-expanded="false">' +
												 'More Information' +
												 '</button></a>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>');
								startCount++;
								endCount++;
						}

					}
					else {
						$('#fallback-header').hide();

						//alert("Can't connect to the database, please try again later.");
					}
				}.bind(this)
				});
			
        }	

        handlescroll() {

           var $ = require ('jquery')
           if (document.body.scrollHeight == document.body.scrollTop + window.innerHeight) {
               if(jobCount > 10){
               		var type = "";
					var jobType = "";
					
					var link = config.root + "/jobsOffer";
               		for(var i = startCount; i<endCount; i++) {

               			if(jobList[0][i] != null){
               				type = jobList[0][i].type;
							jobType = "";
							type = type.split(/,| /);
							for(var j=0; j < type.length; j++){
								if(type[j] == "Full" || type[j] == "Part"){
									jobType += type[j] + " " + type[j+1];
									if(j+2 < type.length){
										jobType += ", ";
									}
								}else if(type[j] == "Time"){
								}else{
									jobType += type[j];
									if(j+1 < type.length){
										jobType += ", ";
									}
								}
								
							}
							
							$('#jobopportunity-table')
						         .append('<li class="c-jobopportunity">' +
									'<div class="c-jobopportunity-container">' +
										'<header>' +
											'<h2>'+jobList[0][i].title+'</h2>' +
											'<div class="c-jobopportunity-informal">' +
												'<ul>' +
													'<li><i class="fa fa-map-marker"></i>'+jobList[0][i].city + ", " + jobList[0][i].country+'</li>' +
													'<li><i class="fa fa-clock-o"></i>'+jobType+'</li>' +
												'</ul>' +
											'</div>' +
										'</header>' +
										'<div class="c-jobopportunity-content">' +
											'<p></p>' +
											'<div class="c-jobopportunity-action">' +
												'<a href='+link+'#'+jobList[0][i].id+'>' +
												 '<button type="button" class="c-submit o-form__button is-primary is-right" aria-haspopup="true" aria-expanded="false">' +
												 'More Information' +
												 '</button></a>' +
											'</div>' +
										'</div>' +
									'</div>' +
								'</li>');

						}
						else{
							break;
						}
						
               		}
							
               }
               startCount += 10;
				endCount += 10;

            }
       }
		
		componentDidMount() {
			var $ = require ('jquery')
			this.callApi();
			this.loadOption();
			document.addEventListener('scroll', this.handlescroll);
			$('html, body').animate({
                scrollTop: 0
            }, 0);
		}

		loadOption(){
			var url = window.location.hash;
			var queryStart = url.indexOf("#") + 1,
		        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
		        query = url.slice(queryStart, queryEnd - 1),
		        pairs = query.replace(/\+/g, " ").split("&"),
		        parms = {}, i, n, v, nv;
		    var $ = require ('jquery')
		    var q = query.replace("%20", " ");

		    globalFunction.getCategories(function(data){
		    	var response = JSON.parse(data);
					if(response.state === 200) {				

						var i = 0;
						$.each(response.success, function(key, value) {   
						    $('#jobCategoryDL')
						         .append($("<option></option>")
						                    .attr("value",response.success[i])
						                    .text(response.success[i])); 
						    if(response.success[i] == q){

								$('#jobCategoryDL option[value="'+response.success[i]+'"]').attr("selected",true);
							}
						         i++;
						});

						if(query != ""){
							$('#jobCategoryDL').append("<option>All Fields</option>"); 

						}else{
							$('#jobCategoryDL').append("<option selected>All Fields</option>"); 

						}
					}
					else {
						//console.log("Can't connect to the database, please try again later.");
					}
		    });
		}

		render() {
		
		return (
			<InlineCss stylesheet={JobOpportunities.css(this.props.arabic)} namespace="JobOpportunities">
				<div className="o-jobopportunities-container">
					<header>
						<div className="o-jobopportunities-header has-overlay">
							<div className="o-jobopportunities-header__container has-padding">
								<h1>{lang(this.props.language, "jobOpportunitiesTitle")}</h1>
								<p>{lang(this.props.language, "jobOpportunitiesDescription")}</p>
							</div>
						</div>
					</header>
					<div className="c-jobopportunities-filter has-padding">
						<div className="c-jobopportunities-filter__container">
							<h3>{lang(this.props.language, "jobOpportunitiesTitleFilter")}</h3>

							<div className="flex-container">
								<div className="o-filter-search">
									<div className="o-jobopportunities-filter-element">
										<h4>{lang(this.props.language, "jobOpportunitiesSubTitleJob")}</h4>
										<div className="btn-group" >
											<div className="u-select__wrapper">
												<select id="jobCategoryDL">
												</select>
												<i className="fa fa-angle-down"></i>
											</div>
										</div>
									</div>
								</div>

								<div className="o-filter-options">

									<div className="o-jobopportunities-filter-element has-breakdown">
										<h4>{lang(this.props.language, "jobOpportunitiesSubTitleExperience")}</h4>
										<ul>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxExperience1" value="0" />
												  <span htmlFor="inlineCheckboxExperience1">
												   {lang(this.props.language, "jobOpportunitiesExperienceElementOne")}</span>
												</label>
											</li>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxExperience2" value="1" />
												  <span htmlFor="inlineCheckboxExperience2">
												   {lang(this.props.language, "jobOpportunitiesExperienceElementTwo")}</span>
												</label>
											</li>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxExperience3" value="2" />
												  <span htmlFor="inlineCheckboxExperience3">
												   {lang(this.props.language, "jobOpportunitiesExperienceElementThree")}</span>
												</label>
											</li>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxExperience4" value="3" />
												  <span htmlFor="inlineCheckboxExperience4">
												   {lang(this.props.language, "jobOpportunitiesExperienceElementFour")}</span>
												</label>
											</li>
										</ul>
									</div>

									<div className="o-jobopportunities-filter-element">
										<h4>{lang(this.props.language, "jobOpportunitiesSubTitleLocation")}</h4>
										<ul>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxLocation1" value="kuala lumpur" />
												  <span htmlFor="inlineCheckboxLocation1">
												   {lang(this.props.language, "jobOpportunitiesLocationElementKL")}</span>
												</label>
											</li>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxLocation2" value="worldwide" /> 
												  <span htmlFor="inlineCheckboxLocation2">
												   {lang(this.props.language, "jobOpportunitiesLocationElementWorldWide")}</span>
												</label>
											</li>
										</ul>
									</div>

									<div className="o-jobopportunities-filter-element has-breakdown">
										<h4>{lang(this.props.language, "jobOpportunitiesSubTitleType")}</h4>
										<ul>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxType1" value="full" />
												  <span htmlFor="inlineCheckboxType1">
												   {lang(this.props.language, "jobOpportunitiesTypeElementFullTime")}</span>
												</label>
											</li>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxType2" value="part" /> 
												  <span htmlFor="inlineCheckboxType2">
												   {lang(this.props.language, "jobOpportunitiesTypeElementPartTime")}</span>
												</label>
											</li>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxType3" value="intern" />
												  <span htmlFor="inlineCheckboxType3">
												   {lang(this.props.language, "jobOpportunitiesTypeElementInternship")}</span>
												</label>
											</li>
											<li>
												<label className="checkbox-inline">
												  <input type="checkbox" id="inlineCheckboxType4" value="freelancer" />
												  <span htmlFor="inlineCheckboxType4">
												   {lang(this.props.language, "jobOpportunitiesTypeElementFreelancer")}</span>
												</label>
											</li>
										</ul>
									</div>

								</div>

							</div>
							<div className="c-jobopportunity-action">
								<button type="button" className="o-form__button is-transparent is-right" aria-haspopup="true" aria-expanded="false" onClick={this.onClickSearch}>
									{lang(this.props.language, "jobOpportunitiesControlFilter")}</button>
							</div>
						</div>
					</div>
					<div className="c-jobopportunities-content">
						<div className="has-padding">
							<div className="o-fallback-header" id="fallback-header">
								<h2>{lang(this.props.language, "jobOpportunitiesControlFallBackTitle")}</h2>
								<p>{lang(this.props.language, "jobOpportunitiesControlFallBackDescription")}</p>
							</div>
							<h2 id="fallback-title"></h2>
							<h4 id="fallback"></h4>

							<div id="scroll-container">
								<ul className="o-jobopportunities-results" id="jobopportunity-table">
									<li className="c-jobopportunity">
										<div className="c-jobopportunity-container">
											<header>
												<h2></h2>
												<div className="c-jobopportunity-informal">
													<ul>
														<li><i className="fa fa-map-marker"></i></li>
														<li><i className="fa fa-clock-o"></i></li>
													</ul>
												</div>
											</header>
											<div className="c-jobopportunity-content">
												<p></p>
												<div className="c-jobopportunity-action">
												<Link to={config.root + "/jobsOffer"}>
													 <button type="button" className="c-submit o-form__button is-primary is-right" aria-haspopup="true" aria-expanded="false">
													 More Information
													 </button>
													 </Link>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				</div>
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

			input[type='checkbox'] {
				visibility: hidden;
			}
	
			input[type='checkbox']:checked + span:before,
			input[type='checkbox']:not(:checked) + span:before{
			    content:' ';
			    display:inline-block;
			    width: 17px;
			    height:17px;
			    position: relative;
			    top:4px;
			    border: 1px solid #bbb;
			    background: white;
			    margin-right: 1em;
			    box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.1);
			}

			input[type='checkbox']:hover + span:before {
			  background: #F2F0ED;
			  box-shadow: inset 0 0 0 2px white;
			}

			input[type='checkbox']:checked + span:before {
			  background: #E0DDD6;
			  box-shadow: inset 0 0 0 2px white;
			}

			.u-small-font-size {
				font-size: 1.4rem;
			}
			.is-required {
				color: red;
			}
			.c-form__group > label {
				display: block;
				font-size: 1.4rem;
			}
			.o-form__input {
				display: block;
				width: 100%;
				height: 34px;
				padding: 6px 0px;
				background-color: white;
				border: 0px;
				border-bottom: 2px solid #746A5A;
				font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				font-size: 1.4rem;
				font-weight: 600;
				text-indent: 0;
				line-height: 1.42857143;
				color: #746A5A;
				transition: border-color .25s ease-in-out;
				-webkit-appearance: none;
			    -moz-appearance: none;
			    appearance: none;
			}
			.o-form__input:hover, .o-form__input:focus  {
				border-color: #E0DDD6;
			}
			.o-form__input:focus, select:focus {
				box-shadow: 0px;
  				outline: 0 none;
			}
			.u-select__wrapper {
				position: relative;
			}
			.u-select__wrapper > i {
				position: absolute;
				top: 0;
				right: 0;
				height: 34px;
				line-height: 34px;
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
				height: 34px;
				padding: 6px 0;
				background-color: transparent;
				border: 0px;
				border-bottom: 2px solid #746A5A;
				border-radius: 0;
				font-size: 1.4rem;
				font-weight: 600;
				text-indent: 0;
				line-height: 1.42857143;
				color: #746A5A;
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
				margin: 0;
				padding: 16px 23px;
				font-size: 1.6rem;
				font-weight: 600;
				letter-spacing: 0.6px; 
				cursor: pointer;
			}
			button.is-primary {
				border: 0px;
				background-color: #C79269;
				color: white;
			}
			button.is-transparent {
				background-color: transparent;
				border: 2px solid #746A5A;
				color: #746A5A;
				transition: all .25s ease-in-out;
			}
			button.is-transparent:hover {
				border: 2px solid #E0DDD6;
				color: #E0DDD6;
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
			.has-breakdown > ul > li {
				float: left;
				width: 50%;
			}

		& {
			padding-top: 66px;
		}

		& > .o-jobopportunities-container > header {
			background-color: #746A5A;
			background-size: cover;
			background-position: center center;
			color: white;
		}

		& > .o-jobopportunities-container > header > .has-overlay {
			background-color: rgba(0, 0, 0, 0.5);
		}

		& > .o-jobopportunities-container > header > .o-jobopportunities-header > .o-jobopportunities-header__container {
			padding-top: 7.2rem;
			padding-bottom: 7.2rem;
		}

		& > .o-jobopportunities-container > header > .o-jobopportunities-header > .o-jobopportunities-header__container > h1 {
			margin-bottom: 32px;
			font-size: 2.4rem;
			line-height: 33px;
			font-weight: 500;
			letter-spacing: 0.57px;
		}

		& > .o-jobopportunities-container > header > .o-jobopportunities-header > .o-jobopportunities-header__container > p {
			width: 80%;
			font-size: 2.0rem;
			line-height: 28px;
			letter-spacing: 0.57px;
		}

		& > .o-jobopportunities-container > .c-jobopportunities-filter {
			display: flex;
			flex-direction: column;
			margin-bottom: 6rem;
			padding-top: 23px;
			padding-bottom: 23px;
			background-color: white;
		}

		.c-jobopportunity-action > button {
			margin-top: 3rem;
		}

		& > .o-jobopportunities-container > .c-jobopportunities-filter h3 {
			margin-bottom: 32px;
			font-size: 2.8rem;
			line-height: 28px;
			color: #746A5A;
			font-weight: 400;
		}

		@media (max-width: 767px) {
			& > .o-jobopportunities-container > .c-jobopportunities-filter .c-jobopportunities-filter__container {
				padding: 0 23px;
			}
		}

		& > .o-jobopportunities-container > .c-jobopportunities-filter .o-jobopportunities-filter-element {
			margin-bottom: 48px;
		}
		
		& > .o-jobopportunities-container > .c-jobopportunities-filter .o-jobopportunities-filter-element h4 {
			margin-bottom: 16px;
			font-size: 2.0rem;
			line-height: 23px;
			font-weight: 600;
		}

		& > .o-jobopportunities-container > .c-jobopportunities-filter .o-jobopportunities-filter-element ul {
			display: inline-block;
			margin: 0;
			padding 0;
			list-style: none;
		}

		& > .o-jobopportunities-container > .c-jobopportunities-filter .o-jobopportunities-filter-element ul li {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		& > .o-jobopportunities-container > .c-jobopportunities-filter .o-jobopportunities-filter-element ul li label span {
			margin-left: -12px;
			line-height: 28px;
		}

		& .c-jobopportunities-filter{
			width: 100%;
		}

		.o-fallback-header > h2 {
			font-size: 2.4rem;
			line-height: 33px;
		}

		.o-fallback-header {
			margin-bottom: 3rem;
		}

		.o-fallback-header > h4 {
			color: black;
		}

		& .c-jobopportunities-content {
			padding: 0 23px;
		}

		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results {
			margin-top: 3rem;
		}

		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity {
			display: block;
			padding: 23px;
			margin-bottom: 23px;
			// margin-top: 40px;
			background-color: white;
			box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
			// opacity: 1.0;
			// animation: come-in 200ms ease-out; 
			// transition: opacity 600ms ease-out, transform 400ms ease-out;
		}

		@keyframes come-in {
			to {
				opacity: 0;
			}
		}

		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container:last-child { margin-bottom: 0; }

		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container header > h2 {
			margin-bottom: 16px;
			color: black;
			font-size: 2.0rem;
			line-height: 28px;
			font-weight: 600;
			letter-spacing: 0.75px;
		}
		.c-jobopportunity-informal ul, c-jobopportunity-informal ul li {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		.c-jobopportunity-informal ul li {
			float: left;
			font-size: 1.4rem;
			font-weight: 600;
			letter-spacing: 0.53px;
		}
		.c-jobopportunity-informal ul li:first-child {
			margin-right: 16px;
		}
		.c-jobopportunity-informal ul li i {
			margin-right: 8px;
		}
		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container div.c-jobopportunity-content p {
			clear: both;
			margin-bottom: 64px;
		}
		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container div.c-jobopportunity-content div.c-jobopportunity-action {
			min-height: 56px;
		}
		& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container div.c-jobopportunity-content div.c-jobopportunity-action button {
			display: block;
			width: 100%;
			padding: 16px 0;
			font-size: 1.6rem;
			font-weight: 600;
			letter-spacing: 0.6px;
			background-color: #C79269;
			border: none;
			border-width: 0px;
			border-color: transparent;
			color: white;
			cursor: pointer;
		}
		@media (max-width: 767px) {
			.o-jobopportunities-header {
				padding-left: 23px;
				padding-right: 23px;
			}
		}
		@media (min-width: 768px) {
			& > .o-jobopportunities-container > header > .o-jobopportunities-header > .o-jobopportunities-header__container > h1 {
				font-size: 4.4rem;
				line-height: 48px;
				letter-spacing: 0.85px;
			}
			& > .o-jobopportunities-container > header > .o-jobopportunities-header > .o-jobopportunities-header__container > p {
				width: 60%;
			}
			& > .o-jobopportunities-container > .c-jobopportunities-filter .flex-container {
				border-bottom: 1px solid #E0DDD6;
			}
			& > .o-jobopportunities-container > .c-jobopportunities-filter .o-filter-search {
				flex-basis: 25%;
			}
			.o-filter-search > .o-jobopportunities-filter-element > div > div.u-select__wrapper {
				max-width: 75%;
			}
			& > .o-jobopportunities-container > .c-jobopportunities-filter .o-filter-options {
				flex-basis: 75%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: stretch;
			}
			& > .o-jobopportunities-container > .c-jobopportunities-filter .o-filter-options > div.o-jobopportunities-filter-element {
				flex: calc(100% / 3);
			}

			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results  {
				padding: 0;
			}
			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container header  {
				display: flex;
				flex-direction: row;
			}
			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container header .c-jobopportunity-informal {
				margin-bottom: 32px;
			}
			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container header > h2 {
				flex: 1;
				color: black;
				font-size: 2.8rem;
				line-height: 38px;
				letter-spacing: 1.05px;
			}
			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container div.c-jobopportunity-content {
				display: flex;
				flex-direction: row;
				align-items: strech;
			}
			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container div.c-jobopportunity-content  p {
				flex-basis: 60%;
				margin-bottom: 0;
			}
			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container div.c-jobopportunity-content .c-jobopportunity-action {
				flex-basis: 40%;
			}
			& > .c-jobopportunities-content ul.o-jobopportunities-results, .c-jobopportunities-content ul.o-jobopportunities-results li.c-jobopportunity > div.c-jobopportunity-container div.c-jobopportunity-content div.c-jobopportunity-action button {
				width: initial;
				float: right;
				padding: 16px 48px;
			}
			h2#fallback-title, .o-fallback-header h2 {
				font-size: 3.6rem;
				line-height: 48px;
			}
			.o-fallback-header p {
				margin-bottom: 6rem;
				font-size: 2.0rem;
				line-height: 28px;
			}
		}
		@media (min-width: 767px) and (max-width: 991px) {
			& > .o-jobopportunities-container > header > .o-jobopportunities-header > .o-jobopportunities-header__container {
				padding-left: 23px;
				padding-right: 23px;
			}
			.c-jobopportunities-filter__container {
				padding-left: 23px;
				padding-right: 23px;
			}
		}
		@media (min-width: 1024px) {
			& > .o-jobopportunities-container > .c-jobopportunities-filter .flex-container {
				display: flex;
				flex-direction: row;
				flex-grow: 1;
				justify-content: space-between;
				align-items: stretch;
			}
		}
		` + functions.responsivePadding(".has-padding");

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

export default JobOpportunities;