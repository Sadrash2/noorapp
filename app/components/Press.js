import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import ReactSwipe from "react-swipe";
import {Link} from "react-router";
import Footer from "../components/Footer";
import functions from "../scss/styleFunctions";

var tempDivClick = "1";

class Press extends React.Component {

	callApi(){

		var monthNames = ["January", "February", "March", "April", "May", "June",
						  "July", "August", "September", "October", "November", "December"
						];
		var tempMonthYear = [];
		var tempPressData = [];

		var $ = require ('jquery')
			var request =  [
				"Press",
				"fetch",
				"all"];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					var response = JSON.parse(data);
					if(response.state === 200) {				
						var tempDate = "";
						var i = 0;
						$.each(response.success, function(key, value) {   
							var date = new Date(response.success[i].date*1000);
							
							if(monthNames[date.getMonth()] != tempDate){
								tempMonthYear.push(monthNames[date.getMonth()] + " " + date.getFullYear());
								tempDate = monthNames[date.getMonth()];						     	
							}
							tempPressData.push(response.success[i]);

							var dateContent = new Date(response.success[0].date*1000);

							document.getElementById("press-content-title").textContent = response.success[0].title;
							document.getElementById("press-content-time").textContent = 'Publish on ' + dateContent.getDate() +'. '+ monthNames[dateContent.getMonth()] + ' ' + dateContent.getFullYear();
							document.getElementById("press-content-detail").textContent = response.success[0].content;

							i++;
							
						});


						$("#press-list-detail li").remove();
						$("#press-list li").remove();
						var presslist = '';
						

						for(i = 0; i < tempMonthYear.length; i++){
							presslist = '';
							for(var j=0; j < tempPressData.length; j++){
								var date = new Date(tempPressData[j].date*1000);
								var monthYear = monthNames[date.getMonth()] + " " + date.getFullYear();
								if(tempMonthYear[i] == monthYear){
									presslist += '<li class="c-press__day is-clickable" id="'+tempPressData[j].id+'">' +
													'<div class="o-press-day__container">' +
														'<div class="o-press__date">' +
															'<time>' + date.getDate() +'. '+ monthNames[date.getMonth()] + ' ' + date.getFullYear() + '</time>' +
														'</div>' +
														'<div class="o-press__resumee">' +
															'<h2>' + tempPressData[j].title + '</h2>' +
														'</div>' +
													'</div>' +
													'<div class="o-press-content-mobile" id="press-content-mobile'+tempPressData[j].id+'">' +
														'<section class="o-press-content__container">' +
															'<header>' +
																'<h2 id="press-content-title'+tempPressData[j].id+'"></h2>' +
																'<time id="press-content-time'+tempPressData[j].id+'"></time>' +
															'</header>' +
															'<div class="o-press__content">' +
																'<p id="press-content-detail'+tempPressData[j].id+'"></p>' +
															'</div>' +
														'</section>' +
													'</div>' +
												'</li>';
								}
							
							}

							$('#press-list')
						         .append('<li class="c-press__day is-clickable">' +
											'<div class="c-press__month o-press-sidebar__widget">' +
												'<h3>' + tempMonthYear[i] + '</h3>' +
												'<ul class="c-press__days o-press_sidebar__list is-unstyled" id="press-list-detail'+i+'">' +
										         	presslist +
												'</ul>' +
											'</div>' +
										'</li>');

							$('#press-list-detail'+i).delegate('li','click', function (e) {
								getPressById(e.currentTarget.id);
								
							});
						}

						



					}
					else {
						console.log("Can't connect to the database, please try again later.");
					}
				}.bind(this)
			});

			function getPressById(id){
				var $ = require ('jquery')
				var request =  [
					"Press",
					"fetch", id];
				$.ajax({
					type: "POST",
					datatype: 'json',
					url: "./app/bridge/enter.php",
					data: {request},
					cache: false,
					success: function(data) {
						var response = JSON.parse(data);
						if(response.state === 200) {
							var mq = window.matchMedia( "(max-width: 766px)" );
							if(mq.matches){
								if(id != tempDivClick){
									$("#press-content-mobile"+tempDivClick).hide();
									$("#press-content-mobile"+id).show();
								}else{
									$("#press-content-mobile"+tempDivClick).show();
								}
							}else{
								$(".o-press-content-mobile").hide();
							}
							
							for(var i =0; i<response.success.length; i++) {
								var date = new Date(response.success[i].date*1000);
								document.getElementById("press-content-title"+id).textContent = response.success[i].title;
							 	document.getElementById("press-content-time"+id).textContent = 'Publish on ' + date.getDate() +'. '+ monthNames[date.getMonth()] + ' ' + date.getFullYear();
							 	document.getElementById("press-content-detail"+id).textContent = response.success[i].content;
							 	document.getElementById("press-content-title").textContent = response.success[i].title;
							 	document.getElementById("press-content-time").textContent = 'Publish on ' + date.getDate() +'. '+ monthNames[date.getMonth()] + ' ' + date.getFullYear();
							 	document.getElementById("press-content-detail").textContent = response.success[i].content;

							}
							tempDivClick = id;

						}
						else {
							console.log("this");
						}
					}.bind(this)
				});



			}
		
		
	}

	componentDidMount() {
			this.callApi();
		}

		componentDidUpdate() {
			this.updateDisplay();
		}

	updateDisplay(){
		var $ = require ('jquery')
		var mq = window.matchMedia( "(max-width: 766px)" );
			if(mq.matches){
				
			}else{
				$(".o-press-content-mobile").hide();
			}
		}
	

	
		render() {

		return (
			<InlineCss namespace="press" stylesheet={Press.css(this.props.arabic)}>
				
				<div className="o-press-container has-padding">
					<aside className="o-press-sidebar is-sidebar is-left-aligned has-widgets">

						<div className="o-press-sidebar_header">
							<h1 className="is-pagetitle">Press Releases</h1>
						</div>

						<ul className="c-press__days o-press_sidebar__list is-unstyled" id="press-list">
							<li className="c-press__day is-clickable">
								<div className="c-press__month o-press-sidebar__widget">
									<h3>May 2016</h3>
									<ul className="c-press__days o-press_sidebar__list is-unstyled" id="press-list-detail">
										<li className="c-press__day is-clickable">
											<div className="o-press-day__container">
												<div className="o-press__date">
													<time>21. May 2016</time>
												</div>
												<div className="o-press__resumee">
													<h2>We are looking for Web-App/UX/UI Designers and Graphic Designers with Marketing and Media focus. Any combination/specialisation is welcome.</h2>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</li>
						</ul>

					</aside>
					<div className="o-press-content">
						<section className="o-press-content__container">
							<header>
								<h2 id="press-content-title"></h2>
								<time id="press-content-time"></time>
							</header>
							<div className="o-press__content">
								<p id="press-content-detail"></p>
							</div>
						</section>
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
		.is-unstyled, ul.is-unstyled li {
			list-style: none
		}

		& {
			padding-top: 66px;
		}

		& .o-press-container {
			display: flex;
			flex-direction: column;
		}

		& aside.o-press-sidebar .o-press-sidebar_header {
			margin: 32px 0;
		}

		& aside.o-press-sidebar .o-press-sidebar_header > h1.is-pagetitle {
			font-size: 4.4rem;
			line-height: 48px;
			font-weight: 500;
			margin-bottom: -15px;
		}

		& aside.o-press-sidebar ul li .o-press-sidebar__widget {
			margin-bottom: 32px;
		}

		& aside.o-press-sidebar ul li .o-press-sidebar__widget:last-child {
			margin-bottom: 0;
		}

		& aside.o-press-sidebar ul li .o-press-sidebar__widget > h3 {
			margin-bottom: 16px;
			font-size: 2.8rem;
			line-height: 32px;
			font-weight: 500;
			color: #ADA497;
			margin-top: 50px;
		}

		ul.o-press_sidebar__list {
			marign: 0;
			padding: 0;
		}
		ul.o-press_sidebar__list li.c-press__day > div.o-press-day__container {
			display: flex;
			flex-direction: row;
			padding: 16px 0;
			border-bottom: 1px solid #ECE8E1;
			cursor: pointer;
			transition: all .25s ease-in-out;
		}
		ul.o-press_sidebar__list li.c-press__day > div.o-press-day__container:hover {
			opacity: 0.75;
		}
		.o-press-day__container > div { float: left; }
		.o-press__date > time {
			font-size: 1.6rem;
			font-weight: 600;
			color: black;
		}
		.o-press__resumee {
			flex: 1;
			margin-left: 23px;
		}
		.o-press__resumee > h2 {
			font-size: 1.6rem;
			line-height: 23px;
		}

		& .o-press-content .o-press-content__container {
			padding: 23px;
			background-color: white;
		}

		& .o-press-content .o-press-content__container > header > h2 {
			font-size: 2.0rem;
			line-height: 28px;
			color: black;
			font-weight: 500;
		}

		& .o-press-content .o-press-content__container > header > time {
			font-size: 1.4rem;
		}

		& .o-press__content {
			margin-top: 32px;
		}
		& .o-press-content-mobile {
				display: none;
			}


		@media (max-width: 768px) {
			.o-press-container {
				padding: 0 23px;
			}
		}
		@media (min-width: 767px) {

			& .o-press-container {
				flex-direction: row;
			}

			& aside.o-press-sidebar, .o-press-content {
				flex-basis: 50%;
			}

			& aside.o-press-sidebar {
				margin-right: 32px;
			}

			& aside.o-press-sidebar .o-press-sidebar_header > h1.is-pagetitle {
				font-size: 4.4rem;
				line-height: 48px;
				font-weight: 500;
			}

			& aside.o-press-sidebar .o-press-sidebar__widget > h3 {
				margin-bottom: 16px;
				font-size: 2.8rem;
				line-height: 32px;
				font-weight: 500;
				color: #ADA497;
			}

			& .o-press-content {
				padding: 11.5rem 0;
			}

			& .o-press-content-mobile {
				display: none;
			}

			& .o-press-content .o-press-content__container {
				box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
			}

			& .o-press-content .o-press-content__container > header > h2 {
				font-size: 2.0rem;
				line-height: 28px;
				font-weight: 500;
			}

		}

		@media (max-width: 766px) {


			& .o-press-content {
				display: none;
			}

			& .o-press-content-mobile .o-press-content__container {
				box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
				background-color: #FFFFFF;
				padding: 15px;
			}

			& .o-press-content-mobile .o-press-content__container > header > h2 {
				font-size: 2.0rem;
				line-height: 28px;
				font-weight: 500;
				color: black;
			}

			& .o-press-content-mobile .o-press-content__container > header > time {
				font-size: 1.4rem;
			}

		}

		` + functions.responsivePadding(".has-padding");



		const arabic = ``;

		return arabicToggle ? base + arabic : base;
	}

};

export default Press;