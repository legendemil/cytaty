// import jquery
var $ = require('jquery');
// import Events module
var Events = require('./events');


// main app module
var app = (function(){
	// hold form data
	var addForm = {
		form: null,
		quoteText: null,
		author: null,
		submitBtn: null
	}


	// get DOM elements
	function cacheDOM(){
		addForm.form = $('#addForm');
		addForm.quoteText = $(addForm.form).find('#quote');
		addForm.author = $(addForm.form).find('#author');
		addForm.submitBtn = $(addForm.form).find('input[type="submit"]');
	}

	// bind events
	function bindEvents() {
		addForm.form.on('submit', Events.handleFormSubmit);
	}
	
	// initialize app
	function init() {
		cacheDOM();
		bindEvents();
	}
	
	// start app
	init();

})();




