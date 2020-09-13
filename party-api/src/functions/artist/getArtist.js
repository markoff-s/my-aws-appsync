exports.getArtist = async (event, context, callback) => {	
	console.log("----------- event --------------");
	console.log(event);

	// console.log("----------- context --------------");
	// console.log(context);

	const artistId = event.arguments.id;
	console.log("----------- atist id --------------");
	console.log(artistId);
	
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

	const data = await client.query(`
	select id, "name",
	CASE
		WHEN "type" = 1 THEN 'NATURAL_PERSON'
		WHEN "type" = 2 then 'UNNATURAL_PERSON'
		ELSE 'UNDEFINED_PERSON'
	END AS "type",
		dob,
		country_id as "countryId"
	from mydb.public.person
	where id = $1;		
	`, [artistId]);
	await client.end();

	callback(null, data.rows[0]);
}