'use strict';

const languageFunction = function(language, key) {
	const availableLanguages = ["en"];

	if(!language) {
		throw new Error("Language "+ language+ " not supported");
	}

	let languageFile = require("./_"+language);

	return languageFile[key] || "Lanauage key "+ key + " not found";
	

};


module.exports = languageFunction;