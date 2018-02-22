import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";
import {setLanguage} from "../actions";
import Timeline from "../components/Timeline";

class FAQContainer extends React.Component {
	
	render() {
		const {store} = this.context;
		return (
			<Timeline />
		);
	}

};

FAQContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object
};

export default FAQContainer;