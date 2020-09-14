exports.createGroup = async (event, context, callback) => {
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
		insert into "group" (name, type, date_formed, major_genre_id, minor_genre_id, country_id)
		values ($1, $2, $3, $4, $5, $6) 
		returning id, "name",
		CASE
			WHEN "type" = 1 THEN 'BAND'
			WHEN "type" = 2 then 'ORCHESTRA'
			ELSE 'UNDEFINED_TYPE'
		END AS "type",
			date_formed as "dateFormed",
			major_genre_id as "majorGenreId",
			minor_genre_id as "minorGenreId",
			country_id as "countryId";
	`, 
	[
		input.name, 
		input.type === 'BAND' ? 1 : 2, 
		input.dateFormed, 
		input.majorGenreId, 
		input.minorGenreId,
		input.countryId
	]);

	callback(null, data.rows[0]);
	}
	finally {
		await client.end();
	}	
}