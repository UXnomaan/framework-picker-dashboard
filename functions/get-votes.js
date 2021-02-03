const faunadb = require("faunadb");

const queryTools = faunadb.query;
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET,
});

const { Map, Paginate, Match, Index, Lambda, Select, Get, Var } = queryTools;

exports.handler = async () => {
	try {
		const results = await client.query(
			Map(
				Paginate(Match(Index("all_votes"))),
				Lambda("X", Select(["data", "choice"], Get(Var("X"))))
			)
		);
		const processedResults = results.data.reduce(
			(finalResults, currentItem) => {
				// Need to use hasOwnProperty here as just checking existence
				// always returns false when the value is 0
				if (finalResults[currentItem]) {
					finalResults[currentItem] = finalResults[currentItem] + 1;
				} else {
					finalResults[currentItem] = 1;
				}
				return finalResults;
			},
			{}
		);
		return {
			statusCode: 200,
			body: JSON.stringify(processedResults),
		};
	} catch (err) {
		return {
			statusCode: 400,
			body: JSON.stringify(err),
		};
	}
};
