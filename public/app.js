'use strict';

function testButton() {
	alert(`Added to queue`);
}

$(document).ready(function () {

	$('.new-search-btn').hide();
	$('.queue').hide();

	// user submits search form
	$('.search-form').submit(event => {
		event.preventDefault();
		$('main').hide();
		$.get('/podcasts?q=' + $('.query').val(), function(data) {
			// search results populate
			data.results.forEach(function(item) {
				$('.search-results').append(`<p>${item.title_original}<br>by ${item.publisher_original}<br>${item.description_original}</p>`);
				$('.search-results').append(`<button onclick="testButton()">Add to queue</button>`);
			});
			$('.new-search-btn').show();
		});
	});

	$('.new-search-btn').click(event => {
		location.reload();
	});

});