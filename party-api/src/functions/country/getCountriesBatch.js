exports.getCountriesBatch = async (event, context, callback) => {
	// AppSync batching - https://docs.aws.amazon.com/appsync/latest/devguide/tutorial-lambda-resolvers.html#advanced-use-case-batching
	console.log("Received event ", JSON.stringify(event, null, 3));

	// get distinct ids to request for
	const incomingIds = event.map((_) => { return _.source.countryId; });
	console.log("ids: " + incomingIds);
	const uniqueIncomingIds = [...new Set(incomingIds)];
	console.log("countriesIds: " + uniqueIncomingIds);

	const { Client } = require('pg');
	// console.log(process.env);
	const env = process.env;
	const client = new Client({
		user: env.USER,
		password: env.PASSWORD,
		host: env.HOST,
		port: env.PORT,
		database: env.DATABASE,
	});
	// TODO: use rds proxy https://aws.amazon.com/rds/proxy/
	await client.connect();
	// console.log("client connected!");
	
	try {
		const data = await client.query(`
		select distinct id, "name"
		from mydb.public.country
		where id = ANY($1::int[]);	  	
	`, [uniqueIncomingIds]);
		// console.log(data.rows);

		// fill the map/dict to use for faster searching
		// this is needed per AppSync reqs to return batch results in exactly the same order as passed in events
		const countriesMap = new Map();
		data.rows.forEach((_) => { countriesMap.set(_.id, _) });
		// console.log(countriesMap);

		// final result in correct order
		const result = incomingIds.map((id) => { return countriesMap.get(id) });

		callback(null, result);
	}
	finally {
		await client.end();
		// console.log("client disconnected!");
	}
}