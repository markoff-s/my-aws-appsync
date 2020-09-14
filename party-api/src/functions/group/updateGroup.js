exports.updateGroup = async (event, context, callback) => {
	console.log("----------- event --------------");
	console.log(event);

	const { Client } = require('pg');

	const env = process.env;
	const client = new Client({
		user: env.USER,
		password: env.PASSWORD,
		host: env.HOST,
		port: env.PORT,
		database: env.DATABASE,
	});
	await client.connect();

	try {
		const input = event.arguments.input;
		const data = await client.query(`
		update "group" 
		set name = $1, type = $2, date_formed = $3, major_genre_id =$4, minor_genre_id = $5,
		country_id = $6
		where id = $7;
	`, 
	[
		input.name, 
		input.type === 'BAND' ? 1 : 2, 
		input.dateFormed, 
		input.majorGenreId, 
		input.minorGenreId,
		input.countryId,
		input.id
	]);

	callback(null, input);
	}
	finally {
		await client.end();
	}	
}