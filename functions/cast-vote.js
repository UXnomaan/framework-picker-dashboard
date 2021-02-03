const faunadb = require("faunadb");

const queryTools = faunadb.query;
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
});

const {
	Create,
	Collection,
	Map,
	Paginate,
	Match,
	Index,
	Lambda,
	Get,
	Var,
} = queryTools;

exports.handler = async event => {
	const data = JSON.parse(event.body);

	try {
		const response = await client.query(
			Map(
				Paginate(Match(Index("find_vote_by_email"), data.email)),
				Lambda("email", Get(Var("email")))
			)
		);

		if (response.data.length > 0) {
			throw new Error("ALREADY EXISTS");
		}
	} catch (err) {
		if (err.message === "ALREADY EXISTS") {
			return {
				statusCode: 422,
				body: JSON.stringify({ error: err, message: err.message }),
			};
		} else {
			return { statusCode: 500, body: JSON.stringify(err) };
		}
	}

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
