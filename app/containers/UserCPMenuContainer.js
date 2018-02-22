import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";
import UserCPMenu from "../components/User/UserCPMenu";
import {setLanguage} from "../actions";


class UserCPMenuContainer extends React.Component {
	constructor(args) {
		super(args);
	}

	render() {
		const {store} = this.context;
		return (
			<UserCPMenu 
				language={store.getState().language.code}
				arabic={store.getState().language.arabic}
				state={store.getState().menu}
				desktop={store.getState().desktop}
				/>
		);
	}

};

UserCPMenuContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object
};

export default UserCPMenuContainer;