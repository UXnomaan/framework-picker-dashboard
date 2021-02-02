const faunadb = require("faunadb");

const queryTools = faunadb.query;
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
});

const { Create, Collection } = queryTools;

exports.handler = async event => {
	const data = JSON.parse(event.body);

	try {
		const response = await client.query(
			Create(Collection("votes"), { data: data })
		);
		return {
			statusCode: 200,
			body: JSON.stringify(response),
		};
	} catch (err) {
		return {
			statusCode: 400,
			body: JSON.stringify(err),
		};
	}
};
