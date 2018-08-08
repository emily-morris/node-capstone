'use strict';

$(() => {

	let currentUser;

	$.get('/user', data => {
		currentUser = {
			id: data[0].id,
			userName: data[0].userName
		}
	});

	// submit search form
	$('.search-form').submit(event => {
		event.preventDefault();
		$('main').css('display', 'none');
		$.get('/podcasts?q=' + $('.query').val(), data => {
			$('.search-page').css('opacity', '1');
			// search results populate
			data.results.forEach(item => {
				$('.result-list').append(`<li>
					${item.title_original}
					<button class='add-btn' data-id='${item.id}' data-title='${item.title_original}'>
						Add to queue
					</button>
					<br><img src='${item.thumbnail}' alt='Small image from podcast site'>
					<br>${item.description_original}
					<br>
					</li>
					<br>`);
			});
		});
	});

	// add podcast to queue
	$('.search-page').on('click', '.add-btn', event => {
		let body = {
			user_id: currentUser.id,
			id: event.currentTarget.dataset.id
		};
		$.ajax({
				type: 'POST', 
				url:'/queueItem', 
				data: JSON.stringify(body),
				contentType: 'application/json'
		});
		let podcastTitle = ($(event.currentTarget).data('title'));
		alert(`Added ${podcastTitle} to queue`);
	});

	// delete podcast from queue
	$('.queue-page').on('click', '.remove-btn', event => {
		let body = {
			user_id: currentUser.id,
			id: event.currentTarget.dataset.id
		};
		$.ajax({
			type: 'DELETE',
			url: `/queueItem/${body.id}`,
			data: JSON.stringify(body),
			contentType: 'application/json'
		});
		let podcastTitle = ($(event.currentTarget).data('title'));
		alert(`Removed ${podcastTitle} from queue`);
	});

	// view queue
	$('.queue-btn').on('click', event => {
		$('.search-page').css('display', 'none');
		$('.queue-page').css('opacity', '1');
		$.get('/queue', data => {
			data.forEach(item => {
				$('.queue').append(`<li>
					<br>
					${item.title}
					<button class='remove-btn' data-id='${item.listenNotesId}' data-title='${item.title}'>
						Remove from queue
					</button>
					<br><img src='${item.thumbnail}' alt='Small image from podcast site'>
					<br>${item.description}
					<br><a href='${item.website}' target='_blank'>Listen to podcast</a>
					<br><label for='notes'>Notes:</label><textarea id='notes' name='notes'></textarea>
					</li>
					<br>`);
			})
		});
	});

	// add notes to queue


	// return to main page
	$('.new-search-btn').on('click', event => {
		location.reload();
	});
});