import { useQuery } from "react-query";

import { githubAPI } from "./api";

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
