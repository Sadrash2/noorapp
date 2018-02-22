import React from "react";
import Router from "react-router";
import {Link} from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import ReactSwipe from "react-swipe";
import MosqueFinder from "./MosqueFinder";
import {PlaceHolder} from "./PlaceHolder";
import css from "./css";

class Features extends React.Component {

	constructor() {
		super();

		this.state = {
			quran: true,
			index: 0
		}
	}
	onClickDotsOnce() {
		document.getElementById("dotOne").className = "active";
		document.getElementById("dotTwo").className = "";
		document.getElementById("dotThree").className = "";
		this.refs.swipeContainer.swipe.slide(0, 400);
	}
	onClickDotsTwo() {
		document.getElementById("dotOne").className = "";
		document.getElementById("dotTwo").className = "active";
		document.getElementById("dotThree").className = "";
		this.refs.swipeContainer.swipe.slide(1, 400);
	}
	onClickDotsThree() {
		document.getElementById("dotOne").className = "";
		document.getElementById("dotTwo").className = "";
		document.getElementById("dotThree").className = "active";
		this.refs.swipeContainer.swipe.slide(2, 400);
	}
	_handleSwipe(index, elem) {
		if(index === 0) {
			document.getElementById("dotOne").className = "active";
			document.getElementById("dotTwo").className = "";
			document.getElementById("dotThree").className = "";
		}
		if(index === 1) {
			document.getElementById("dotOne").className = "";
			document.getElementById("dotTwo").className = "active";
			document.getElementById("dotThree").className = "";
		}
		if(index === 2) {
			document.getElementById("dotOne").className = "";
			document.getElementById("dotTwo").className = "";
			document.getElementById("dotThree").className = "active";
		}
	}
	onClickArrowLeft() {
		this.refs.swipeContainer.swipe.prev();
	}
	onClickArrowRight() {
		this.refs.swipeContainer.swipe.next();
	}

	_handleClick(elem) {

		if(this.props.desktop) return false;

		let quran = elem.target.parentElement.classList.contains("c-quran-reader");

		if(quran) {
			this.setState({
				quran: true
			});
		} else {
			this.setState({
				quran: false
			});
		}
	}

	render() {

		let arrows = this.props.desktop ? "" : (
			<div className="o-features-arrows" ref="arrowsContainer">
				<div className="c-left-arrow" onClick={this.onClickArrowLeft.bind(this)}></div>
				<div className="c-right-arrow" onClick={this.onClickArrowRight.bind(this)}></div>
			</div>
		);

		let dots = this.props.desktop ? "" : (
			<div className="o-features-dots" ref="dotContainer" id="dotsSwipe">
				<div id="dotOne" onClick={this.onClickDotsOnce.bind(this)} className={this.state.index === 0 ? 'active' : ''}></div>
				<div id="dotTwo" onClick={this.onClickDotsTwo.bind(this)} className={this.state.index === 1 ? 'active' : ''} ></div>
				<div id="dotThree" onClick={this.onClickDotsThree.bind(this)} className={this.state.index === 2 ? 'active' : ''}></div>
			</div>
		);

		let quranBoxes = [
			{img: "", title: lang(this.props.language, "quranBoxOneTitle"), text: lang(this.props.language, "quranBoxOneText")},
			{img: "", title: lang(this.props.language, "quranBoxTwoTitle"), text: lang(this.props.language, "quranBoxTwoText")},
			{img: "", title: lang(this.props.language, "quranBoxThreeTitle"), text: lang(this.props.language, "quranBoxThreeText")}
		];

		let boxes = quranBoxes.map((quranBox, index) =>{
			return (
				<div className="o-quran-box" key={"quran-box-" + index}>
					<div className="c-quran-box-graphic-area"></div>
					<div className="c-quran-box-title">{quranBox.title}</div>
					<div className="c-quran-box-description">{quranBox.text}</div>
				</div>
			)
		});


		let quranContainer = (
			<ReactSwipe ref="swipeContainer" startSlide={0} continuous={true} auto={3000} disableScroll={false} speed={400} callback={this._handleSwipe.bind(this)}>
				{boxes}
			
			</ReactSwipe>
		);

		if(this.props.desktop) {
			quranContainer = (
				<div className="c-quran-boxes">
					{boxes}
				</div>
			);
		}

		let placeHolder = this.props.desktop ?(
			<PlaceHolder
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
		): "";
		let shownApp = (
		<div>

			<div className="o-quran-content">
			<div className="o-quran-container-outer">
				<header className="section-header">
					<span className="quran-symbol"></span>
					<h2 className="c-feature-boxes-title">{lang(this.props.language, "quranFeatureBoxesTitle")}</h2>
				</header>
				<div className="o-quran-container">
				
					{quranContainer}

					{arrows}
					<div className="c-quran-image">
						<div className="c-feature-pad"></div>
					</div>
				</div>
				</div>
				<div>
				{dots}
				</div>
				

			</div>
			<div>
				{placeHolder}
				</div>
			</div>);

		if(!this.state.quran && !this.props.desktop) {
			shownApp = (
				<MosqueFinder
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic}
				 />
			);
		}

		let desktopFinder = this.props.desktop ? (
				<MosqueFinder
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic}
				 />
			): "";

		let mobileHolder = this.props.desktop ? "" : (
			<PlaceHolder
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
		);


		let activeBar = this.props.desktop ? "" : (
			<div className="c-active-bar">
				<div className={this.state.quran ? "" : "active"}></div>
			</div>
		);

		let circle = this.props.desktop ? (
			<div className="c-circle">
			</div>
		) : "";



		const header = this.props.desktop ? "" : (
			<div className="c-feature-header">
				<h2>{lang(this.props.language, "features")}</h2>

			</div>);

		const navigation = this.props.desktop? "" : (<div className="o-feature-navigation">
				<div className="c-quran-reader" onClick={this._handleClick.bind(this)}>
					{lang(this.props.language, "quranReader")}
					{circle}
				</div>
				<div className="c-mosque-finder" onClick={this._handleClick.bind(this)}> 
					{lang(this.props.language, "mosqueFinder")}
					{circle}
					
				</div>
				{activeBar}
			</div>
		);

		return (
			<InlineCss namespace="features" stylesheet={css.features(this.props.arabic)}>
				
				<section id="quran" className="page-section">
					<div className="container">
						<div className="has-bg">
							<header>
								<div className="section-symbol"></div>
								<h2>{lang(this.props.language, "quranFeatureBoxesTitle")}</h2>
							</header>
							<div className="content">
								<ul className="flex-list list-unstyled">
									<li>
										<h3>{lang(this.props.language, "quranBoxOneTitle")}</h3>
										<p>{lang(this.props.language, "quranBoxOneText")}</p>
									</li>
									<li>
										<h3>{lang(this.props.language, "quranBoxTwoTitle")}</h3>
										<p>{lang(this.props.language, "quranBoxTwoText")}</p>
									</li>
									<li>
										<h3>{lang(this.props.language, "quranBoxThreeTitle")}</h3>
										<p>{lang(this.props.language, "quranBoxThreeText")}</p>
									</li>
								</ul>
							</div>
							<div className="image-container">
								<img src="app/assets/images/content/promotional/quran/ipad.png" />
							</div>
						</div>
					</div>
				</section>
				
			</InlineCss>
		);
	}



};

export default Features;