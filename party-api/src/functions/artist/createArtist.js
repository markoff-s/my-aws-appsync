exports.createArtist = async (event, context, callback) => {
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
		insert into person (name, type, dob, country_id) 
		values ($1, $2, $3, $4) 
		returning id, "name",
		CASE
			WHEN "type" = 1 THEN 'NATURAL_PERSON'
			WHEN "type" = 2 then 'UNNATURAL_PERSON'
			ELSE 'UNDEFINED_PERSON'
		END AS "type",
			dob,
			country_id as "countryId";	
	`, [input.name, input.type === 'NATURAL_PERSON' ? 1 : 2, input.dob, input.countryId]);

	callback(null, data.rows[0]);
	}
	finally {
		await client.end();
	}	
}