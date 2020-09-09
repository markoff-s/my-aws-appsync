exports.getArtists = async (event, context, callback) => {
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
		country_id
	from mydb.public.person
	order by name asc;
	`);
	await client.end();

	callback(null, data.rows);	
}