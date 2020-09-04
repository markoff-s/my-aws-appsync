'use strict';

exports.getMajorGenres = (event, context, callback) => {
	console.log('Received event {}', JSON.stringify(event, 3));

	console.log('Got an Invoke Request.');

	const majorGenres = [
		{
			id: 1,
			name: "Blues"
		},
		{
			id: 2,
			name: "Jazz"
		},
		{
			id: 3,
			name: "Rock"
		},
	]

	callback(null, majorGenres);
};
