
let functions = {
	passRequestWithoutCallback: function(api, method, opt) {	
		var $ = require ('jquery')
		var request =  [
			api,
			method, 
			opt];
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: {request},
			cache: false,
			success: function(data) {
			}.bind(this)
		});
	},
	passRequest: function(api, method, opt, callback) {	
		var $ = require ('jquery')
		var request =  [
			api,
			method, 
			opt];
		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: {request},
			cache: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	},
	passFormDataWithoutCallback: function(api, method, opts) {	
		var $ = require ('jquery')
		var request =  [
			api,
			method, 
			opts];
		var json = JSON.stringify(request); 
 
		var form_data = new FormData();  
		form_data.append('request', json); 

		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
			}.bind(this)
		});
	},
	passFormData: function(api, method, opts, callback) {	
		var $ = require ('jquery')
		var request =  [
			api,
			method, 
			opts];
		var json = JSON.stringify(request); 
 
		var form_data = new FormData();  
		form_data.append('request', json); 

		$.ajax({
			type: "POST",
			datatype: 'json',
			url: "./app/bridge/enter.php",
			data: form_data,
			cache: false,
			contentType: false,
		    processData: false,
			success: function(data) {
				callback(data);
			}.bind(this)
		});
	}
};

export default functions;