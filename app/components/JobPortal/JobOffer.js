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

class JobOffer extends React.Component {

	constructor(args) {
		super(args);
	}
	callApi() {
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;
        var getId = ["id"];
        getId.push(query);
		
			var $ = require ('jquery')
			var request =  [
				"Jobs",
				"fetch", getId];
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
						for(var i =0; i<response.success.length; i++) {
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
							 document.getElementById("jobTitle").innerHTML = response.success[i].title;
							 document.getElementById("location-title").innerHTML = response.success[i].city;
							 document.getElementById("location").innerHTML = response.success[i].city + ", " + response.success[i].country;
							 document.getElementById("jobTime").innerHTML = jobType;
							 document.getElementById("jobDescription").innerHTML = response.success[i].jobdesc;
							 
							 var benefits = response.success[i].benefits;
							 benefits = benefits.replace(/\r?\n/g, '<br />');
							 document.getElementById("benefits").innerHTML = benefits;
							 document.getElementById("country").innerHTML = response.success[i].country;
							 
							 var requirements = response.success[i].requirements;
							 requirements = requirements.replace(/\r?\n/g, '<br />');
							 document.getElementById("requirements").innerHTML = requirements;
							 
							 var optional = response.success[i].optional;
							 optional = optional.replace(/\r?\n/g, '<br />');
							 document.getElementById("optional").innerHTML = optional;
							 
							 var task = response.success[i].tasks;
							 task = task.replace(/\r?\n/g, '<br />');
							 document.getElementById("task").innerHTML = task;
							 document.getElementById("category").innerHTML = response.success[i].category;
						}
					}
					else {
						//console.log("this");
					}
				}.bind(this)
			});
		}
		componentDidMount() {
			this.callApi();
		}

		handleApply(e){
			var url = window.location.hash;
			var queryStart = url.indexOf("#") + 1,
		        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
		        query = url.slice(queryStart, queryEnd - 1),
		        pairs = query.replace(/\+/g, " ").split("&"),
		        parms = {}, i, n, v, nv;
			var linkApply = config.root + "/sendApplication#" + query;
			this.context.router.push(linkApply);
		}

		handleBackCategory(e){
			var category = document.getElementById("category").textContent;
			var link = config.root + "/jobs" + '#' + category;
			var $ = require('jquery');
			$("#linkBack").attr("href", link)
		}
	render() {

		var link = config.root + "/jobs";
		var url = window.location.hash;
		var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.indexOf("?") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;
        var linkOffer = window.location.href + "";

        var linkSet = "noor.me/jobsOffer#"+query;

		var linkApply = config.root + "/sendApplication#" + query;
		var linkFb = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(linkSet);
		var linkShareFb = (<a href={linkFb} target="_blank" className="social social-facebook">
							<i className="fa fa-facebook-official"></i><span>Share on Facebook</span></a>);
		var linkTwitter = "https://twitter.com/share?text=Job Offer available now!&url=" + encodeURIComponent(window.location.href);
		var linkShareTwitter = (<a href={linkTwitter} target="_blank" className="social social-twitter"><i className="fa fa-twitter"></i>
								<span>Share on Twitter</span></a>);
								

		return (
			<InlineCss stylesheet={JobOffer.css(this.props.arabic)} namespace="JobOffer">
				<div className="o-joboffer-container">

					<header>

						<div className="o-joboffer-header has-overlay">
							<div className="o-joboffer-header__container">
								<nav className="o-joboffer-navigation">
									<a className="o-joboffer-navigation__element" href={link}>
										<span className="go-back"><i className="fa fa-angle-left"></i>{lang(this.props.language, "jobOfferTopNavigationBack")}</span>
									</a>
									<a id="linkBack" className="o-joboffer-navigation__element" onClick={this.handleBackCategory.bind(this)} href="">
										<span className="more">{lang(this.props.language, "jobOfferTopMore")} <span id="category"></span>?</span>
									</a>
								</nav>
								<div className="o-joboffer-header-container has-padding">
									<div className="o-joboffer-header-content">
										<h1 id="jobTitle">%jobtitle%</h1>
										<div className="c-jobopportunity-informal">
											<ul>
												<li><i className="fa fa-map-marker"></i><span id="location"></span> </li>
												<li><i className="fa fa-clock-o"></i><span id="jobTime"></span></li>
											</ul>
										</div>

									</div>
									<div className="o-joboffer-header-socials">
										<nav className="c-joboffer-social-menu">
											<ul>
												<li>{linkShareFb}</li>
												<li>{linkShareTwitter}</li>
											</ul>
										</nav>
									</div>
								</div>									
							</div>
						</div>
					</header>

					<div className="o-joboffer-outter-container has-padding">
						<div className="c-joboffer-content-container">

							<header className="c-joboffer-header">
								<div className="c-joboffer-header-content">
									<h2 id="jobDescription"></h2>
								</div>
								<div className="c-joboffer-header-action">

									<button type="button" className="btn btn-default" onClick={this.handleApply.bind(this)}>
									{lang(this.props.language, "jobOfferContentControlApply")}</button>
									
									<a className="" href={linkOffer}>{lang(this.props.language, "jobOfferContentSupportLink")}</a>
								</div>
							</header>

							<div className="c-joboffer-location">
								<h3 id="location-title"></h3>
								<p id="country"></p>
							</div>

							<div className="c-joboffer-content">
								<div className="c-joboffer-content-tasks">
									<h3>{lang(this.props.language, "jobOfferContentTitleTasks")}</h3>
									<div id="task" className="c-joboffer-content-tasks-content">									
									</div>
								</div>
								<div className="c-joboffer-content-requirements">
									<h3>{lang(this.props.language, "jobOfferContentTitleRequirements")}</h3>
									<div id="requirements" className="c-joboffer-content-requirements-content">
									</div>
								</div>
								<div className="c-joboffer-content-optional">
									<h3>{lang(this.props.language, "jobOfferContentTitleOptional")}</h3>
									<div id="optional" className="c-joboffer-content-tasks-optional">
									</div>
								</div>
								<div className="c-joboffer-content-benefits">
									<h3>{lang(this.props.language, "jobOfferContentTitleBenefits")}</h3>
									<div id="benefits" className="c-joboffer-content-tasks-benefits">
									</div>
								</div>
							</div>

							<footer className="c-joboffer-footer">
								{/*<p>{lang(this.props.language, "jobOfferTermsParagraphOne")}</p>
								<p>{lang(this.props.language, "jobOfferTermsParagraphTwo")}</p>*/}
							</footer>

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

		.has-overlay {
			background-color: rgba(0, 0, 0, 0.5);
		}

		& {
			padding-top: 66px;
		}

		& .o-joboffer-container {

		}
		& .o-joboffer-container > header {
			background-color: #746A5A;
			background-size: cover;
			background-position: center center;
			color: white;
		}
		nav.o-joboffer-navigation { display: none; }
		& .o-joboffer-container > header >.o-joboffer-padding .o-joboffer-header-container {
			display: flex;
			flex-direction: row;
		}
		& .o-joboffer-container > header >.o-joboffer-padding .o-joboffer-header-container .o-joboffer-header-content {
			flex: 1;
		}
		.o-joboffer-header-content h1 {
			font-size: 2.4rem;
			line-height: 33px;
			color: white;
			font-weight: 500;
			letter-spacing: 0.57px;
		}
		.o-joboffer-header-container { position: relative; }
		.o-joboffer-header-content .c-jobopportunity-informal ul {
			bottom: 0;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		.o-joboffer-header-content .c-jobopportunity-informal ul li {
			margin: 0;
			margin-right: 16px;
			padding: 0;
			list-style: none;
			float: left;
			color: white;
			font-size: 1.4rem;
			letter-spacing: 0.23px;
			font-weight: 500;
		}
		.o-joboffer-header-content .c-jobopportunity-informal ul li i {
			margin-right: 8px;
		}
		.o-joboffer-header-container {
			display: flex;
			flex-direction: column;
		}
		nav.c-joboffer-social-menu ul, nav.c-joboffer-social-menu ul li {
			margin: 0;
			padding: 0;
			list-style-type: none;
		}
		nav.c-joboffer-social-menu ul li a span {
			
		}
		a.social {
			font-size: 2.0rem;
			line-height: 28px;
			color: white;
		}
		a.social i {
			margin-right: 8px;
		}
		.c-joboffer-content-container {
			background-color: white;
			box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
		}
		.c-joboffer-content-container > header {
			padding: 23px;
		}
		.c-joboffer-content-container > header .c-joboffer-header-content {
			margin-bottom: 32px;
		}
		.c-joboffer-header-content h2 {
			margin-bottom: 16px;
			font-size: 2.0rem;
			line-height: 23px;
			color: black;
			font-weight: 500;
		}
		.c-joboffer-header-content p {
			font-size: 1.4rem;
		}
		.c-joboffer-header-action button {
			display: block;
			width: 100%;
			padding: 16px 23px;
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
		.c-joboffer-header-action a {
			text-align: left;
			font-size: 1.4rem;
		}
		.c-joboffer-location {
			padding: 23px;
			background-color: black;
			color: white;
		}
		.c-joboffer-location h3 {
			font-size: 2.4rem;
			line-height: 30px;
			font-weight: 800;
		}
		.c-joboffer-location p {
			font-size: 1.4rem;
			line-height: 18px;
		}
		.c-joboffer-content > div {
			padding: 32px 23px;
			font-size: 1.4rem;
			line-height: 18px;
			border-bottom: 1px solid #ECE8E1;
		}
		.c-joboffer-content > div h3 {
			margin-bottom: 32px;
			font-size: 2.0rem;
			color: black;
		}
		.c-joboffer-content > div:last-chid { margin-bottom: 64px; }
		footer.c-joboffer-footer {
			padding: 23px;
			background-color: #ECE8E1;
			font-size: 1.2rem;
			line-height: 19px;
		}
		@media (min-width: 768px) {
			& .o-joboffer-container header >.o-joboffer-header > .o-joboffer-header__container > nav.o-joboffer-navigation {
				display: block;
				margin: 0;
				padding: 0 23px;
				height: 66px;
				max-height: 66px;
				line-height: 66px;
				background-color: rgba(0, 0, 0, 0.12);
				font-weight: 600;
				color: white;
			}
			.o-joboffer-header-content h1 {
				font-size: 3.6rem;
				line-height: 49px;
				letter-spacing: 0.85px;
				font-weight: normal;
			}
			.c-joboffer-content-container {
				margin: -80px 0 0;
			}
			& .o-joboffer-container header >.o-joboffer-header > .o-joboffer-header__container > nav.o-joboffer-navigation a {
				color: white;
				transition: all .25s ease-in-out;
			}
			& .o-joboffer-container header >.o-joboffer-header > .o-joboffer-header__container > nav.o-joboffer-navigation a:hover {
				opacity: 0.75;
			}
			& .o-joboffer-container header >.o-joboffer-header > .o-joboffer-header__container > nav.o-joboffer-navigation a:first-child {float: left; }
			& .o-joboffer-container header >.o-joboffer-header > .o-joboffer-header__container > nav.o-joboffer-navigation a:first-child > span > i {
				display: block;
				float: left;
				margin-right: 16px;
				font-size: 3.8rem;
				line-height: 60px;
				height: 66px;
				max-height: 66px;
			}
			& .o-joboffer-container header >.o-joboffer-header > .o-joboffer-header__container >  nav.o-joboffer-navigation a:first-child > span > i  > span {
				display: block;
				float: left;
				height: 66px;
				max-height: 66px;
				line-height: 66px;
			}
			& .o-joboffer-container header >.o-joboffer-header > .o-joboffer-header__container >  nav.o-joboffer-navigation a:last-child {
				float: right;
				text-align: right;
			}
			.o-joboffer-header-container {
				flex-direction: row;
			}
			.o-joboffer-header-content, .o-joboffer-header-socials {
				flex: 1;
			}
			nav.c-joboffer-social-menu {
				float: right;
			}
			.o-joboffer-header-content > h1 {
				font-size: 4.4rem;
				line-height: 48px;
			}
			.c-joboffer-content-container > header {
				display: flex;
				flex-direction: row;
				align-items: flex-start;
			}
			.c-joboffer-header-content {
				flex-basis: 70%;
			}
			.c-joboffer-header-action {
				flex-basis: 30%;
			}
			.c-joboffer-header-content h2 {
				font-size: 2.8rem;
				line-height: 38px;
			}
			.c-joboffer-header-content p {
				font-size: 1.6rem;
			}
			.c-joboffer-header-action { position: relative; }
			.c-joboffer-header-action > button {
				position: absolute;
				margin-top: 0;
				right: 0;
				top: 0;
				width: initial;
				padding: 16px 32px;
			}
			.c-joboffer-header-action > a {
				position: absolute;
				right: 0;
				top: 52px;
			}
			.c-joboffer-location h3 {
				width: 60%;
				margin-bottom: 32px;
				font-size: 3.2rem;
				line-height: 37px;
			}
			.c-joboffer-content > div h3 {
				font-size: 2.8rem;
				line-height: 38px;
			}
			.c-joboffer-content > div > div {
				font-size: 1.6rem;
				line-height: 23px;
			}
		}
		@media (max-width: 767px) {
			.o-joboffer-container > header > .o-joboffer-header {
				height: 210px;
				max-height: 210px;
			}
			.o-joboffer-header-container {
				padding: 6rem 23px;
			}
		}
		@media (min-width: 768px) and (max-width: 991px) {
			.o-joboffer-container > header > .o-joboffer-header {
				height: 300px;
				max-height: 300px;
			}
			.o-joboffer-header-container {
				padding: 3rem 23px;
			}
		}
		@media (min-width: 992px) {
			.o-joboffer-container > header > .o-joboffer-header {
				height: 500px;
				max-height: 500px;
			}
			.o-joboffer-header-container {
				padding-top: 6rem !important;
				padding-bottom: 6rem !important;
			}
			.c-joboffer-content-container {
				margin: -140px 0 0;
			}
		}
		
		` + functions.responsivePadding(".has-padding");

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

JobOffer.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default JobOffer;