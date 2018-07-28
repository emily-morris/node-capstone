// user submits search form
$('.search-form').submit(event => {
	console.log($('.query').val());
	event.preventDefault();
	$.get('/podcasts?q=' + $('.query').val(), function(data) {
		console.log('works');
	});
});