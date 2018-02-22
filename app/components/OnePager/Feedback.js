import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import ReactSwipe from "react-swipe";
import styleFunctions from "../../scss/styleFunctions";
import {Link} from "react-router";
import css from "./css";

class Feedback extends React.Component {

	constructor() {
		super();
		this.render = this.render.bind(this);
 		this.state = { 
 			beta: false, 
 			newsletter: false,
 			emailValid: true,
 			emailSubmitted: false
 		};
		
	}

	_handleCheck(event) {
		var beta = event.target.classList.contains("ref-beta");
		if(beta) {
			this.setState({beta: !this.state.beta});
		} else {
			this.setState({newsletter: !this.state.newsletter});
		}
	}

	isEmailValid(email) {
		var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(email);
	}

	_handleSubmit(event) {
		let email = this.refs.input.value;

		if(this.isEmailValid(email)) {
			var $ = require ('jquery')
			var request =  [
				"Newsletter",
				"subscribe",
				email];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					var response = JSON.parse(data);
					if(response.success === "OK") {
						this.setState({emailValid: true, emailSubmitted: true});
					}
					else {

						this.refs.errorMessage = response.error;
						this.setState({emailValid: false});
					}
				}.bind(this)
			});
		} else {
			this.refs.errorMessage = "Invalid Email";
			this.setState({emailValid: false});
		}
	}

	componentDidUpdate(){
		this.render();
	}


	render() {

		const input = this.state.emailSubmitted ? (
			<div className="o-input-container" style={{padding: "5%"}}>
				You have subscribed to the newsletter!
			</div>
			) : (
			<div className="o-input-container">
				<input className="c-input" ref="input" type="o-text" />
				<div className="c-submit" onClick={this._handleSubmit.bind(this)}>SUBMIT</div>
			</div>
		);

		return (
			<InlineCss namespace="feedback" stylesheet={css.feedback(this.props.arabic)}>
				<div className="o-social-media">
					<div className="c-social-media-header">
						<h2>{lang(this.props.language, "connectText")}</h2>
					</div>
					{/*<div className="o-social-media-container">
						<div className="c-social-link">
							<div className="c-instagramlogo" dangerouslySetInnerHTML={{__html: instagramlogo}}>
								
							</div>
							<div className="o-text">
								instagram.com/noor
							</div>
						</div>
						<div className="c-social-link">
							<div className="c-twitterlogo" dangerouslySetInnerHTML={{__html: twitterlogo}}>
								
							</div>
							<div className="o-text">
								twitter.com/noor
							</div>
						</div>
						<div className="c-social-link">
							<div className="c-fblogo" dangerouslySetInnerHTML={{__html: fblogo}}>
								
							</div>
							<div className="o-text">
								fb.com/noor
							</div>
						</div>
						<div className="c-social-link">
							<div className="c-mediumlogo" dangerouslySetInnerHTML={{__html: mediumlogo}}>
								
							</div>
							<div className="o-text">
								medium.com/noor
							</div>
						</div>
					</div>*/}
				</div>
				<div className="o-beta-container">
					<div className="o-beta-program">
						<h2>{lang(this.props.language, "newsletterText")}</h2>
						

						{input}
						<div className="c-input-error" ref="errorMessage">
							{this.state.emailValid ? "" : this.refs.errorMessage}
						</div>
					</div>
				</div>
				<div className="c-contact-form">	
				</div>

			</InlineCss>
		);
	}


};

export default Feedback;