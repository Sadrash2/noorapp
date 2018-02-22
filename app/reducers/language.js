const language = (state = {code: 'en', arabic: false}, action) => {
	switch(action.type) {
		case 'SET_LANGUAGE':
			return {
				code: action.code,
				arabic: action.arabic
			};
		default:
			return state;
	}
}
export default language;