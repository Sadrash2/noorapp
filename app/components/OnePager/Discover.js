import React from "react";
import Router from "react-router";
import {Link} from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import ReactSwipe from "react-swipe";
import css from "./css";

class Discover extends React.Component {

	constructor() {
		super();
			this.state = {index: 0}
	}
	onClickDotsOnce() {
		document.getElementById("one").className = "active";
		document.getElementById("two").className = "";
		document.getElementById("three").className = "";
		this.refs.slideContainer.swipe.slide(0, 400);
	}
	onClickDotsTwo() {
		document.getElementById("one").className = "";
		document.getElementById("two").className = "active";
		document.getElementById("three").className = "";
		this.refs.slideContainer.swipe.slide(1, 400);
	}
	onClickDotsThree() {
		document.getElementById("one").className = "";
		document.getElementById("two").className = "";
		document.getElementById("three").className = "active";
		this.refs.slideContainer.swipe.slide(2, 400);
	}
	_handleSwipe(index, elem) {
		if(index === 0) {
			document.getElementById("one").className = "active";
			document.getElementById("two").className = "";
			document.getElementById("three").className = "";
		}
		if(index === 1) {
			document.getElementById("one").className = "";
			document.getElementById("two").className = "active";
			document.getElementById("three").className = "";
		}
		if(index === 2) {
			document.getElementById("one").className = "";
			document.getElementById("two").className = "";
			document.getElementById("three").className = "active";
		}
	}
	onClickArrowLeft() {
		this.refs.slideContainer.swipe.prev();
	}
	onClickArrowRight() {
		this.refs.slideContainer.swipe.next();
	}

	render() {

		var slide1 = (<div className="o-discover-box-one">
	                	<div className="c-discover-title">
	                		{lang(this.props.language, "discoverBoxOne")}
						</div>
						<div className="c-discover-graphic-area"></div>
	                	
	                </div>);
		var slide2 = (<div className="o-discover-box-two">
				<div className="c-discover-title">
					{lang(this.props.language, "discoverBoxTwo")}
				</div>
				<div className="c-discover-graphic-area"></div>
			</div>);
		var slide3 = (<div className="o-discover-box-three">
				<div className="c-discover-title">
					{lang(this.props.language, "discoverBoxThree")}
				</div>
				<div className="c-discover-graphic-area"></div>
			</div>);
		var swipe = (
			<ReactSwipe startSlide={0} ref={"slideContainer"} continuous={true} auto={3000} disableScroll={false} speed={400} callback={this._handleSwipe.bind(this)}>
			{slide1}{slide2}{slide3}
			</ReactSwipe>
		);
		if(this.props.desktop) {
			swipe = (<div className="o-slides">{slide1}{slide2}{slide3}</div>);
		}
		let arrows = this.props.desktop ? "" : (
			<div className="o-discover-arrows" ref="arrowsContainer">
				<div className="c-left-arrow" onClick={this.onClickArrowLeft.bind(this)}></div>
				<div className="c-right-arrow" onClick={this.onClickArrowRight.bind(this)}></div>
			</div>
		);
		let dots = this.props.desktop ? "" : (<div className="o-discover-dots" ref="dotContainer" onChange={this._handleSwipe}>
					<div id="one" onClick={this.onClickDotsOnce.bind(this)} className={this.state.index === 0 ? 'active' : ''}></div>
					<div id="two" onClick={this.onClickDotsTwo.bind(this)} className={this.state.index === 1 ? 'active' : ''}></div>
					<div id="three" onClick={this.onClickDotsThree.bind(this)} className={this.state.index === 2 ? 'active' : ''}></div>
				</div>);

		return (
			<InlineCss namespace="discover" stylesheet={css.discover(this.props.arabic)}>
				
				<section id="introduction" className="page-section">
					<div className="container">
						<header>
							<h2>{lang(this.props.language, "startscreenContentTitle")}</h2>
							<div className="content">
								<p>{lang(this.props.language, "startscreenDescription")}</p>
								<ul className="list-unstyled">
									<li>{lang(this.props.language, "discoverBoxOne")}</li>
									<li>{lang(this.props.language, "discoverBoxTwo")}</li>
									<li>{lang(this.props.language, "discoverBoxThree")}</li>
								</ul>
							</div>
						</header>
						<div className="image-container">
							<img src="app/assets/images/content/promotional/discover/desktop/discover-phones.png" />
						</div>
					</div>
				</section>

			</InlineCss>
		);
	}

};

export default Discover;