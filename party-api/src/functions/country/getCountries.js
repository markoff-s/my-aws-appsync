exports.getCountries = async (event, context, callback) => {

	// Load the AWS SDK
	var AWS = require('aws-sdk'),
		region = "us-east-1",
		secretName = "mydb-postgres";

	// Create a Secrets Manager client
	var smClient = new AWS.SecretsManager({
		region: region
	});
	const smData = await smClient.getSecretValue({ SecretId: secretName }).promise();
	const secret = JSON.parse(smData.SecretString);

	const { Client } = require('pg');  //  Needs the nodePostgres Lambda Layer.
	const client = new Client({
		user: secret.username,
		host: secret.host,
		database: secret.dbname,
		password: secret.password,
		port: secret.port,
	});
	await client.connect();

	const data = await client.query(`
	  select id, name
	  from mydb.public.country
	  order by name asc;
	`);
	await client.end();

	callback(null, { rows: data.rows });
	// const response = {
	// 	statusCode: 200,
	// 	body: {
	// 	  id: res.rows[0].timestamp.valueOf(),
	// 	  isoccupied: res.rows[0].isoccupied
	// 	},
	// };
	// return response;
}


// exports.getCountries = (event, context, callback) => {
// 	console.log('Received event {}', JSON.stringify(event, 3));

// 	console.log('Got an Invoke Request.');

// 	const countries = [
// 		{
// 			id: 1,
// 			name: "Canada"
// 		},
// 		{
// 			id: 2,
// 			name: "UK"
// 		},
// 		{
// 			id: 3,
// 			name: "US"
// 		},
// 	]

// 	callback(null, countries);
// };
