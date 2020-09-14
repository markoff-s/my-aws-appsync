exports.deleteGroup = async (event, context, callback) => {
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
		const artistId = event.arguments.id;
		await client.query(`
		delete from "group" where id = $1;	
	`, [artistId]);

		callback(null, artistId);
	}
	finally {
		await client.end();
	}
}