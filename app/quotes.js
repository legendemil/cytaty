// import jquery
var $ = require('jquery');
// import handlebars, tamplating system
var handlebars = require('handlebars');
// store is a wrapper for localstorage
var store = require('store');

// quotes module
var quotes = (function() {
	
	var quotesContainer,
		// compiled quoteTemplate
		quoteTmpl,
		// quotes from localStorage
		quotes = store.get('quotes') || [],
		// how many quotes 
		quotesCount = quotes.length,
		noQuotesInfo;
	
	// show all quotes
	function showAll(){
		if(quotesCount) {
			noQuotesInfo.hide();
		}
		quotes.forEach(function(quote){
			var quote = quoteTmpl(quote);
			quotesContainer.append(quote);
		});
		// handle delete quote
		$(quotesContainer).find('.deleteQuoteBtn').on('click', handleDeleteQuote);
	}
	
	// adding quotes to local storage
	function add(data) {
		data.id = Date.now();
		quotes.unshift(data);			
		store.set('quotes', quotes);
		var quote = quoteTmpl(data);
		quote = quotesContainer.prepend(quote);
		// handle delete quote
		$(quote).find('.deleteQuoteBtn').on('click', handleDeleteQuote);

		quotesCount++;
		if(quotesCount > 0) 
			noQuotesInfo.hide();
	}

	// delete quote 
	function remove(id){
		id = parseInt(id);
		quotes = quotes.filter(function(quote){
			return  quote.id !== id ? true : false;
		});
		store.set('quotes', quotes);
		quotesCount--;
		console.log(quotesCount);
		if(quotesCount === 0) {
			noQuotesInfo.show();
		}

	}

	function handleDeleteQuote(ev){
		// get quote to remove
		var quote = $(ev.target).closest('.quote');
		var id = $(quote).find('input[name=id]')[0].value;
		
		quote.remove();
		remove(id);
	}

	function cacheDOM() {
		quotesContainer = $('#quotesContainer');
		quoteTmpl = handlebars.compile($('#quoteTmpl').html());		
		noQuotesInfo = $(quotesContainer).find('#no-quotes-info');
	}

	function bindEvents() {
		// show all quotes
		showAll();
	}

	function init() {
		cacheDOM();
		bindEvents();
	}

	init();

	return {
		add: add,
		showAll: showAll,
	}

})();

module.exports = quotes;