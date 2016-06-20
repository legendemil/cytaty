// iport quotes
var quotes = require('./quotes');

var Events = (function() {
	function handleFormSubmit(ev) {
		ev.preventDefault();
		var data = {
			quote: addForm.quote.value,
			author: addForm.author.value
		}

		if(!data.quote || !data.author) {
			alert('Zapomniałeś wypełnić wszystkich pól');
		} else {
			quotes.add(data);
			addForm.quote.value = null;
			addForm.author.value = null;
		}
	}

	

	return {
		handleFormSubmit: handleFormSubmit,
	}

})();

module.exports = Events;