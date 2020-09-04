'use strict';

exports.getMinorGenres = (event, context, callback) => {
	console.log('Received event {}', JSON.stringify(event, 3));

	console.log('Got an Invoke Request.');

	const minorGenres = [
		{
			id: 1,
			name: "Hip hop"
		},
		{
			id: 2,
			name: "Reggae"
		},
		{
			id: 3,
			name: "Funk"
		},
	]

	callback(null, minorGenres);
};
