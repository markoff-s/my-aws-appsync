exports.getCountry = async (event, context, callback) => {	
	console.log("----------- event --------------");
	console.log(event);

	// console.log("----------- context --------------");
	// console.log(context);

	const countryId = event.arguments.id;
		
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
	select id, "name"
	from mydb.public.country
	where id = $1;
	`, [countryId]);

	await client.end();

	callback(null, data.rows[0]);
}