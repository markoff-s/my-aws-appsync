exports.getMajorGenres = async (event, context, callback) => {
	// TODO: use connection pools or lambda db proxy
	const { Client } = require('pg');  //  Needs the nodePostgres Lambda Layer.
	
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
	  select id, name
	  from mydb.public.major_genre
	  order by name asc;
	`);
	await client.end();

	callback(null, data.rows);
};
