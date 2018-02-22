let functions = {
	responsivePadding: function(selector) {
		return `
		@media (min-width: 992px) {
			${selector} {
				padding: 0 8%;
			}	
		}

		@media (min-width: 1106px) {
			${selector} {
				padding: 0 12%;
			}
		}

		@media (min-width: 1506px) {
			${selector} {
				padding: 0 19%;
			}
		}
		`;
	} 

};

export default functions;