import { useMutation, useQuery } from "react-query";

import { githubAPI, voteAPI } from "./api";

const DEFAULT_REFETCH_INTERVAL = 1000 * 60;

export const useRepo = ({ name, repoUrl, overrides = {} }) => {
	return useQuery(
		["github", name],
		async () => {
			const { data } = await githubAPI.get(repoUrl);
			return data;
		},
		{
			refetchInterval: DEFAULT_REFETCH_INTERVAL,
			...overrides,
		}
	);
};

export const useCastVote = ({ overrides = {} } = {}) => {
	return useMutation(vote => voteAPI.post("/cast-vote", vote), {
		...overrides,
	});
};

export const useVotes = ({ overrides = {} }) => {
	return useQuery(
		"votes",
		async () => {
			const { data } = await voteAPI.get("/get-votes");
			return data;
		},
		{
			...overrides,
		}
	);
};
