import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";
import {setLanguage} from "../actions";
import Questions from "../components/Questions";
import Footer from "../components/Footer";

class FAQContainer extends React.Component {
	
	render() {
		const {store} = this.context;
		const state = this.context.store.getState();
		return (
			<div>
				<Questions language={this.props.language} />
				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
			</div>
		);
	}

};

FAQContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object
};

export default FAQContainer;