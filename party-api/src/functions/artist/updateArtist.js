exports.updateArtist = async (event, context, callback) => {
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
		update person 
		set name = $1, type = $2, dob = $3, country_id =$4	
		where id = $5;
	`, [input.name, input.type === 'NATURAL_PERSON' ? 1 : 2, input.dob, input.countryId, input.id]);

	callback(null, input);
	}
	finally {
		await client.end();
	}	
}