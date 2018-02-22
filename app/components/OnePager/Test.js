import React from "react";
import Router from "react-router";
import {Link} from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import ReactSwipe from "react-swipe";
import css from "./css";
import Footer from "../Footer";

class Test extends React.Component {

	constructor() {
		super();
			this.state = {index: 0}
	}

	componentDidMount() {
			var $ = require ('jquery')
			document.addEventListener('scroll', this.handlescroll);
			$('html, body').animate({
                scrollTop: 0
            }, 0);
		}

	render() {

		return (
			<InlineCss namespace="livefeed" stylesheet={css.livefeed(this.props.arabic)}>
			<iframe src="https://www.powr.io/plugins/instagram-feed/view?unique_label=6171cb1d_1464938470&external_type=iframe" width="100%" height="600" frameborder="0"></iframe>
				{/*
				<iframe src="https://www.powr.io/plugins/instagram-feed/view?unique_label=6171cb1d_1464938470&external_type=iframe" width="100%" height="600" frameborder="0"></iframe>

				<script src="//www.powr.io/powr.js" external-type="html"></script>

				<div className="powr-social-feed" label="4801021"></div>

				<div className="powr-instagram-feed" id="6171cb1d_1464938470"></div>
*/}
				
				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
			</InlineCss>
		);
	}

};

export default Test;