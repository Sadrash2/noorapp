

export const setLanguage = (language) => {
	return {
		type: "SET_LANGUAGE",
		code: language,
		arabic: language === "ar"
	}
};

export const setResolution = (desktop) => {
	return {
		type: "SET_RESOLUTION",
		desktop: desktop
	}
} 

export const toggleMenu = () => {
	return {
		type: 'TOGGLE_MENU'
	}
}