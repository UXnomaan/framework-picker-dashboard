import { useMutation, useQuery } from "react-query";

import { githubAPI, voteAPI } from "./api";

const DEFAULT_REFETCH_INTERVAL = 1000 * 60;

export const useRepo = ({ name, repoUrl }) => {
	return useQuery(
		["github", name],
		async () => {
			const { data } = await githubAPI.get(repoUrl);
			return data;
		},
		{
			refetchInterval: DEFAULT_REFETCH_INTERVAL,
		}
	);
};

export const useCastVote = () => {
	return useMutation(vote => voteAPI.post("/cast-vote", vote));
};

export const useVotes = () => {
	return useQuery("votes", async () => {
		const { data } = await voteAPI.get("/get-votes");
		return data;
	});
};
