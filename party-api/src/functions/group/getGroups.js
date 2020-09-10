exports.getGroups = async (event, context, callback) => {
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
		WHEN "type" = 1 THEN 'BAND'
		WHEN "type" = 2 then 'ORCHESTRA'
		ELSE 'UNDEFINED_GROUP'
	END AS "type",
		date_formed as "dateFormed",
		major_genre_id,
		minor_genre_id,
		country_id
	from mydb.public.group
	order by name asc;
	`);
	await client.end();

	callback(null, data.rows);	
}