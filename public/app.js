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
				$('.result-list').append(`<li>
					${item.title_original}
					<br>by ${item.publisher_original}
					<button class='add-btn' data-id='${item.id}' data-title='${item.title_original}'>
						Add to queue
					</button>
					<br>${item.description_original}
					</li>
					<br>`);
			});
		});
	});
	$('.search-page').on('click', '.add-btn', event => {
		const podcastTitle = ($(event.currentTarget).data('title'));
		alert(`Added ${podcastTitle} to queue`);
		$('.queue').append(`<li>
			${podcastTitle}
			</li>`);
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