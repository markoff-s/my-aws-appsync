'use strict';

exports.getBooks = (event, context, callback) => {
	console.log('Received event {}', JSON.stringify(event, 3));
	
	console.log('Got an Invoke Request.');

	const books = [
		{
			id: "book1",
			title: "title1"
		},
		{
			id: "book2",
			title: "title2"
		},
	]

	callback(null, books);
};
