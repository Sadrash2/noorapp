import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";
import Menu from "../components/Menu";
import {setLanguage} from "../actions";


class MenuContainer extends React.Component {
	constructor(args) {
		super(args);
	}

	

	handleLogoClick(event) {
		this.context.router.push(config.root + "/");
	}

	handleHamburgerClick() {
		const {store} = this.context;
		store.dispatch({
			type: "TOGGLE_MENU"
		});
	}

	handleToggleLanguage() {
		const {store} = this.context;
		const currentLang = store.getState().language.code;
		const language = currentLang == "en" ? "ar" : "en";
		store.dispatch(setLanguage(language));
	}


	render() {
		const {store} = this.context;
		return (
			<Menu 
				handleLogoClick={this.handleLogoClick} 
				handleHamburgerClick={this.handleHamburgerClick.bind(this)}
				language={store.getState().language.code}
				arabic={store.getState().language.arabic}
				state={store.getState().menu}
				desktop={store.getState().desktop}
				handleToggleLanguage={this.handleToggleLanguage.bind(this)}
				/>
		);
	}

};

MenuContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object
};

export default MenuContainer;