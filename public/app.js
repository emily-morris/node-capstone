'use strict';

$(document).ready(function () {
	$('section').hide();
	// user submits search form
	$('.search-form').submit(event => {
		event.preventDefault();
		$('main').hide();
		$('section').show();
		$.get('/podcasts?q=' + $('.query').val(), function(data) {
			// search results populate
			data.results.forEach(function(item) {
				$('section').append('<p>' + item.title_original + '<br>' + 'by ' + item.publisher_original + '<br>' + item.description_original + '</p>');
			});
		});
	});
	$('.new-search').click(event => {
		location.reload();
	});
});