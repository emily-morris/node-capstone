'use strict';

$(() => {

	let currentUser;

	$.get('/user', data => {
		currentUser = {
			id: data[0].id,
			userName: data[0].userName
		}
	});
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

	$('.search-page').on('click', '.add-btn', event => {
		console.log(event);
		const params = {
			user_id: currentUser.id,
			id: event.currentTarget.dataset.id
		}
		$.post('/queueItem?user_id=' + params.user_id + '&id=' + params.id,
				data => {
					console.log(params.id);
					$.get									
				}
		);
		// const podcastTitle = ($(event.currentTarget).data('title'));
		// alert(`Added ${podcastTitle} to queue`);
	});

	// view queue
	$('.queue-btn').on('click', event => {
		$('.search-page').css('display', 'none');
		$('.queue-page').css('opacity', '1');
		$.get('/queueItem', data => {
			console.log(data);
			data.queueItem.forEach(item => {
				console.log(item);
			});
		});
	});

	// return to main page
	$('.new-search-btn').on('click', event => {
		location.reload();
	});
});