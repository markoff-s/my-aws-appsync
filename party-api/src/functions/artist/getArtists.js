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

	try {
		let filterSql = "";
		if (event.arguments && event.arguments.filter) {
			filterSql = ` where "name" like '%${event.arguments.filter.name}%'`
		}
		const query = `
	select id, "name",
	CASE
		WHEN "type" = 1 THEN 'NATURAL_PERSON'
		WHEN "type" = 2 then 'UNNATURAL_PERSON'
		ELSE 'UNDEFINED_PERSON'
	END AS "type",
		dob,
		country_id as "countryId"	
	from mydb.public.person
	${filterSql}
	order by name asc;
	`;
		console.log(query);
		const data = await client.query(query);

		callback(null, data.rows);
	}
	finally {
		await client.end();
	}		
}