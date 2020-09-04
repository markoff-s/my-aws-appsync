'use strict';

exports.getCountries = (event, context, callback) => {
	console.log('Received event {}', JSON.stringify(event, 3));

	console.log('Got an Invoke Request.');

	const countries = [
		{
			id: 1,
			name: "Canada"
		},
		{
			id: 2,
			name: "UK"
		},
		{
			id: 3,
			name: "US"
		},
	]

	callback(null, countries);
};
