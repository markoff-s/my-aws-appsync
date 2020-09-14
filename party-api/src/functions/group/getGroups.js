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

	try {
		let filterSql = "";
		if (event.arguments && event.arguments.filter) {
			filterSql = ` where "name" like '%${event.arguments.filter.name}%'`
		}

		const query = `
	select id, "name",
	CASE
		WHEN "type" = 1 THEN 'BAND'
		WHEN "type" = 2 then 'ORCHESTRA'
		ELSE 'UNDEFINED_GROUP'
	END AS "type",
		date_formed as "dateFormed",
		major_genre_id as "majorGenreId",
		minor_genre_id as "minorGenreId",
		country_id as "countryId"
	from mydb.public.group
	${filterSql}
	order by name asc;
	`;
		const data = await client.query(query);

		callback(null, data.rows);
	}
	finally {
		await client.end();
	}
}