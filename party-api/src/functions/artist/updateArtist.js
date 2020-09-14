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
		// update artist
		const artist = event.arguments.input;
		const data = await client.query(`
		update person 
		set name = $1, type = $2, dob = $3, country_id =$4	
		where id = $5;
	`,
			[
				artist.name,
				artist.type === 'NATURAL_PERSON' ? 1 : 2,
				artist.dob,
				artist.countryId,
				artist.id
			]);

		// update artist's groups
		if (artist.groups && artist.groups.length > 0) {
			const valuesString = artist.groups.map(groupId => { return `(${groupId}, ${artist.id})` }).join(", ");
			// console.log(valuesString);

			await client.query(`
			delete from group_member where person_id = ${artist.id};
			insert into group_member
			values ${valuesString};
			`);
		}

		callback(null, artist);
	}
	finally {
		await client.end();
	}
}