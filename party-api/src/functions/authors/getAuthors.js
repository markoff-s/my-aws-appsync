'use strict';

exports.getAuthors = (event, context, callback) => {
	console.log('Received event {}', JSON.stringify(event, 3));

	// const consumerKey = event.arguments.consumer_key;
	// const consumerSecret = event.arguments.consumer_secret;

	console.log('Got an Invoke Request.');

	const authors = [
		{
			id: "xz1",
			name: "xz1 name"
		},
		{
			id: "xz2",
			name: "xz2 name"
		},
	]

	callback(null, authors);

	// switch (event.field) {
	// 	case 'helloWorld': {
	// 		callback(null, 'Hello world');
	// 		break;
	// 	}

	// 	default: {
	// 		callback(`Unknown field, unable to resolve ${event.field}`, null);
	// 		break;
	// 	}
	// }
};
