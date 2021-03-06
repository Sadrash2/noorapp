import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "./Footer";


class JobOpportunities extends React.Component {

	constructor(args) {
		super(args);
	}

	
	render() {


		return (
			<InlineCss stylesheet={JobOpportunities.css(this.props.arabic)} namespace="JobOpportunities">
				<div className="o-jobopportunities-container">
					<h1 className="c-location-headline">NOOR ME Technology ASIA BHD SDN</h1>
					<p >is a Start-up, with the aim to develop a unique Islamic mobile application that comprises all parts of modern Muslim religious practice, allowing its users to practice their religion seamlessly anywhere in the world with their NOOR daily companion App.</p>
					<p className="o-break">Furthermore, we are planning the development of an accompanying Web portal including but not limited to a web store and travel portal for the specific needs of Muslim consumers in the following months.</p>
					

					<h1>Open positions</h1>

					<div className="o-job">
						<h2>Web-App/UX/UI Designers</h2>
						<p ><strong>We are looking for Web-App/UX/UI Designers and Graphic Designers with Marketing and Media focus. Any combination/specialisation is welcome.</strong></p>

						<p className="o-break">You'll be working within a small agile team of designers and developers. You are tasked with the development and implementation of features, solving issues independently or within an agile team.</p>

					
						<p className="o-break"><strong>Tasks</strong></p>
						<p><i>You will be tasked with:</i></p>
						<p><strong>Core Web</strong></p>
						<ul>
							<li>Developing and owning parts of the Application Design, Structure, User Interface and Experience of the NOOR App within agile teams</li>
							<li>Screen Designs, Mockup Creation, Storytelling, developing and maintaining Grid structures, actively managing feedback whilst working within agile teams</li>
						</ul>
						<p><strong>Core Graphic/Media</strong></p>
						<ul>
							<li>Enhancing the NOOR branding in cooperation with the Design Team</li>
							<li>Furthering the Design language including colour schemes, artwork, photography, animation, style of type, and other visual elements for the design along with appropriate size and arrangement of the different elements on the page or screen.</li>
							<li>Develop and implement online and offline marketing initiatives with the key stakeholders that achieve set goals and objectives</li>
						</ul>

						<p className="o-break"><strong>Requirements</strong></p>
						<ul>
							<li>2-3 years of work experience</li>
							<li>Advanced experience with Vector based programs, Adobe Photoshop, Sketch (preferred), Adobe Illustrator</li>
							<li>Ability to develop and maintain Grids</li>
							<li>Affinity to develop within a proper semantic language.</li>
							<li>Exceptional creativity, innovation, time management and organizational skills</li>
							<li>Professional approach to deadlines</li>
							<li>Advanced communication and writing skills in English </li>
							<li>Open and enthusiastic, able to work creatively in a multicultural team</li>
							<li>Quick and self-driven learner</li>
						</ul>

						<p className="o-break"><strong>Preferred/Optional</strong></p>
						<ul>
							<li>Advanced HTML(5) and CSS3 skills</li>
							<li>Experience with Frameworks such as Bootstrap</li>
							<li>Basic experience with JavaScript and JS Framework such as jQuery</li>
							<li>Knowledge in backporting towards older browsers (ex. IE8)</li>
							<li>Experience with Typography, colours and language within Arab culture</li>
							<li>Assertive, strong communicator across a variety of platforms and on all levels, with strong marketing skills and well trained eye for creativity and detail</li>
							<li>We focus on agile methods i.e. SCRUM.</li>
						</ul>

						<p className="o-break"><strong>Your Benefits</strong></p>
						<p>We are working out of a newly renovated modern and luxurious office in KLCC, Kuala Lumpur. </p>
						<p>We offer competitive negotiable Salaries. Free Healthy Drinks, Fruits and Snacks are provided on premises daily. Health and Dental included. Great team and working environment. All Equipment provided. No dress code, flexible working hours.</p>
						<p>Working times are 40 flexible hours per week. Flexibility and enthusiasm is key in our work environment.</p>


					</div>




					<div className="o-job">
						<h2>Full Stack, Web and JavaScript Developers</h2>
						<p ><strong>We are looking for Full Stack, Web and JavaScript Developers. Any combination/specialisation is welcome.</strong></p>

						<p className="o-break">You'll be working within a small agile team of designers and developers. You are tasked with the development and implementation of features, solving issues independently or within an agile team. A person that is flexible in both working methods and new technologies. Should not be afraid of trying new things and question tasks assigned with the motive to improve. Focuses a lot on efficiency at the same time as quality, while strictly following deadlines.</p>

					
						<p className="o-break"><strong>Tasks</strong></p>
						<p><i>You will be tasked with:</i></p>
						<ul>
							<li>direct responsibility owning parts of the Application or Web Features</li>
							<li>developing and maintaining structure, database, code base, translating design mock-ups to workable</li>
							<li>working in a structured code environment</li>
							<li>maintaining and enhancing databases</li>
							<li>working with agile methods, i.e. SCRUM</li>
						</ul>

						<p className="o-break"><strong>Requirements</strong></p>
						<ul>
							<li>Experience with Javascript on the web or in an application following at least ES5 standards, ES6 preferred</li>
							<li>Knowledge of React JS</li>
							<li>Experience with server side Javascript and Node.js</li>
							<li>Experience with CommonJS module system.</li>
							<li>Experience with agile methods, git and SCRUM</li>
							<li>Experience with semantic HTML5</li>
							<li>Experience with building responsive web </li>
							<li>Self driven, motivated, across a variety of platforms and on all levels, with strong well trained eye detail</li>
							<li>Exceptional creativity, innovation, time management and organizational skills</li>
							<li>Professional approach to deadlines</li>
							<li>Advanced communication and writing skills in English </li>
							<li>Open and enthusiastic, able to work creatively in a multicultural team</li>
						</ul>

						<p className="o-break"><strong>Preferred/Optional</strong></p>
						<ul>
							<li>Experience with PHP, preferably HHVM</li>
							<li>Experience with databases, SQL and architecture</li>
							<li>Experience with React Native/React JS</li>
							<li>Experience with developing Android/iOS apps</li>
							<li>Knowledge of browser optimization and rendering</li>
							<li>Knowledge of HTTP and Network performance optimization</li>
							<li>Experience with Webpack</li>
							<li>Knowledge of Isomorphic Javascript</li>
						</ul>

						<p className="o-break"><strong>Your Benefits</strong></p>
						<p>We are working out of a newly renovated modern and luxurious office in KLCC, Kuala Lumpur. </p>
						<p>We offer competitive negotiable Salaries. Free Healthy Drinks, Fruits and Snacks are provided on premises daily. Health and Dental included. Great team and working environment. All Equipment provided. No dress code, flexible working hours.</p>
						<p>Working times are 40 flexible hours per week. Flexibility and enthusiasm is key in our work environment.</p>
					</div>


					<div className="o-job">
						<h2>Senior iOS/Android App Engineer/JS Engineers</h2>
						<p><strong>We are looking for Senior iOS/Android Lead App Engineer/JS Engineers</strong></p>

						<p className="o-break">You'll be working within a small agile team of designers and developers. You are tasked with the development and implementation of features, solving issues independently or within an agile team.</p>

					
						<p className="o-break"><strong>Tasks</strong></p>
						<p><i>You will be tasked with:</i></p>
						<p>You'll be working within an agile team of developers as a team leader, where your position in the team is to write modules and bridges in iOS/Android in order to solve and add features to the native iOS/Android app. With your expertise with iOS/Android apps, iOS/Android SDK and best practices with developing iOS/Android, you will be a key member of the React Native based iOS/Android app team in delivering the required features and leading agile teams in the development of iOS/Android apps.</p>

						<p className="o-break"><strong>Requirements</strong></p>
						<ul>
							<li>Experience with planning, developing and deploying an iOS/Android application</li>
							<li>Experience with iOS/Android UX</li>
							<li>iOS/Android best practice UX and development methods</li>
							<li>Objective-C, Swift.</li>
							<li>Extended Experience JavaScript on the web or in an application</li>
							<li>Experience with agile development methods, git and SCRUM</li>
							<li>Professional approach to deadlines </li>
							<li>Advanced communication and writing skills in English </li>
							<li>Open and enthusiastic, able to work creatively in a multicultural team</li>
							<li>Quick and self-driven learner</li>
						</ul>

						<p className="o-break"><strong>Preferred/Optional</strong></p>
						<ul>
							<li>Experience with React JS and React Native</li>
							<li>Experience with databases, SQL and architecture</li>
							<li>Experience with HTML5, CSS3 and Network performance optimization</li>
						</ul>

						<p className="o-break"><strong>Your Benefits</strong></p>
						<p>We are working out of a newly renovated modern and luxurious office in KLCC, Kuala Lumpur. </p>
						<p>We offer competitive negotiable Salaries. Free Healthy Drinks, Fruits and Snacks are provided on premises daily. Health and Dental included. Great team and working environment. All Equipment provided. No dress code, flexible working hours.</p>
						<p>Working times are 40 flexible hours per week. Flexibility and enthusiasm is key in our work environment.</p>
					</div>




					<div className="o-job">
						<h2>Tester/QA Engineers</h2>
						<p ><strong>We are looking for Tester/QA Engineers.</strong></p>

						<p className="o-break">You'll be working within a small agile team of designers and developers. You are tasked with the development and implementation of features, solving issues independently or within an agile team.</p>
					

						<p className="o-break"><strong>Requirements</strong></p>
						<ul>
							<li>2-3 years of work experience</li>
							<li>Ability to implement steps toward Continuous Integration process (using either Travis, Jenkins, Circle, or CodeShip (TBD) based on Behat/PHPUnit/Selenium testing frameworks related to Wordpress</li>
							<li>The two primary workflows to target for testing would be new investor registration and reservation/investment</li>
							<li>Experience with code refactoring a plus.</li>
							<li>Affinity to develop within a proper semantic language</li>
							<li>Professional approach to deadlines</li>
							<li>Advanced communication and writing skills in English  </li>
							<li>Open and enthusiastic, able to work creatively in a multicultural team</li>
							<li>Quick and self-driven learner</li>
						</ul>

						<p className="o-break"><strong>Preferred/Optional</strong></p>
						<ul>
							<li>HTML(5) and CSS3 skills</li>
							<li>Experience with Frameworks such as Bootstrap</li>
							<li>Basic experience with JavaScript and JS Framework such as jQuery</li>
							<li>Knowledge in backporting towards older browsers (ex. IE8)</li>
							<li>Assertive, strong communicator across a variety of platforms and on all levels, with strong marketing skills and well trained eye for creativity and detail</li>
							<li>We focus on agile methods i.e. SCRUM</li>
						</ul>

						<p className="o-break"><strong>Your Benefits</strong></p>
						<p>We are working out of a newly renovated modern and luxurious office in KLCC, Kuala Lumpur. </p>
						<p>We offer competitive negotiable Salaries. Free Healthy Drinks, Fruits and Snacks are provided on premises daily. Health and Dental included. Great team and working environment. All Equipment provided. No dress code, flexible working hours.</p>
						<p>Working times are 40 flexible hours per week. Flexibility and enthusiasm is key in our work environment.</p>
					</div>


					<div className="o-job">
						<h2>Database Engineers</h2>
						<p ><strong>We are looking for Database Engineers</strong></p>

						<p className="o-break">You'll be working within a small agile team of designers and developers. You are tasked with the development and implementation of features, solving issues independently or within an agile team. </p>

					
						<p className="o-break"><strong>Tasks</strong></p>
						<p><i>You will be tasked with:</i></p>
						<p>You'll be working with a couple of teams developing an application on different platforms and will be in charge of developing and installing the database(s) for these applications. You will have a lot of influence in your work, as you will be the main database architect.</p>

						<p className="o-break"><strong>Requirements</strong></p>
						<ul>
							<li>2-3 years of work experience</li>
							<li>Experience with determining database structural requirements by analysing operations, applications, and programming</li>
							<li>Experience with implementing, installing and maintaining databases</li>
							<li>Experience in finding bottle necks and solutions to arising problems in a database or a database cluster</li>
							<li>SQL</li>
							<li>Knowledge of best practises with developing Data Access Layers</li>
							<li>Knowledge in database security and database connectivity security </li>
							<li>Professional approach to deadlines</li>
							<li>Advanced communication and writing skills in English </li>
							<li>Open and enthusiastic, able to work creatively in a multicultural team</li>
							<li>Quick and self-driven learner </li>
						</ul>

						<p className="o-break"><strong>Preferred/Optional</strong></p>
						<ul>
							<li>Relay and GraphQL</li>
							<li>API DAL development</li>
							<li>Javascript, HTML, CSS and HTTP, HHVM</li>
							<li>Assertive, strong communicator across a variety of platforms and on all levels, with strong marketing skills and well trained eye for creativity and detail</li>
							<li>We focus on agile methods i.e. SCRUM.</li>
						</ul>

						<p className="o-break"><strong>Your Benefits</strong></p>
						<p>We are working out of a newly renovated modern and luxurious office in KLCC, Kuala Lumpur. </p>
						<p>We offer competitive negotiable Salaries. Free Healthy Drinks, Fruits and Snacks are provided on premises daily. Health and Dental included. Great team and working environment. All Equipment provided. No dress code, flexible working hours.</p>
						<p>Working times are 40 flexible hours per week. Flexibility and enthusiasm is key in our work environment.</p>
					</div>




					<h1>Send an application</h1>
					<p>Please send your application in a mail with your resume attached to <a className="button btn" href="mailto:moe@noor.me">moe@noor.me</a></p> 

				</div>
				<Footer />
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `
			div#react-root {
			}

			& {
				padding: 102px 0 60px;
			}

			& > .o-jobopportunities-container {
				padding: 23px 19%;
			}

			& h1 {
				margin-top: 64px;
				margin-bottom: 32px;
			}

			& h1.c-location-headline {
				margin-top: 32px;
				margin-bottom: 32px;
				font-size: 4.8rem;
				line-height: 51px;
				font-weight: 100;
			}

			& .o-job {
				background-color: ${colors.white};
				padding: 32px;
				margin-bottom: 60px;
				-webkit-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.10);
				-moz-box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.10);
				box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.10)
			}

			& .o-job h2 {
				text-align: center;
				padding-top: 32px;
				padding-bottom: 64px;
				font-size: 3.2rem;
				line-height: 36px;
			}

			& .o-job ul {
				padding: 0 20px;
				list-style-type: square;
			}
			
			.btn {
				width: 270px;
			}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

export default JobOpportunities;