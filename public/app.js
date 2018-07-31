'use strict';

$(() => {
	// user submits search form
	$('.search-form').submit(event => {
		event.preventDefault();
		$('main').hide();
		$.get('/podcasts?q=' + $('.query').val(), data => {
			$('.search-page').show();
			// search results populate
			data.results.forEach(item => {
				$('.search-page').append(`<p>${item.title_original}<br>by ${item.publisher_original}<br>${item.description_original}</p><button class='add-btn'>Add to queue</button>`);
			});
			$('.search-page').on('click', '.add-btn', event => {
				alert(`Added to queue`);
			});
		});
	});

	$('.new-search-btn').click(event => {
		location.reload();
	});

});