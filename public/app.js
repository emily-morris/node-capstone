'use strict';

$(() => {
	// user submits search form
	$('.search-form').submit(event => {
		event.preventDefault();
		$('main').css('display', 'none');
		$.get('/podcasts?q=' + $('.query').val(), data => {
			$('.search-page').css('opacity', '1');
			// search results populate
			data.results.forEach(item => {
				$('.search-page').append(`<p>
					${item.title_original}
					<br>by ${item.publisher_original}
					<br>${item.description_original}
					</p>
					<button class='add-btn' data-id='${item.id}' data-title='${item.title_original}'>
						Add to queue
					</button>`);
			});
		});
	});
	$('.search-page').on('click', '.add-btn', event => {
		const podcastId = ($(event.currentTarget).data('title'));
		alert(`Added ${podcastId} to queue`);
	});
	// view queue
	$('.queue-btn').on('click', event => {
		$('.search-page').css('display', 'none');
		$('.queue-page').css('opacity', '1');
	});
	// return to main page
	$('.new-search-btn').on('click', event => {
		location.reload();
	});
});