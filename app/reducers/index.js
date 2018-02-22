import { combineReducers } from 'redux';
import language from "./language";

const desktop = (state = false, action) => {
	switch(action.type) {
		case 'SET_RESOLUTION':
			return action.desktop;
		default:
			return state;
	}
}

const menu = (state = false, action) => {
	switch(action.type) {
		case 'TOGGLE_MENU':
			return !state;
		default:
			return state;
	}
}

const app = {
	language,
	desktop,
	menu
};

export default app;